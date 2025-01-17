const initialState = {
    user_access: null,
    profile: {},
    file: [],
    shared_files: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'USER_ACCESS':
            return {
                ...state,
                user_access: action.payload,
            }
        case 'USER_PROFILE':
            return {
                ...state,
                profile: action.payload,
            }
        case 'USER_FILES':
            return {
                ...state,
                file: action.payload,
            }
        case 'USER_SHARED_FILES':
            return {
                ...state,
                shared_files: action.payload,
            }
        default:
            return state
    }
}