import API from "../axios";

//thêm đơn hàng mới 
//data = { user, address, phoneNumber, products, status, orderDate, deliveryDate, paymentMethod, paymentStatus, totalAmount }
export const createOrder = async (data) => {
    const response = await API.post('/orders', data)
    return response.data
}
// danh sách đơn hàng mới
export const getNewOrders = async () => {
    const response = await API.get('/orders')
    return response.data
}
//cập nhật trạng thái xem của đơn hàng
export const markOrderAsViewed = async (id) => {
    const response = await API.get(`/orders/${id}/viewed`)
    return response.data
}