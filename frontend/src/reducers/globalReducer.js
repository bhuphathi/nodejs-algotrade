export const login = () => {
    return {
        type: "LOGIN"
    }
}

export const logout = () => {
    return {
        type: "LOGOUT"
    }
}

export const switchTheme = (themeName) => {
    return {
        type: "SWITCH_THEME",
        payload: themeName
    }
}

const intialState = {
    isLoggedIn: false,
    theme: 'default'
}

export default globalReducer = (state = intialState, action) =>{
    switch (action.type) {
        case 'LOGIN':
            return { 
                ...state, 
                isLoggedIn: true
            }
        case 'LOGOUT':
            return { 
                ...state, 
                isLoggedIn: false
            }
        case 'SWITCH_THEME':
            return { 
                ...state, 
                theme: action.payload
            }
        default:
            return state
    }
}