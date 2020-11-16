const SET_DATA = "SET_DATA";
const REMOVE_DATA = "REMOVE_DATA";

const initialState = {
  tasks: [],
};

export const data = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case REMOVE_DATA:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task !== action.payload),
      };
    default:
      return state;
  }
};

export const setData = (payload) => ({
  type: SET_DATA,
  payload,
});

export const removeData = (payload) => ({
  type: REMOVE_DATA,
  payload,
});
