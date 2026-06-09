import type { Notification } from "../types/notification";

interface Props {
  notifications: Notification[];
}

function NotificationList({ notifications }: Props) {
  return (
    <div>
      <h2>All Notifications</h2>

      {notifications.map((notification) => (
        <div
          key={notification.ID}
          style={{
            border: "1px solid #ccc",
            margin: "10px",
            padding: "10px",
          }}
        >
          <h3>{notification.Type}</h3>
          <p>{notification.Message}</p>
          <small>{notification.Timestamp}</small>
        </div>
      ))}
    </div>
  );
}

export default NotificationList;