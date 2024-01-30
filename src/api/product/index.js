import API from "../axios"


export const addNewProduct = async (data) => {
    const response = await API.post('/products', data)
    return response.data
}

export const getProductListByAdmin = async () => {
    const response = await API.get('/products')
    return response.data
}

export const getProductListByUser = async () => {
    const response = await API.get('/products/public')
    return response.data
}
export const getDetailProductBySlug = async (slug) => {
    const response = await API.get(`/products/${slug}`)
    return response.data
}

export const updateProduct = async (id, data) => {
    const response = await API.put(`/products/${id}`, data)
    return response.data
}

export const deleteProduct = async (id) => {
    const response = await API.delete(`/products/${id}`)
    return response.data
}