import { FolderSvg } from '@/shared/components';
import { folderSvgsDataArr } from '@/shared/constants';
import withScaleAnimatedDropzone from './withScaleAnimatedDropzone';

/* eslint-disable */
export default folderSvgsDataArr.map((svgData) =>
  withScaleAnimatedDropzone({ Component: FolderSvg, defaultSvgData: svgData, maxScale: 1.5 }),
);
