const API_BASE = "https://localhost:7227/api/Cart";
const getToken = () => JSON.parse(localStorage.getItem("token")).token;

export const fetchCart = async (userName) => {
  const response = await fetch(`${API_BASE}/${userName}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!response.ok) throw new Error("Errore nel recupero del carrello!");
  return await response.json();
};

export const clearCart = async (userName) => {
  const response = await fetch(`${API_BASE}/${userName}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!response.ok) throw new Error("Errore nello svuotamento del carrello!");
};

export const addToCart = async (userName, gameId) => {
  const response = await fetch(`${API_BASE}/${userName}/${gameId}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!response.ok) throw new Error("Errore nell'aggiunta al carrello!");
};

export const removeFromCart = async (userName, game) => {
  const response = await fetch(`${API_BASE}/${userName}/${game.id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!response.ok) throw new Error("Errore nella rimozione dal carrello!");
};