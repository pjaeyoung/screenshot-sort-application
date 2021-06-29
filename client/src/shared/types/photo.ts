export interface IPhoto {
  id: number;
  folderId: string;
  photoName: string;
  source?: string;
}

export interface IPhotoEntities {
  [photoId: number]: IPhoto;
}

export interface IPhotosState {
  folderId: string | null;
  ids: number[] | null;
  entities: IPhotoEntities | null;
  error: string | null | undefined;
}

export interface IIdsByFolderId {
  [folderId: string]: number[];
}

export interface IPhotosInStorage {
  idsByFolderId: IIdsByFolderId | null;
  entities: IPhotoEntities | null;
}

export interface IPhotoPayloadCreator {
  folderId: string | null;
  ids: number[] | null;
  entities: IPhotoEntities;
}
