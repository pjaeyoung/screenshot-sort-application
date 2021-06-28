import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  IPhoto,
  IPhotosState,
  IPhotosInStorage,
  IPhotoEntities,
  IIdsByFolderId,
  IPhotoPayloadCreator,
} from '@/shared/types';
import { emptyInPhotoListError } from '@/shared/constants';
import { useAppSelector } from '@/redux/hooks';
import { getDataCurry, storeDataCurry } from '@/shared/utils/handleAsyncStorage';
import { createFileAsync, readFileAsync, readFile } from '@/shared/utils/fsFunctions';

const getFolderNameInStoageById = async (folderId: number) => {
  const folders = await getDataCurry('folders')();
  const folderName = folders?.find(folder => folder.id == folderId)?.folderName;

  return folderName;
};

interface IFilePath {
  id: number;
  path: string;
}

export const storePhotoInStorage = createAsyncThunk<void, IPhoto>(
  'photos/storePhotosInStorage',
  async photoData => {
    const { source, ...photo } = photoData;
    //const folderName = await getFolderNameInStoageById(photo.folderId);
    const folderName = `folder${photo.folderId}`;
    const photos: IPhotosInStorage = (await getDataCurry<IPhotosInStorage>('photos')()) || {
      idsByFolderId: null,
      entities: null,
    };
    let { idsByFolderId, entities } = photos;

    if (idsByFolderId && photo.folderId in idsByFolderId) {
      const findedId = idsByFolderId[photo.folderId].find(id => id == photo.id);

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

    await Promise.all([
      createFileAsync({ path: `${folderName}/${photo.photoName}`, contents: source }),
      storeDataCurry<IPhotosInStorage>('photos')({ idsByFolderId, entities }),
    ]);
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
>('photos/getPhotosInStorage', async (folderId, { rejectWithValue }) => {
  try {
    const photos = await getDataCurry<IPhotosInStorage>('photos')();
    //const ids = null;

    if (photos && photos.idsByFolderId && photos.entities) {
      const ids = photos.idsByFolderId[folderId];
      const filePaths: IFilePath[] = [];
      const entities =
        ids?.reduce((_entities: IPhotoEntities, id: number) => {
          const photo = photos.entities![id];
          console.log('photo: ', photo);
          _entities[id] = photo;
          //const folderName = await getFolderNameInStoageById(photo.folderId);
          const folderName = `folder${photo.folderId}`;
          const filePath = `${folderName}/${photo.photoName}`;
          filePaths.push({ id, path: filePath });

          return _entities;
        }, {}) || null;

      const sources = await Promise.all(
        filePaths.map(async filePath => {
          const { id, path } = filePath;

          const source = await readFile({ filePath: path });
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

export const removePhotosInStorage = createAsyncThunk(
  'photos/removePhotosInStorage',
  async () => {},
);

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
          ...initialState,
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
            error: payload.errorMessage,
          };
        } else {
          return {
            ...state,
            error: error.message,
          };
        }
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
