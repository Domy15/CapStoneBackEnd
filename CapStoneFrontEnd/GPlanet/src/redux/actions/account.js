import { jwtDecode } from "jwt-decode";
const getToken = () => JSON.parse(localStorage.getItem("token")).token;

const registerURL = "https://localhost:7227/api/Account/register";

export const RegisterAccount = async (form) => {
  try {
    const response = await fetch(registerURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    if (!response.ok) {
      return null;
    } else {
      return await response.json();
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

const loginURL = "https://localhost:7227/api/Account/login";

export const LoginAccount = async (form) => {
  try {
    const response = await fetch(loginURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    if (response.status === 401) {
      console.log("Non autorizzato!!!!!");
    }
    if (!response.ok) {
      return false;
    } else {
      const data = await response.json();
      const localItem = JSON.stringify(data);
      localStorage.setItem("token", localItem);
      return true;
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};

export const SetToken = () => {
  return async (dispatch) => {
    let getToken = JSON.parse(localStorage.getItem("token"));
    const token = jwtDecode(getToken.token);
    dispatch({
      type: "SAVE_PROFILE",
      payload: {
        name: token.name,
        userName: token.username,
        email: token.email,
        role: token.role,
        expire: token.exp,
        isExpired: false,
      },
    });
  };
};

export const Logout = () => {
  return async (dispatch) => {
    localStorage.removeItem("token");
    dispatch({
      type: "LOGOUT",
    });
  };
};

export const AutoLogin = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const getToken = JSON.parse(token);
        const tokenJwt = jwtDecode(getToken.token);

        const currentTime = Math.floor(Date.now() / 1000);
        if (tokenJwt && tokenJwt.exp > currentTime) {
          dispatch({
            type: "SAVE_PROFILE",
            payload: {
              name: tokenJwt.name,
              userName: tokenJwt.username,
              email: tokenJwt.email,
              role: tokenJwt.role,
              expire: tokenJwt.exp,
              isExpired: false,
            },
          });
        } else {
          localStorage.removeItem("token");
          dispatch({ type: "LOGOUT" });
        }
      } catch (error) {
        console.error("Errore nel decodificare il token", error);
        localStorage.removeItem("token");
        dispatch({ type: "LOGOUT" });
      }
    } else {
      dispatch({ type: "LOGOUT" });
    }
  };
};

const profileURL = "https://localhost:7227/api/Account/profile/me";

export const getProfile = async () => {
  const response = await fetch(profileURL, {
    method: "GET",
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!response.ok) throw new Error("Errore nel recupero dei dati!");
  return await response.json();
};

const PfpURL = "https://localhost:7227/api/Account/updatePfP/";

export const changePfp = async (form, userName) => {
  const response = await fetch(PfpURL + userName, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    body: form,
  });
  if (!response.ok) throw new Error("Errore nel aggiornamento dei dati!");
};
