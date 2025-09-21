import { TZDate } from '@date-fns/tz';
import { format } from 'date-fns';

export default function formatZonedTime({
  date,
  formatString = 'yyyy-MM-dd',
}: {
  date: Date;
  formatString?: string;
}) {
  return format(new TZDate(date, 'UTC'), formatString);
}
