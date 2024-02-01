import React, { useEffect, useState } from 'react'
import usePagination from '../../hooks/usePagination';
import { deleteOrder, getNewOrders, updateOrderStatus, updatePaymentStatus } from '../../api/order';
import Pagination from '../../components/pagination';
import OrderItem from './OrderItem';
import OrderDetailModal from '../../components/modal/OrderDetailModal';
import * as XLSX from 'xlsx';

const Orders = () => {
    const [addPopup, setAddPopup] = useState(false);
    const [editPopup, setEditPopup] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [change, setChange] = useState(false);
    const { currentItems, currentPage, itemsPerPage, paginate } = usePagination(orders);

    useEffect(() => {
        const fetchOrderList = async () => {
            try {
                const response = await getNewOrders();
                if (response && response.length) {
                    setOrders(response);
                } else {
                    console.error('Không có dữ liệu sản phẩm được trả về.');
                }
            } catch (error) {
                console.error('Đã xảy ra lỗi khi lấy danh sách sản phẩm:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderList();
    }, [change]);

    const getFileName = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `Danh_sach_don_hang_${day}-${month}-${year}.xlsx`;
    };

    const exportToExcel = () => {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(orders);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');
        const fileName = getFileName();
        XLSX.writeFile(workbook, fileName);
    };

    const handleDeleteProduct = async (id) => {
        const response = await deleteOrder(id)
        setChange(!change)
    }

    const handleClickOpenPopup = (order) => {
        setSelectedOrder(order);
        setOpenPopup(true);
    };
    const handleCloseModal = () => {
        setSelectedOrder(null);
        setOpenPopup(false);
    }
    const handleUpdateStatusOrder = async (id, data) => {
        // const status = data==='Pending', 'Processing', 'Shipped', 'Delivered'
        const getStatus = (data) => {
            switch (data) {
                case 'Pending':
                    return 'Processing';
                case 'Processing':
                    return 'Shipped';
                case 'Shipped':
                    return 'Delivered';
                case 'Delivered':
                    return 'Pending';
                default:
                    return '';
            }
        };
        const status = getStatus(data)
        const response = await updateOrderStatus(id, { status })
        setChange(!change)

    }
    const handleUpdatePaymentStatusOrder = async (id, data) => {
        // const status = data==='Pending', 'Processing', 'Shipped', 'Delivered'
        const getStatusPayment = (data) => {
            switch (data) {
                case 'pending':
                    return 'paid';
                case 'paid':
                    return 'cancel';
                case 'cancel':
                    return 'pending';
                default:
                    return '';
            }
        };
        const paymentStatus = getStatusPayment(data)
        const response = await updatePaymentStatus(id, { paymentStatus })
        setChange(!change)
        console.log(response);
    }
    return (
        <div className="container mx-auto p-5">
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Products</h1>
                <div>
                    {/* <button onClick={handleClickAddPopup} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none mr-4">
                        Add Order
                    </button> */}
                    <button onClick={exportToExcel} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none">
                        Export to Excel
                    </button>
                </div>
            </div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                {loading ? (
                    <div className="flex justify-center items-center">
                        <div className="w-16 h-16 border-t-4 border-b-4 border-gray-600 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div>
                        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                            <table className="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">STT</th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Phone</th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Payment status</th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total price</th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((item, index) => (
                                        <OrderItem key={item._id} order={item} index={index + 1 + (currentPage - 1) * itemsPerPage} onEdit={() => handleClickOpenPopup(item)} onDelete={() => handleDeleteProduct(item._id)} handleUpdateStatusOrder={handleUpdateStatusOrder} handleUpdatePaymentStatusOrder={handleUpdatePaymentStatusOrder} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Pagination itemsPerPage={itemsPerPage} totalItems={orders.length} paginate={paginate} currentPage={currentPage} /> {/* Thêm phân trang */}
                    </div>
                )}
            </div>
            {openPopup && <OrderDetailModal order={selectedOrder} closeModal={handleCloseModal} />}
            {/* {addPopup && (
                <div onClick={handleClosePopup} className='fixed top-0 left-0 w-screen h-screen bg-slate-600 bg-opacity-80 flex justify-center items-center'>
                    <NewProductForm onChange={() => { setChange(!change); setAddPopup(false); }} />
                </div>
            )} */}
            {/* {editPopup && (
                <div onClick={handleCloseEditPopup} className='fixed top-0 left-0 w-screen h-screen bg-slate-600 bg-opacity-80 flex justify-center items-center'>
                    <EditProductForm onChange={() => { setChange(!change); setEditPopup(false); }} initialValues={selectedProduct} id={selectedProduct._id} />
                </div>
            )} */}
        </div>
    )
}

export default Orders