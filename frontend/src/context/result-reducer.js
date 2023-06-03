export const ResultReducer = (state, action) => {
    switch (action.type) {
        case 'SET_RESULT': {
            return { result: action.payload }
        }
        case 'RESET_RESULT': {
            return { result: null }
        }
        default: {
            return state;
        }
    }
}