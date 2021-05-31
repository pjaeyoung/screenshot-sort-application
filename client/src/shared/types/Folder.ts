export interface FolderType {
  id: string;
  name: string; // 폴더 명
  borderColor: string; // border 색상
  borderDashed: boolean; // border 스타일 dashed or solid
}

interface PositionType {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
}

export interface FolderDisplayType extends FolderType {
  positions: PositionType;
  width: number;
  height: number;
  component: string;
}

export interface RemovableFolderDisplayType extends FolderDisplayType {
  removeButtonHorizontalDirection: { right?: number; left?: number };
}
