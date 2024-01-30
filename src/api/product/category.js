import API from "../axios";

// api để lấy tất cả các danh mục
export const getAllCategories = async () => {
    const response = await API.get('/categories')
    return response.data
}

// api để lấy chi tiết của một danh mục
export const getCategoryById = async (id) => {
    const response = await API.get(`/categories/${id}`)
    return response.data
}

// api để tạo mới một danh mục
export const createCategory = async (data) => {// data ={ name, description, slug }
    const response = await API.post('/categories', data)
    return response.data
}

// api để sửa thông tin của một danh mục
export const updateCategory = async (id, data) => {// data ={ name, description, slug }
    const response = await API.put(`/categories/${id}`, data)
    return response.data
}

// api để xóa một danh mục
export const deleteCategory = async () => {
    const response = await API.delete(`/categories/${id}`)
    return response.data
}