export const cityReducer = (state, action) => {
  switch (action.type) {
    case "ADD_CITY":
      state.push({ city: action.payload.location });
      return [...state];
    default:
      return state;
  }
};
