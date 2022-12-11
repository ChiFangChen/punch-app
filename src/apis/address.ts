import axios from 'axios';
import { ACCESS_TOKEN } from '@/utils/constants';

type GetAddress = (data: {
  latitude: number;
  longitude: number;
}) => Promise<{ features: { place_name: string }[] }>;
export const getAddress: GetAddress = async ({ latitude, longitude }) => {
  try {
    const result = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${ACCESS_TOKEN}`
    );
    if (result.status === 200 && result.statusText === 'OK') return result.data;

    throw Error('API error');
  } catch (error) {
    alert('API error');
    throw Error();
  }
};
