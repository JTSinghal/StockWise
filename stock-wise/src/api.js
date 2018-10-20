const API_URL = 'http://localhost:5000/';

function getHeaders() {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
}

export function apiGet(endpoint) {
  return fetch(`${API_URL}${endpoint}/`, {headers: getHeaders()}).then((res) => res.json());
}

export function apiPost(endpoint, data = {}) {
  const options = {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data)
  }

  return fetch(`${API_URL}${endpoint}`, options).then((res) => res.json());
}