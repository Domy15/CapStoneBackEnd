const API_BASE = "https://localhost:7227/api/Comment";
const getToken = () => JSON.parse(localStorage.getItem("token")).token;

export const fetchComments = async (id) => {
  const response = await fetch(`${API_BASE}/getByGame/${id}`);
  if (!response.ok) throw new Error("Errore nel recupero dei dati!");
  const data = await response.json();
  const sorted = data.comments.sort(
    (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
  );
  return sorted;
};

export const addComment = async (comment, userName, id) => {
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
      content: comment,
      userName: userName,
      idGame: id,
    }),
  });
  if (!response.ok) throw new Error("Errore nel aggiunta del commento!");
};

export const updateComment = async (comment, editedContent) => {
  const response = await fetch(`${API_BASE}/${comment.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(editedContent),
  });
  if (!response.ok) throw new Error("Errore nell'update del commento!");
};

export const deleteComment = async (comment) => {
  const response = await fetch(`${API_BASE}/${comment.id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (!response.ok) throw new Error("Errore nell'eliminazione del commento!");
};