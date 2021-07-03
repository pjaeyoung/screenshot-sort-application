import { IScreenGroup } from '@/shared/types';
import React from 'react';

export const groupScreens = ({
  group,
  Screen,
}: {
  group: IScreenGroup;
  Screen: React.Component;
}) => {
  return Object.entries(group).map(([name, component]) => {
    return <Screen key={name} name={name} component={component} />;
  });
};
