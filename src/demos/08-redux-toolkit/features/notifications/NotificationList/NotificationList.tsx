import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllUsers } from "../../users/userSlice";
import {
  selectAllNotifications,
  selectNotificationFetchStatus,
  fetchNotifications,
} from "../notificationSlice";
import { formatDistanceToNow, parseISO } from "date-fns";
import "./NotificationList.less";
import { Spinner } from "@/component/Spinner/Spinner";

export default function NotificationList() {
  const notifications = useSelector(selectAllNotifications);
  const notificationFetchStatus = useSelector(selectNotificationFetchStatus);
  const users = useSelector(selectAllUsers);

  const dispatch = useDispatch();

  useEffect(() => {
    if (notificationFetchStatus === "idle") {
      dispatch(fetchNotifications());
    }
    // eslint-disable-next-line
  }, []);

  const renderedNotifications = notifications.map((notification) => {
    const date = parseISO(notification.date);
    const timeAgo = formatDistanceToNow(date);
    const user = users.find((user) => user.id === notification.user) || {
      name: "Unknown User",
    };
    return (
      <li key={notification.id}>
        <div>
          <b>{user.name}</b> {notification.message}
        </div>
        <div title={notification.date}>
          <i>{timeAgo} ago</i>
        </div>
      </li>
    );
  });

  const emptyReminder = (
    <div style={{ textAlign: "center", margin: "20px 0", fontWeight: "bold" }}>
      It is empty now~
    </div>
  );

  const fetchNewNotifications = async () => {
    dispatch(fetchNotifications());
  };

  let finalRender;

  if (notificationFetchStatus === "complete") {
    if (notifications.length === 0) {
      finalRender = emptyReminder;
    } else {
      finalRender = renderedNotifications;
    }
  } else if (
    notificationFetchStatus === "loading" ||
    notificationFetchStatus === "idle"
  ) {
    finalRender = <Spinner />;
  }

  return (
    <div className="notification-list-container">
      <button className="btn refresh-btn" onClick={fetchNewNotifications}>
        Refresh Notifications
      </button>
      {finalRender}
    </div>
  );
}
