import * as React from 'react';
import { NavigationContainerRef } from '@react-navigation/core';

export const navigationRef = React.createRef<NavigationContainerRef>();

export function navigate(name: string, params: object) {
  navigationRef.current?.navigate(name, params);
}

// FIXME: 스크린 간 folder 데이터 공유를 위해 임시방편으로 사용함
// navigate를 사용하면 이전 스크린화면으로 돌아갔을 때 리렌더링이 되지 않아 useUserFolders에서 업데이트 된
// 폴더 데이터를 가져올 수 없음
// 추후 redux를 사용할 것
export function reset(name: string, params: object) {
  navigationRef.current?.reset({ index: 0, routes: [{ name, params }] });
}
