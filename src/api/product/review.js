import API from "../axios"

export const addReview = async (productId, data) => {
    const response = await API.post(`/products/reviews/${productId}`, data)
    return response.data
}
export const updateReview = async (reviewId, data) => {
    const response = await API.put(`/products/reviews/${reviewId}`, data)
    return response.data
}
export const approveReview = async (reviewId, data) => {
    const response = await API.put(`/products/reviews/${reviewId}/approve`, data)
    return response.data
}
export const getUserReviews = async () => {
    const response = await API.get('/products/reviews/user')
    return response.data
}
export const getReviewsByProduct = async (productId) => {
    const response = await API.get(`/products/${productId}reviews`)
    return response.data
}
export const getAverageRating = async (productId) => {
    const response = await API.get(`/products/${productId}/average-rating`)
    return response.data
}
export const getUnapprovedReviews = async () => {
    const response = await API.get('/products/reviews/unapproved')
    return response.data
}