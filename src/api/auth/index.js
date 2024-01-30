import API from "../axios"

//===== USER =======
// đăng kí data = { username, password, email }
export const registerUser = async (data) => {
    const response = await API.post('/auth/register', data)
    return response.data
}
// đăng nhập data={email,password}
export const loginUser = async (data) => {
    const response = await API.post('/auth/login', data)
    return response.data
}
// cấp lại accessToken data={refreshToken}
export const refresh = async (data) => {
    const response = await API.post('/auth/refresh', data)
    return response.data
}

// đăng xuất
export const logoutUser = async () => {
    const response = await API.post('/auth/logout')
    return response.data
}

//quên mật khẩu data={email}
export const forgotPassword = async (data) => {
    const response = await API.post('/auth/forgot-password', data)
    return response.data
}

// reset mật khẩu data= { resetToken, password }
export const resetPassword = async (data) => {
    const response = await API.post('/auth/reset-password', data)
    return response.data
}
//====== ADMIN ======
// đăng kí data = { username, email, password, role }
export const registerUserbyAdmin = async (data) => {
    const response = await API.post('/auth/admin/register', data)
    return response.data
}






