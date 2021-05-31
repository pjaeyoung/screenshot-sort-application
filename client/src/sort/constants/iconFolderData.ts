import { defaultBorderColors } from '@/shared/constants';
import { FolderDisplayType } from '@/shared/types';

const iconFolderData: FolderDisplayType[] = [
  {
    id: 'folder-share',
    component: 'fontawesome',
    name: 'share-alt',
    borderColor: defaultBorderColors[6],
    borderDashed: false,
    positions: {
      right: 130,
      bottom: -40,
    },
    width: 150,
    height: 150,
  },
  {
    id: 'folder-trash',
    component: 'fontawesome',
    name: 'trash',
    borderColor: defaultBorderColors[7],
    borderDashed: false,
    positions: { right: -30, bottom: -20 },
    height: 150,
    width: 150,
  },
];

export default iconFolderData;
