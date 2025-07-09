export const initialState = {
  formValues: {},
};

// Reducer function
export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FORM_VALUES":
      return {
        ...state,
        formValues: {
          ...state.formValues,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};
