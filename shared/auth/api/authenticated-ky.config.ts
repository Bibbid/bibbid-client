import { useAuthStore } from '../model';
import reissueToken from './reissue-token';
import { publicApi } from '~/shared/api/ky.config';

export const api = publicApi.extend({
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
          const refreshToken = useAuthStore.getState().refreshToken;

          if (refreshToken) {
            try {
              const result = await reissueToken({ refreshToken });

              if (result.success) {
                const {
                  data: {
                    data: { accessToken, refreshToken },
                  },
                } = result;

                useAuthStore.getState().signIn({
                  accessToken,
                  refreshToken,
                });
              } else {
                await useAuthStore.getState().signOut();
              }
            } catch (error) {
              console.error(error);
              await useAuthStore.getState().signOut();
            }
          } else {
            await useAuthStore.getState().signOut();
          }
        }

        return response;
      },
    ],
  },
  retry: 2,
});
