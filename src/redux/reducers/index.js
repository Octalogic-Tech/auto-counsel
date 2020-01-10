const initialState = {
    years: [],
    makes: [],
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

        default:
            return state;

    }
};

export default rootReducer;