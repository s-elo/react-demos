import { FetchData } from "../../type";

export type Notification = {
  id: string;
  message: string;
  date: string;
  user: string;
};

export type NotificationData = Notification[];

export type Notifications = FetchData<NotificationData>;
