const API_BASE = "https://localhost:7227/api/Company";

export const getCompanies = async () => {
    const response = await fetch(API_BASE);
    if (!response.ok) throw new Error("Errore nel recupero dei dati!");
    const data = await response.json();
    return data.companies;
}