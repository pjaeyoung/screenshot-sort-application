import { FolderSvg } from '@/shared/components';
import { folderSvgsData } from '@/shared/constants';
import withScaleAnimatedDropzone from './withScaleAnimatedDropzone';

export default folderSvgsData.map(svgData =>
  withScaleAnimatedDropzone({ Component: FolderSvg, defaultSvgData: svgData, maxScale: 1.5 }),
);
