import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as RNFS from 'react-native-fs';
import {
  IPhoto,
  IPhotosState,
  IPhotosInStorage,
  IPhotoEntities,
  IPhotoPayloadCreator,
} from '@/shared/types';
import { emptyInPhotoListError } from '@/shared/constants';
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { getDataCurry, storeDataCurry } from '@/shared/utils/handleAsyncStorage';
import { deleteFile, FILEPATH, readFile } from '@/shared/utils/fsFunctions';
import { IStoredFolder } from './folderSlice';

interface IFilePath {
  id: number;
  path: string;
}

export const storePhotoInStorage = createAsyncThunk<void, { photoData: IPhoto }>(
  'photos/storePhotosInStorage',
  async ({ photoData: photo }) => {
    const photos: IPhotosInStorage = (await getDataCurry<IPhotosInStorage>('photos')()) || {
      idsByFolderId: null,
      entities: null,
    };
    let { idsByFolderId, entities } = photos;

    if (idsByFolderId && photo.folderId in idsByFolderId) {
      const findedId = idsByFolderId[photo.folderId].find(id => id === photo.id);

      if (!findedId) {
        idsByFolderId[photo.folderId].push(photo.id);
      }
    } else {
      idsByFolderId
        ? (idsByFolderId[photo.folderId] = [photo.id])
        : (idsByFolderId = { [photo.folderId]: [photo.id] });
    }

    if (entities) {
      entities[photo.id] = photo;
    } else {
      entities = {
        [photo.id]: photo,
      };
    }

    await storeDataCurry<IPhotosInStorage>('photos')({ idsByFolderId, entities });
  },
);

export const getPhotosInStorage = createAsyncThunk<
  IPhotoPayloadCreator,
  number,
  {
    rejectValue: {
      errorMessage: string;
    };
  }
>('photos/getPhotosInStorage', async (folderId, { rejectWithValue, getState }) => {
  try {
    const photos = await getDataCurry<IPhotosInStorage>('photos')();
    if (photos && photos.idsByFolderId && photos.entities) {
      const ids = photos.idsByFolderId[folderId];
      if (!ids || ids.length === 0) {
        return rejectWithValue(emptyInPhotoListError);
      }
      const filePaths: IFilePath[] = [];
      const entities =
        ids?.reduce((_entities: IPhotoEntities, id: number) => {
          const photo = photos.entities![id];
          _entities[id] = photo;
          const folder = (getState().folders.entries as IStoredFolder[]).find(
            ({ id }) => id === folderId,
          );
          const filePath = `${FILEPATH}/${folder?.folderName}/${photo.photoName}`;
          filePaths.push({ id, path: filePath });

          return _entities;
        }, {}) || null;

      const sources = await Promise.all(
        filePaths.map(async filePath => {
          const { id, path } = filePath;
          let source;
          try {
            source = await readFile({ filePath: path });
          } catch (error) {
            console.error(error.message);
          }

          return {
            id,
            source,
          };
        }),
      );

      sources.forEach(
        source => (entities[source.id] = { ...entities[source.id], source: source.source }),
      );

      return {
        folderId,
        ids,
        entities,
      };
    } else {
      return rejectWithValue(emptyInPhotoListError);
    }
  } catch (error) {
    throw error;
  }
});

export const removePhotoInStorage = createAsyncThunk<
  void,
  { folderName: string; photoId: number },
  { state: RootState }
>('photos/removePhotosInStorage', async ({ folderName, photoId }, { getState }) => {
  try {
    const photosSlice = getState().photos;

    if (
      !photosSlice.ids ||
      photosSlice.ids.find(id => id === photoId) === undefined ||
      !photosSlice.entities ||
      !(photoId in photosSlice.entities)
    ) {
      throw Error('redux store에 해당 사진이 존재하지 않습니다.');
    }

    const { folderId, photoName } = photosSlice.entities[photoId];
    const photos = await getDataCurry<IPhotosInStorage>('photos')();

    if (photos && photos.idsByFolderId && photos.entities) {
      if (
        photos.idsByFolderId[folderId].find(id => id === photoId) === undefined ||
        !(photoId in photos.entities)
      ) {
        throw Error('해당 사진 데이터가 async storage에 저장되어 있지 않습니다.');
      }

      await deleteFile(`${FILEPATH}/${folderName}/${photoName}`);
      await storeDataCurry<IPhotosInStorage>('photos')({
        idsByFolderId: {
          ...photos.idsByFolderId,
          [folderId]: photos.idsByFolderId[folderId].filter((id: number) => id !== photoId),
        },
        entities: photos.entities,
      });

      return {
        photoId,
      };
    } else {
      throw Error('async storage에 photos가 존재하지 않습니다.');
    }
  } catch (error) {
    console.error(error.message);
  }
});

const initialState = {
  folderId: null,
  ids: null,
  entities: null,
  error: null,
} as IPhotosState;

const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getPhotosInStorage.pending, (state, action) => {
        return {
          ...state,
          error: null,
        };
      })
      .addCase(getPhotosInStorage.fulfilled, (state, { payload }) => {
        return {
          ...state,
          ...payload,
        };
      })
      .addCase(getPhotosInStorage.rejected, (state, { error, payload }) => {
        if (payload) {
          return {
            ...state,
            error: payload?.errorMessage || error.message,
          };
        } else {
          return {
            ...state,
            error: error.message,
          };
        }
      })
      .addCase(removePhotoInStorage.pending, (state, action) => {
        return {
          ...state,
          error: null,
        };
      })
      .addCase(removePhotoInStorage.fulfilled, (state, { payload }) => {
        const { photoId } = payload;

        state.ids = state.ids?.filter(id => id !== photoId) || null;
        delete state.entities![photoId];
      })
      .addCase(removePhotoInStorage.rejected, (state, { error, payload }) => {
        return {
          ...state,
          error: error.message,
        };
      });
  },
});

export default photosSlice.reducer;

export const usePhotosInFolder = () => {
  const photosSlice = useAppSelector(state => state.photos);
  const { ids, entities } = photosSlice;

  const getAllPhotosInFolder = () => entities && ids?.map((id: number) => entities[id]);
  const getPhotoById = (photoId: number) => entities && entities[photoId];
  const getPhotosError = () => photosSlice.error;

  return {
    getAllPhotosInFolder,
    getPhotoById,
    getPhotosError,
  };
};
