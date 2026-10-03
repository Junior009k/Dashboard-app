const API_URL = "http://servidor:5002/api";

export async function apiFetch(
  endpoint,
  options = {},
  token = null
) {
  const headers = {
    ...options.headers
  };

  if (options.body) {
    headers["Content-Type"] =
      "application/json";
  }

  if (token) {
    headers["Authorization"] =
      `Bearer ${token}`;
  }

  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,
      headers
    }
  );

  if (!response.ok) {
    throw new Error(
      `Error HTTP: ${response.status}`
    );
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}