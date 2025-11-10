export const initialState = {
  employees: [],
  employeeSelected: {},
  formValues: {},
  openModal: false,
};

// Reducer function
export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_EMPLOYEES":
      return {
        ...state,
        employees: action.payload,
      };
    case "SET_OPEN_MODAL":
      return {
        ...state,
        openModal: !state.openModal,
      };
    case "LOAD_DATA":
      return {
        ...state,
        employees: action.payload,
      };
    case "SET_EMPLOYEE_SELECTED":
      return {
        ...state,
        employeeSelected: JSON.parse(action.payload),
      };
    case "SET_FORM_VALUES":
      return {
        ...state,
        formValues: {
          ...state.formValues,
          ...action.payload,
        },
      };
    case "RESET_FORM_VALUE":
      state.formValues[action.payload];
      delete state.formValues[action.payload];
      return {
        ...state,
      };

    case "SET_FORM":
      return {
        ...state,
        formValues: {
          ...action.payload,
        },
      };
    default:
      return state;
  }
};
