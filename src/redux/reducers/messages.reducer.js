import { SET_MESSAGE, CLEAR_MESSAGE } from "../types/user.types";

const initialState = {};

function messagesReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE:
      return { message: payload };

    case CLEAR_MESSAGE:
      return { message: "" };

    default:
      return state;
  }
}

export default messagesReducer;
