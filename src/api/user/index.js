import API from "../axios"

//user
export const updateCurrentUser = async (data) => {
    const response = await API.put('/users/me', data)
    return response.data
}
export const viewCurrentUserProfile = async () => {
    const response = await API.get('/users/profile')
    return response.data
}
export const changePassword = async (data) => { //data={ currentPassword, newPassword }
    const response = await API.put('/users/change-password', data)
    return response.data
}

//admin
export const getAllUsers = async () => {
    const response = await API.get('/users')
    return response.data
}
export const updateUserByAdmin = async (id, data) => {
    const response = await API.put(`/users/${id}`, data)
    return response.data
}
export const viewUserProfileByAdmin = async (id) => {
    const response = await API.get(`/users/${id}`)
    return response.data
}
export const deleteUserByAdmin = async (id) => {
    const response = await API.delete(`/users/${id}`)
    return response.data
}