const initialState = {
    years: [],
    makes: [],
    models: [],
    selectedYear: "",
    selectedMake: "",
    selectedModel: "",
    vehicle: {},
};
  
function rootReducer(state = initialState, action) {
    switch(action.type){
        case "GET_YEARS": {
            return state
        }

        case "UPDATE_YEARS": {
            return { ...state, years: action.payload }
        }

        case "UPDATE_MAKES": {
            return { ...state, makes: action.payload }
        }

        case "UPDATE_MODELS": {
            return { ...state, models: action.payload }
        }

        case "UPDATE_YEAR": {
            return { ...state, selectedYear: action.payload }
        }

        case "UPDATE_VEHICLE_DETAIL": {
            return { ...state, vehicle: action.payload }
        }

        default:
            return state;

    }
};

export default rootReducer;