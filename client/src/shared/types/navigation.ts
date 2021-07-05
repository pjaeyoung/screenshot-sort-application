import React from 'react';

export interface IScreenGroup {
  [name: string]: React.Component;
}

export type ParamListType = {
  Folder: {
    isOnboarding: boolean;
  };
  Main: {
    isOnboarding?: boolean;
  };
};
