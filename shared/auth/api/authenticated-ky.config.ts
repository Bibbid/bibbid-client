import { useAuthStore } from '../model';
import { TokenResponseSchema } from '../model/schemas';
import { publicApi } from '~/shared/api/ky.config';
import { parseResponse } from '~/shared/api/response-parser';
import { GeneralResponseSchema } from '~/shared/api/response-schemas';

async function reissueToken({ refreshToken }: { refreshToken: string }) {
  const json = await publicApi
    .extend({
      hooks: {
        beforeRequest: [
          (request) => {
            request.headers.set('Authorization', `Bearer ${refreshToken}`);
          },
        ],
      },
    })
    .post('api/v1/auth/reissue')
    .json();

  return parseResponse(json, GeneralResponseSchema(TokenResponseSchema));
}

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
