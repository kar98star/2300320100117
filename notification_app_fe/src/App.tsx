import { useEffect, useState } from "react";
import NotificationList from "./components/NotificationList";
import { fetchNotifications } from "./services/notificationService";
import type { Notification } from "./types/notification";

function App() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      setLoading(true);

      const data = await fetchNotifications();

      console.log("API Response:", JSON.stringify(data, null, 2));
      console.log("API Response keys:", Object.keys(data));

      if (data.notifications) {
        setNotifications(data.notifications);
      } else if (Array.isArray(data)) {
        setNotifications(data);
      } else {
        setNotifications([]);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading Notifications...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Campus Notifications</h1>

      <p>Total Notifications: {notifications.length}</p>

      <NotificationList notifications={notifications} />
    </div>
  );
}

export default App;