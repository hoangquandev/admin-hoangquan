import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateUserByAdmin } from '../../../api/user';

const EditUserForm = ({ initialValues, id, onChange }) => {
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object({
            username: Yup.string().required('Bắt buộc'),
            email: Yup.string().email('Địa chỉ email không hợp lệ').required('Bắt buộc'),
            role: Yup.string().required('Bắt buộc'),
            phone: Yup.string(),
            status: Yup.string().required('Bắt buộc'),
            address: Yup.string()
        }),
        onSubmit: async values => {
            try {
                const response = await updateUserByAdmin(id, values);
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
                <h5 className="text-xl font-medium">Chỉnh sửa người dùng</h5>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                    <input
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Tên người dùng"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                    />
                    {formik.touched.username && formik.errors.username ? (
                        <p className="text-red-500 text-sm">{formik.errors.username}</p>
                    ) : null}
                </div>
                <div className="mb-4">
                    <input
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email người dùng"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <p className="text-red-500 text-sm">{formik.errors.email}</p>
                    ) : null}
                </div>
                <div className="mb-4">
                    <select
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        id="role"
                        name="role"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.role}
                    >
                        <option value="admin">Admin</option>
                        <option value="customer">Customer</option>
                        <option value="student">Student</option>
                        <option value="dev">Dev</option>
                    </select>
                    {formik.touched.role && formik.errors.role ? (
                        <p className="text-red-500 text-sm">{formik.errors.role}</p>
                    ) : null}
                </div>
                <div className="mb-4">
                    <input
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        id="phone"
                        name="phone"
                        type="text"
                        placeholder="Số điện thoại"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone}
                    />
                    {formik.touched.phone && formik.errors.phone ? (
                        <p className="text-red-500 text-sm">{formik.errors.phone}</p>
                    ) : null}
                </div>
                <div className="mb-4">
                    <input
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        id="address"
                        name="address"
                        type="text"
                        placeholder="Địa chỉ"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.address}
                    />
                    {formik.touched.address && formik.errors.address ? (
                        <p className="text-red-500 text-sm">{formik.errors.address}</p>
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
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
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

export default EditUserForm;
