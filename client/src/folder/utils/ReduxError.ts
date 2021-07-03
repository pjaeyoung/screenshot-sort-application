import { IUserFolderState } from '@/redux/store';

export type ReduxFuncReturnType = { payload: IUserFolderState; type: string };

interface IReducerErrorMessage {
  increment: string;
  update: string;
  decrement: string;
}

const reduxErrorMessages: IReducerErrorMessage = {
  increment: '폴더 생성 실패',
  update: '폴더 수정 실패',
  decrement: '폴더 삭제 실패',
};

export default class ReduxError extends Error {
  constructor(reducerType: string) {
    super();
    this.message = reduxErrorMessages[reducerType.split('/')[0] as keyof IReducerErrorMessage];
  }
}
