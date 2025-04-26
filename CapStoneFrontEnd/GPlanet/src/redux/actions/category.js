const API_BASE = "https://localhost:7227/api/Category";

export const getCategories = async () => {
  const response = await fetch(API_BASE);
  if (!response.ok) throw new Error("Errore durante il recupero dei dati!");
  const data = await response.json();
  return data.categories;
};
