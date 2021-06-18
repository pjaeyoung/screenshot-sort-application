export interface IPhoto {
  id: number;
  folderId: number;
  photoName: string;
  source: string;
}

export interface IPhotoEntities {
  [photoId: number]: IPhoto;
}

export interface IPhotosState {
  folderId: number | null;
  ids: number[] | null;
  entities: IPhotoEntities | null;
}

export interface IPhotosInStorage {
  ids: number[] | null;
  entitiesByFolderId: {
    [folderId: number]: number[] | null;
  };
  entities: IPhotoEntities | null;
}
