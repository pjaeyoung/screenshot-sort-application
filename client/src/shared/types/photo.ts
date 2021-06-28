export interface IPhoto {
  id: number;
  folderId: number;
  photoName: string;
  source?: string;
}

export interface IPhotoEntities {
  [photoId: number]: IPhoto;
}

export interface IPhotosState {
  folderId: number | null;
  ids: number[] | null;
  entities: IPhotoEntities | null;
  error: string | null | undefined;
}

export interface IIdsByFolderId {
  [folderId: number]: number[];
}

export interface IPhotosInStorage {
  idsByFolderId: IIdsByFolderId | null;
  entities: IPhotoEntities | null;
}

export interface IPhotoPayloadCreator {
  folderId: number | null;
  ids: number[] | null;
  entities: IPhotoEntities;
}
