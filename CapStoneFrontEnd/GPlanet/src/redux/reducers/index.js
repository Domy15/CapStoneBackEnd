const initialState = {
  profile: {
    name: null,
    userName: null,
    email: null,
    role: null,
    expire: null,
    isExpired: true,
  },
  update: false,
  loading: true,
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_PROFILE":
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };

    case "LOGOUT":
      return {
        ...state,
        profile: {
          name: null,
          userName: null,
          email: null,
          role: null,
          expire: null,
          isExpired: true,
        },
        loading: false,
      };

    case "UPDATE":
      return {
        ...state,
        update: !state.update,
      };

    default:
      return state;
  }
};

export default mainReducer;
