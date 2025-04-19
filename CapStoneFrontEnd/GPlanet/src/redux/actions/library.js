const API_BASE = "https://localhost:7227/api/Library";
const getToken = () => JSON.parse(localStorage.getItem("token")).token;

export const fetchLibrary = async (userName) => {
  const response = await fetch(`${API_BASE}/${userName}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (!response.ok) throw new Error("Errore nel recupero della libreria!");
  return await response.json();
};

export const addToLibrary = async (userName, gameIds) => {
  const response = await fetch(`${API_BASE}/${userName}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(gameIds),
  });
  if (!response.ok) throw new Error("Errore durante l'acquisto!");
};
