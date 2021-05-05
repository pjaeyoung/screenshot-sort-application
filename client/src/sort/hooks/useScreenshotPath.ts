import * as React from 'react';
// import storage from '@/shared/utils/handleAsyncStorage';
import { getScreenshotPath } from '@/shared/utils/backgroundService';

const useScreenshotPath = () => {
  const [screenshotPath, setScreenshotPath] = React.useState<string>(
    `file://${getScreenshotPath()}`,
  );

  React.useEffect(() => {
    setScreenshotPath(`file://${getScreenshotPath()}`);
  }, [getScreenshotPath()]);

  return [screenshotPath];
};

export default useScreenshotPath;
