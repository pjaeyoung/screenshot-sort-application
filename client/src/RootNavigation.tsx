import * as React from 'react';
import { NavigationContainerRef} from '@react-navigation/core';

export const navigationRef = React.createRef<NavigationContainerRef>();

export function navigate(name: string, params: object) {
  navigationRef.current?.navigate(name, params);
}
