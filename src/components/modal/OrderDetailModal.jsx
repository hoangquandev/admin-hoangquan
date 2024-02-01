
import React, { useRef } from 'react';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

const OrderDetailModal = ({ order, closeModal }) => {
    const modalRef = useRef(null);
    const htmlToImageConvert = () => {
        toPng(modalRef.current, { cacheBust: false })
            .then((dataUrl) => {
                // Calculate the width of the PDF document based on the page size (assuming A4 size here)
                const pdfWidth = 190; // A4 width in mm (approx. 8.27 inches)
                const pdfHeight = 297; // A4 height in mm (approx. 11.69 inches)

                // Calculate the aspect ratio of the image
                const img = new Image();
                img.src = dataUrl;
                img.onload = () => {
                    const aspectRatio = img.height / img.width;

                    // Calculate the height of the image based on the aspect ratio and the width of the PDF document
                    const imgHeight = pdfWidth * aspectRatio;

                    // Create a new PDF document
                    const pdf = new jsPDF('p', 'mm', 'a4');

                    // Add the PNG image to the PDF document with full width and calculated height
                    pdf.addImage(dataUrl, 'PNG', 10, 10, pdfWidth, imgHeight);

                    // Save the PDF document
                    pdf.save(`order-${order._id}.pdf`);
                };
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 text-center">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                {/* Icon or Image */}
                            </div>
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Chi tiết đơn hàng</h3>
                                <div className="mt-2 bg-white" ref={modalRef}>
                                    {/* Order Details */}
                                    <p className="text-sm text-gray-500"><span className="font-semibold">Tên người dùng:</span> {order.user.username}</p>
                                    <p className="text-sm text-gray-500"><span className="font-semibold">Số điện thoại:</span> {order.phoneNumber}</p>
                                    <p className="text-sm text-gray-500"><span className="font-semibold">Địa chỉ:</span> {order.address}</p>
                                    <p className="text-sm text-gray-500"><span className="font-semibold">Ngày đặt hàng:</span> {order.orderDate}</p>
                                    <p className="text-sm text-gray-500"><span className="font-semibold">Ngày giao hàng:</span> {order.deliveryDate}</p>
                                    <p className="text-sm text-gray-500"><span className="font-semibold">Phương thức thanh toán:</span> {order.paymentMethod}</p>
                                    <p className="text-sm text-gray-500"><span className="font-semibold">Trạng thái thanh toán:</span> {order.paymentStatus}</p>
                                    {/* <p className="text-sm text-gray-500"><span className="font-semibold">Tổng số tiền:</span> {order.totalAmount}</p> */}
                                    <p className="text-sm text-gray-500"><span className="font-semibold">Trạng thái đơn hàng:</span> {order.status}</p>
                                    {/* Products List */}
                                    <div className="mt-4">
                                        <h4 className="text-md font-medium text-gray-900">Sản phẩm:</h4>
                                        <ul className="mt-2 divide-y divide-gray-200">
                                            {order.products.map(product => (
                                                <li key={product._id} className="py-2">
                                                    <div className="flex justify-between">
                                                        <p className="text-sm font-medium text-gray-900">{product.productId.name}</p>
                                                        <p className="text-sm text-gray-500">{product.price} VNĐ x {product.quantity}</p>
                                                    </div>
                                                </li>
                                            ))}
                                            <li className="py-2">
                                                <div className="flex justify-between">
                                                    <p className="text-sm font-medium text-gray-900">Tổng tiền:</p>
                                                    <p className="text-sm text-gray-500">{order.totalAmount} VNĐ</p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button type="button" onClick={htmlToImageConvert} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                            Xuất đơn hàng
                        </button>
                        <button onClick={closeModal} type="button" className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm">
                            Đóng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailModal;
