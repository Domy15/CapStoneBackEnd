const initialState = {
  profile: {
    userName: null,
    email: null,
    role: null,
    expire: null,
    isExpired: true,
  },
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_PROFILE":
      return {
        ...state,
        profile: action.payload,
      };

    case "LOGOUT":
      return {
        ...state,
        profile: {
          name: null,
          email: null,
          role: null,
          expire: null,
          isExpired: true,
        },
      };

    default:
      return state;
  }
};

export default mainReducer;
