import { IconDefinition } from '@fortawesome/fontawesome-common-types';
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

export interface IconFolderDisplayType extends FolderDisplayType {
  icon: IconDefinition; // component가 fontawesome 일 경우
}
