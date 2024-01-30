import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import NewProductForm from '../../components/forms/product/NewProductForm';
import EditProductForm from '../../components/forms/product/EditProductForm'; // Import component chỉnh sửa sản phẩm
import { deleteProduct, getProductListByAdmin } from '../../api/product';
import * as XLSX from 'xlsx';

const Products = () => {
    const [addPopup, setAddPopup] = useState(false);
    const [editPopup, setEditPopup] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null); // Thêm state để lưu sản phẩm được chọn để chỉnh sửa
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [change, setChange] = useState(false);

    useEffect(() => {
        const fetchProductList = async () => {
            try {
                const response = await getProductListByAdmin();
                if (response && response.length) {
                    setProducts(response);
                } else {
                    console.error('Không có dữ liệu sản phẩm được trả về.');
                }
            } catch (error) {
                console.error('Đã xảy ra lỗi khi lấy danh sách sản phẩm:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductList();
    }, [change]);

    const getFileName = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `Danh_sach_san_pham_${day}-${month}-${year}.xlsx`;
    };

    const exportToExcel = () => {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(products);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');
        const fileName = getFileName(); // Get file name based on current date
        XLSX.writeFile(workbook, fileName); // Write workbook to file with dynamic file name
    };

    const handleDeleteProduct = async (id) => {
        const response = await deleteProduct(id)
        setChange(!change)
    }

    const handleClickEditPopup = (product) => {
        setSelectedProduct(product); // Lưu sản phẩm được chọn vào state
        setEditPopup(true);
    };

    const handleCloseEditPopup = (e) => {
        if (e.target.classList.contains('bg-slate-600')) {
            setSelectedProduct(null); // Xóa sản phẩm được chọn khi đóng popup chỉnh sửa
            setEditPopup(false);
        }
    };

    const handleClickAddPopup = () => {
        setAddPopup(true);
    };

    const handleClosePopup = (e) => {
        if (e.target.classList.contains('bg-slate-600')) {
            setAddPopup(false);
        }
    };

    return (
        <div className="container mx-auto p-5">
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Products</h1>
                <div>
                    <button onClick={handleClickAddPopup} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none mr-4">
                        Add Product
                    </button>
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
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <ProductItem key={product._id} product={product} onEdit={() => handleClickEditPopup(product)} onDelete={() => handleDeleteProduct(product._id)} /> // Truyền hàm handleClickEditPopup vào props onEdit
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            {addPopup && (
                <div onClick={handleClosePopup} className='fixed top-0 left-0 w-screen h-screen bg-slate-600 bg-opacity-80 flex justify-center items-center'>
                    <NewProductForm onChange={() => { setChange(!change); setAddPopup(false); }} />
                </div>
            )}
            {editPopup && (
                <div onClick={handleCloseEditPopup} className='fixed top-0 left-0 w-screen h-screen bg-slate-600 bg-opacity-80 flex justify-center items-center'>
                    <EditProductForm onChange={() => { setChange(!change); setEditPopup(false); }} initialValues={selectedProduct} id={selectedProduct._id} /> {/* Truyền sản phẩm được chọn và id của sản phẩm */}
                </div>
            )}
        </div>
    );
};

export default Products;
