const API_BASE = "https://localhost:7227/api/WishList";
const getToken = () => JSON.parse(localStorage.getItem("token")).token;

export const fetchWishlist = async (userName) => {
  const response = await fetch(`${API_BASE}/${userName}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!response.ok) throw new Error("Errore nel recupero della wishlist!");
  const data = await response.json();
  return data.wishList;
};

export const removeFromWishlist = async (userName, gameId) => {
  const response = await fetch(`${API_BASE}/${userName}/${gameId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!response.ok)
    throw new Error("Errore durante la rimozione dalla wishlist!");
};

export const addToWishList = async (userName, gameId) => {
  const response = await fetch(`${API_BASE}/${userName}/${gameId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (!response.ok) {
    throw new Error("Errore nell'aggiunta dei dati!");
  }
};
