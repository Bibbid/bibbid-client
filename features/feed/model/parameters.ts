export interface GetFeedsRequest {
  color: string;
  cursor: number;
  size?: number;
  sort?: 'createdAt' | 'desc';
}
