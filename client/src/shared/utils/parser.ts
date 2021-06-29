import { IPhotosInStorage, IPhotoEntities } from '@/shared/types';

interface IParseToPhotosInFolder {
  (folderId: number, photos: IPhotosInStorage): {
    idsInFolder: number[] | null;
    entitiesInFolder: IPhotoEntities | null;
  };
}

export const parseToPhotosInFolder: IParseToPhotosInFolder = (folderId, photos) => {
  const { entities, entitiesByFolderId } = photos;

  const idsInFolder = entitiesByFolderId[folderId] || null;
  const entitiesInFolder =
    (entities &&
      idsInFolder?.reduce((_entities: IPhotoEntities, id) => {
        _entities[id] = entities[id];
        return _entities;
      }, {})) ||
    null;

  return {
    idsInFolder,
    entitiesInFolder,
  };
};
