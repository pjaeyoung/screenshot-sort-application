import { defaultBorderColors } from '@/shared/constants';
import { IconFolderDisplayType } from '@/shared/types';
import { faShareAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const iconFolderData: IconFolderDisplayType[] = [
  {
    id: 'folder-share',
    component: 'fontawesome',
    name: 'share',
    borderColor: defaultBorderColors[6],
    borderDashed: false,
    icon: faShareAlt,
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
    name: '삭제',
    borderColor: defaultBorderColors[7],
    borderDashed: false,
    icon: faTrashAlt,
    positions: { right: -30, bottom: -20 },
    height: 150,
    width: 150,
  },
];

export default iconFolderData;
