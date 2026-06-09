const API_BASE = "http://4.224.186.213/evaluation-service";

const authPayload = {
  email: "kartikeya.23b0101150@abes.ac.in",
  name: "kartikeya verma",
  rollNo: "2300320100117",
  accessCode: "cXuqht",
  clientID: "c510789a-97e4-4ab0-8769-aac9bd9642fc",
  clientSecret: "syyTjMMtrmkpdGfP",
};

const fetchAuthToken = async (): Promise<string> => {
  const response = await fetch(`${API_BASE}/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authPayload),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Auth failed: ${response.status} ${text}`);
  }

  const data = await response.json();

  return `${data.token_type} ${data.access_token}`;
};

export const fetchNotifications = async () => {
  const authHeader = await fetchAuthToken();

  const response = await fetch(`${API_BASE}/notifications`, {
    headers: {
      Authorization: authHeader,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `Failed to fetch notifications: ${response.status} ${text}`
    );
  }

  return response.json();
};