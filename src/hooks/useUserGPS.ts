import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { useAppDispatch, actions } from '@/model';

const useUserGPS = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    let geoId: number | null = null;

    const detectPermission = (permissionStatusState: string) => {
      if (permissionStatusState === 'denied') {
        // navigator.permissions.revoke({ name: 'geolocation' }) is no longer supported
        dispatch(actions.updateUser({ gps: false }));
        toast.error(t('turn-on-permission'));
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
            // 1	PERMISSION_DENIED: no GPS permission
            // 2	POSITION_UNAVAILABLE:	error when getting position
            // 3	TIMEOUT: do not get the position before timeout
          };

          geoId = navigator.geolocation.watchPosition(successHandler, errorHandler);
        } else {
          toast.error(t('browser-not-support'));
        }
      }
    };

    if ('permissions' in navigator) {
      navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
        /* eslint no-param-reassign: ["error", { "props": false }] */
        permissionStatus.onchange = () => {
          if (geoId) {
            navigator.geolocation.clearWatch(geoId);
            geoId = null;
          }
          detectPermission(permissionStatus.state);
        };

        detectPermission(permissionStatus.state);
      });
    }

    return () => {
      if (geoId) navigator.geolocation.clearWatch(geoId);
    };
  }, [dispatch, t]);
};

export default useUserGPS;
