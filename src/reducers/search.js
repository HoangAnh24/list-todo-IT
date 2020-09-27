import  * as types from  "./../constants/ActionType";

let initalState = '';

let myReducer = (state = initalState, action) => {
    switch (action.type) {
        case types.SEARCH_TABLE:
            return action.keysearch;
        default: 
            return state;
    }
}

export default myReducer;