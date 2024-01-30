import API from "../axios"

//thêm đánh giá data={ rating:number, content:string }
export const addReview = async (productId, data) => {
    const response = await API.post(`/products/reviews/${productId}`, data)
    return response.data
}
//sửa data={ rating:number, content:string }
export const updateReview = async (reviewId, data) => {
    const response = await API.put(`/products/reviews/${reviewId}`, data)
    return response.data
}
//duyệt review
export const approveReview = async (reviewId) => {
    const response = await API.put(`/products/reviews/${reviewId}/approve`)
    return response.data
}
//Lấy danh sách review của người mua hàng
export const getUserReviews = async () => {
    const response = await API.get('/products/reviews/user')
    return response.data
}
// tất cả đánh giá của sản phẩm
export const getReviewsByProduct = async (productId) => {
    const response = await API.get(`/products/${productId}reviews`)
    return response.data
}
//điểm trung bình của sản phẩm dựa trên đánh giá đã được duyệt
export const getAverageRating = async (productId) => {
    const response = await API.get(`/products/${productId}/average-rating`)
    return response.data
}
//danh sách review mới chưa duyệt
export const getUnapprovedReviews = async () => {
    const response = await API.get('/products/reviews/unapproved')
    return response.data
}