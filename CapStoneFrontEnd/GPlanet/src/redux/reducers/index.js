const initialState = {
  profile: {
    name: null,
    userName: null,
    email: null,
    role: null,
    expire: null,
    isExpired: true,
  },
  update: false
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
          userName: null,
          email: null,
          role: null,
          expire: null,
          isExpired: true,
        },
      };

    case "UPDATE":
      return{
        ...state,
        update: !state.update
      }

    default:
      return state;
  }
};

export default mainReducer;
