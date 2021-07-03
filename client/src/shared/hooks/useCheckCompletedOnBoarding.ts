import React, { useState, useEffect } from 'react';

import storage from '@/shared/utils/handleAsyncStorage';

function useCheckCompletedOnBoarding() {
  const [completedOnboarding, setCompletedOnBoarding] = useState<boolean | null>(null);

  useEffect(() => {
    const checkCompletedOnBoarding = async () => {
      const _completedOnBoarding = await storage.getCompletedOnBoarding();
      setCompletedOnBoarding(_completedOnBoarding ? true : false);
    };

    checkCompletedOnBoarding();
  }, []);

  return completedOnboarding;
}

export default useCheckCompletedOnBoarding;
