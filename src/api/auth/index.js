import API from "../axios"


export const registerUser = async (data) => {
    const response = await API.post('/auth/register', data)
    return response.data
}

export const registerUserbyAdmin = async (data) => {
    const response = await API.post('/auth/admin/register', data)
    return response.data
}

export const loginUser = async (data) => {
    const response = await API.post('/auth/login', data)
    return response.data
}

export const refresh = async (data) => {
    const response = await API.post('/auth/refresh', data)
    return response.data
}

export const logoutUser = async () => {
    const response = await API.post('/auth/logout')
    return response.data
}

export const forgotPassword = async (data) => {
    const response = await API.post('/auth/forgot-password', data)
    return response.data
}
export const resetPassword = async (data) => {
    const response = await API.post('/auth/reset-password', data)
    return response.data
}


