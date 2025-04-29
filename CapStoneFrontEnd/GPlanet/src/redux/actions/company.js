const API_BASE = "https://localhost:7227/api/Company";
const getToken = () => JSON.parse(localStorage.getItem("token")).token;

export const getCompanies = async () => {
  const response = await fetch(API_BASE);
  if (!response.ok) throw new Error("Errore nel recupero dei dati!");
  const data = await response.json();
  return data.companies;
};

export const addCompany = async (name) => {
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

export const updateCompany = async (id, name) => {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(name),
  });
  const data = await response.json();
  if (!response.ok) return { success: false, message: data.message };
  return { success: true, message: data.message };
};