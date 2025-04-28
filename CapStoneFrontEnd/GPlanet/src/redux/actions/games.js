const API_BASE = "https://localhost:7227/api/Game";
const getToken = () => JSON.parse(localStorage.getItem("token")).token;

export const fetchGames = async () => {
  try {
    const response = await fetch(API_BASE, {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();
      return { games: data.games, error: false };
    } else {
      throw new Error("Errore nel recupero dei dati!");
    }
  } catch {
    return { games: [], error: true };
  }
};

export const fetchGame = async (id) => {
  try {
    const response = await fetch(`${API_BASE}/${id}`);
    if (response.ok) {
      const data = await response.json();
      return { game: data.game, error: false };
    } else {
      throw new Error("Errore nel recupero dei dati!");
    }
  } catch (error) {
    console.error(error);
    return { game: null, error: true };
  }
};

export const addGame = async (form) => {
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    body: form,
  });
  const data = await response.json();
  if (!response.ok) return { success: false, message: data.message };
  return { success: true, message: data.message };
};

export const updateGame = async (id, form) => {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    body: form,
  });
  const data = await response.json();
  if (!response.ok) return { success: false, message: data.message };
  return { success: true, message: data.message };
};

export const deleteGame = async (id) => {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  const data = await response.json();
  if (!response.ok) return { success: false, message: data.message };
  return { success: true, message: data.message };
};