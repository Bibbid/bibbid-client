export interface ReportFeedRequest {
  reportedFeedId: number;
  reason: string;
}

export interface ReportUserRequest {
  reportedUserUuid: string;
  reason: string;
}
