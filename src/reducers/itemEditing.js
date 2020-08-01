import  * as types from  "./../constants/ActionType";

let initalState = {};

let myReducer = (state = initalState, action) => {
    switch (action.type) {
        case types.EDIT_TASK: 
            return action.task;
        default: 
            return state;
    }
}

export default myReducer;