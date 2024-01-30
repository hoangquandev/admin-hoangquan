import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateProduct } from '../../../api/product';

const EditProductForm = ({ initialValues, id, onChange }) => {
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object({
            name: Yup.string().required('Bắt buộc'),
            description: Yup.string().required('Bắt buộc'),
            price: Yup.number().typeError('Phải là một số').required('Bắt buộc'),
            status: Yup.string().required('Bắt buộc'),
        }),
        onSubmit: async values => {
            try {
                const response = await updateProduct(id, values);
                onChange()
                // Xử lý phản hồi từ API
                console.log('Phản hồi từ API:', response);
            } catch (error) {
                console.log('Lỗi từ API:', error);
            }
        },
    });

    return (
        <div className="w-full mx-auto max-w-[520px] bg-white p-10">
            <div className="text-center mb-10">
                <h5 className="text-xl font-medium">Chỉnh sửa sản phẩm</h5>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                    <input
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Tên sản phẩm"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <p className="text-red-500 text-sm">{formik.errors.name}</p>
                    ) : null}
                </div>
                <div className="mb-4">
                    <input
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        id="description"
                        name="description"
                        type="text"
                        placeholder="Mô tả sản phẩm"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.description}
                    />
                    {formik.touched.description && formik.errors.description ? (
                        <p className="text-red-500 text-sm">{formik.errors.description}</p>
                    ) : null}
                </div>
                <div className="mb-4">
                    <input
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        id="price"
                        name="price"
                        type="number"
                        placeholder="Giá sản phẩm"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.price}
                    />
                    {formik.touched.price && formik.errors.price ? (
                        <p className="text-red-500 text-sm">{formik.errors.price}</p>
                    ) : null}
                </div>
                <div className="mb-4">
                    <select
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        id="status"
                        name="status"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.status}
                    >
                        <option value={true}>Public</option>
                        <option value={false}>Draft</option>
                    </select>
                    {formik.touched.status && formik.errors.status ? (
                        <p className="text-red-500 text-sm">{formik.errors.status}</p>
                    ) : null}
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                    Lưu chỉnh sửa
                </button>
            </form>
        </div>
    );
};

export default EditProductForm;
