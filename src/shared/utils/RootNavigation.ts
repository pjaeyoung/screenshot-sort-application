import * as React from 'react';
import { NavigationContainerRef } from '@react-navigation/core';

export const navigationRef = React.createRef<NavigationContainerRef>();
// React 컴포넌트 라이프 사이클과 상관없는 '스크린샷 감지 서비스'에서 SORT화면 이동하기 위한 글로벌 네비게이션
export function navigate(name: string, params: object) {
  navigationRef.current?.navigate(name, params);
}
