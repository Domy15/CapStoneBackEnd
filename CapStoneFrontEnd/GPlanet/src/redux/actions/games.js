const API_BASE = "https://localhost:7227/api/Game";

export const fetchGames = async () => {
    try {
        const response = await fetch(API_BASE, {
            method: 'GET'
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
}