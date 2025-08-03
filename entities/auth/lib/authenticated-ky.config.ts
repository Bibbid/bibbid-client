import ky from 'ky';

// TODO: to be implemented
export const api = ky.create({
  prefixUrl: `${process.env.EXPO_PUBLIC_API_URL}`,
  throwHttpErrors: false,
  credentials: 'include',
  mode: 'cors',
});
