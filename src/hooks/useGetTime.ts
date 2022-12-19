import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { getTimeDetail } from '@/utils/time';
import { useAppSelector, types } from '@/model';

const getTimeObject = (locale: types.Language) => {
  const { displayTime, displayStatus } = getTimeDetail({ locale });
  return { displayTime, displayStatus, timeFormat: `${displayTime} ${displayStatus}` };
};

const useGetTime = () => {
  const {
    i18n: { language },
  } = useTranslation() as {
    i18n: { language: types.Language };
  };
  const getLocaleTimeObject = useCallback(() => getTimeObject(language), [language]);
  const [timeObject, setTimeObject] = useState(getLocaleTimeObject());
  const historyCount = useAppSelector((state) => state.history.data.length);
  const timeFormatRef = useRef(timeObject.timeFormat);

  useEffect(() => {
    timeFormatRef.current = timeObject.timeFormat;
  }, [timeFormatRef, timeObject]);

  useEffect(() => {
    const now = getLocaleTimeObject();
    if (now.timeFormat !== timeFormatRef.current) setTimeObject(now);

    const timeInterval = setInterval(() => {
      setTimeObject(getLocaleTimeObject());
    }, 60000);

    return () => {
      clearInterval(timeInterval);
    };
  }, [historyCount, getLocaleTimeObject]);

  return timeObject;
};

export default useGetTime;
