import  * as types from  "./../constants/ActionType";
import randomstring from 'randomstring';
let data = JSON.parse(localStorage.getItem('tasks'));
let initalState = data ? data : [];

let findIndex = (tasks, id) => {
    let result = -1;
    tasks.forEach((task, index) => {
        if (task.id === id) {
            result = index;
        }
    });
    return result;
}

let myReducer = (state = initalState, action) => {
    switch (action.type) {
        case types.LIST_ALL :
            return state;
        case types.SAVE_TASK :
            let task = {
                id: action.task.id,
                name: action.task.name,
                status: action.task.status
            };
            if(!task.id) {
                task.id = randomstring.generate();
                state.push(task); 
            } else {
                let index = findIndex(state, task.id);
                state[index] = task;
            }
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        case types.UPDATE_STATUS_TASK :
            let index = findIndex(state, action.id);
            state[index] = {
                ...state[index],
                status : !state[index].status
            }
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        case types.DELETE_TASK :
            let index2 = findIndex(state, action.id);
            state.splice(index2, 1);
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        default: 
            return state;
    }
}

export default myReducer;