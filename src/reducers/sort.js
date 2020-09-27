import  * as types from  "./../constants/ActionType";

let initalState = {
    sortBy : 'name',
    sortValue : 1,
};

let myReducer = (state = initalState, action) => {
    switch (action.type) {
        case types.SORT_TASK:
            return action.sort;
        default: 
            return state;
    }
}

export default myReducer;