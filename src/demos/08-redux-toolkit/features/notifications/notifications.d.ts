export type Notification = {
  id: string;
  message: string;
  date: string;
  user: string;
};

export type NotificationData = Notification[];

export type Notifications = {
  data: NotificationData;
  status: "idle" | "loading" | "complete" | "failed";
  error: string | null | undefined;
};
