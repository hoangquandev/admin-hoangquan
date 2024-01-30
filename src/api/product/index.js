import API from "../axios"

// thêm sản phẩm data ={ name, description, price, status, category } 
// luu ý category là id của category
export const addNewProduct = async (data) => {
    const response = await API.post('/products', data)
    return response.data
}
// danh sách tất cả sản phẩm bởi admin gồm public và draft
export const getProductListByAdmin = async () => {
    const response = await API.get('/products')
    return response.data
}
// danh sách sản phẩm (public) cho user
export const getProductListByUser = async () => {
    const response = await API.get('/products/public')
    return response.data
}
// chi tiết sản phẩm theo slug
export const getDetailProductBySlug = async (slug) => {
    const response = await API.get(`/products/${slug}`)
    return response.data
}
// cập nhật sản phẩm data ={ name, description, price, status, category } 
// luu ý category là id của category
export const updateProduct = async (id, data) => {
    const response = await API.put(`/products/${id}`, data)
    return response.data
}
// xóa sản phẩm
export const deleteProduct = async (id) => {
    const response = await API.delete(`/products/${id}`)
    return response.data
}