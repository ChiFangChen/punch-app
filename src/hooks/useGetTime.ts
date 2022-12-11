import { useState, useEffect, useRef } from 'react';
import { getTimeDetail } from '@/utils/time';
import { useAppSelector } from '@/model';

const getTimeObject = () => {
  const { displayTime, displayStatus } = getTimeDetail();
  return { displayTime, displayStatus };
};

const useGetTime = () => {
  const [timeObject, setTimeObject] = useState(getTimeObject());
  const historyCount = useAppSelector((state) => state.history.data.length);
  const timeRef = useRef(timeObject.displayTime);

  useEffect(() => {
    timeRef.current = timeObject.displayTime;
  }, [timeRef, timeObject]);

  useEffect(() => {
    const now = getTimeObject();
    if (now.displayTime !== timeRef.current) setTimeObject(getTimeObject());

    const timeInterval = setInterval(() => {
      setTimeObject(getTimeObject());
    }, 60000);

    return () => {
      clearInterval(timeInterval);
    };
  }, [timeRef, historyCount]);

  return timeObject;
};

export default useGetTime;
