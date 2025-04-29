const API_BASE = "https://localhost:7227/api/Category";
const getToken = () => JSON.parse(localStorage.getItem("token")).token;

export const getCategories = async () => {
  const response = await fetch(API_BASE);
  if (!response.ok) throw new Error("Errore durante il recupero dei dati!");
  const data = await response.json();
  return data.categories;
};

export const addCategory = async (name) => {
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ name: name }),
  });
  const data = await response.json();
  if (!response.ok) return { success: false, message: data.message };
  return { success: true, message: data.message };
};

export const deleteCategory = async (id) => {
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