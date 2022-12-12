import { useEffect } from 'react';
import { useAppDispatch, actions } from '@/model';

const useUserGPS = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let geoId: number;

    if ('permissions' in navigator) {
      navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
        if (permissionStatus.state === 'denied') {
          // navigator.permissions.revoke({ name: 'geolocation' }) is no longer supported
          dispatch(actions.updateUser({ gps: false }));
          alert('Please turn on the permission of geolocation');
        } else {
          dispatch(actions.updateUser({ gps: true }));
          if ('geolocation' in navigator) {
            const successHandler = ({
              coords: { latitude, longitude },
            }: {
              coords: { latitude: number; longitude: number };
            }) => {
              dispatch(
                actions.updateUser({
                  coordinates: [latitude, longitude],
                  gps: true,
                })
              );
            };

            const errorHandler = (err: any) => {
              dispatch(actions.updateUser({ gps: false }));
              console.log(err);
              // 1	PERMISSION_DENIED	沒有獲取裝置定位的權限
              // 2	POSITION_UNAVAILABLE	位置資訊獲取錯誤
              // 3	TIMEOUT	在 Timeout 前未取得定位資訊
            };

            navigator.geolocation.getCurrentPosition(successHandler, errorHandler);

            geoId = navigator.geolocation.watchPosition(successHandler, errorHandler);
          } else {
            alert("The browser doesn't support GPS");
          }
        }
      });
    }

    return () => {
      if (geoId) navigator.geolocation.clearWatch(geoId);
    };
  }, [dispatch]);
};

export default useUserGPS;
