import { format } from 'date-fns';
import { type PropsWithChildren, useEffect } from 'react';
import { mmkv } from '~/shared/model';

export default function ResetColorBoundary({ children }: PropsWithChildren) {
  useEffect(() => {
    const today = format(new Date(), 'yyyy-MM-dd');

    if (today !== mmkv.getString('todayColorDate')) {
      mmkv.delete('todayColorDisplayName');
      mmkv.delete('todayColorRgb');
      mmkv.delete('todayColorDate');
    }

    console.log('[INFO] todayColorDate', mmkv.getString('todayColorDate'));
    console.log('[INFO] todayColorRgb', mmkv.getString('todayColorRgb'));
    console.log(
      '[INFO] todayColorDisplayName',
      mmkv.getString('todayColorDisplayName')
    );
  }, []);

  return <>{children}</>;
}
