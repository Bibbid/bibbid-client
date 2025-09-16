import { useAuthStore } from '../model';
import { publicApi } from '~/shared/api/ky.config';

export const authenticatedApi = publicApi.extend({
  hooks: {
    beforeRequest: [
      (request) => {
        const accessToken = useAuthStore.getState().accessToken;
        const refreshToken = useAuthStore.getState().refreshToken;

        if (accessToken && refreshToken) {
          request.headers.set('Authorization', `Bearer ${accessToken}`);
        } else if (refreshToken) {
          request.headers.set('Authorization', `Bearer ${refreshToken}`);
        }
      },
    ],
    afterResponse: [
      async (_, __, response) => {
        if (response.status === 401) {
          await useAuthStore.getState().signOut();
        }

        return response;
      },
    ],
  },
});
