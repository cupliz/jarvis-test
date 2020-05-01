const INITIAL_STATE = {
  title: null,
}

// REDUCERS
export const rootReducer = (state = INITIAL_STATE, { type, data }) => {
  switch (type) {
    case 'SET_TITLE':
      return Object.assign({}, state, { title: data })
    default:
      return state
  }
}
