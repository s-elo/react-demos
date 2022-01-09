import { FetchData } from "../../type";

export type NotificationData = {
  id: string;
  message: string;
  date: string;
  user: string;
  isRead?: boolean;
};

export type Notifications = FetchData<NotificationData[]>;

export type NotificationExtraField = Omit<
  FetchData<NotificationData[]>,
  "data"
>;
