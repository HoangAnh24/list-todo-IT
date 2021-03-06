import * as types from "./../constants/ActionType"
export const listAll = () => {
  return {
    type : types.LIST_ALL
  }
}

export const saveTask = (task) => {
  return {
    type : types.SAVE_TASK,
    task
  }
}

export const openForm = () => {
  return {
    type : types.OPEN_FORM
  }
}

export const closeForm = () => {
  return {
    type : types.CLOSE_FORM
  }
}

export const toggleForm = () => {
  return {
    type : types.TOGGLE_FORM
  }
}

export const onUpdateStatus = (id) => {
  return {
    type : types.UPDATE_STATUS_TASK,
    id
  }
}

export const onDeleteTask = (id) => {
  return {
    type : types.DELETE_TASK,
    id
  }
}

export const editTask = (task) => {
  return {
    type : types.EDIT_TASK,
    task
  }
}

export const filterTask = (filter) => {
  return {
    type : types.FILTER_TABLE,
    filter
  }
}

export const searchTask = (keysearch) => {
  return {
    type : types.SEARCH_TABLE,
    keysearch
  }
}

export const sortTask = (sort) => {
  return {
    type : types.SORT_TASK,
    sort
  }
}
