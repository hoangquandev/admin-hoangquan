import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { registerUser, registerUserbyAdmin } from '../../api/auth';

const RegisterForm = ({ onChange }) => {
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            role: '', // Thêm trường role
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Bắt buộc'),
            email: Yup.string().email('Địa chỉ email không hợp lệ').required('Bắt buộc'),
            password: Yup.string().required('Bắt buộc'),
            role: Yup.string().required('Bắt buộc'), // Thêm validation cho trường role
        }),
        onSubmit: async values => {
            try {
                const response = await registerUserbyAdmin(values)
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
                <h5 className="text-xl font-medium">Đăng ký</h5>
                <p className="text-base text-gray-500">Đăng ký tài khoản mới để bắt đầu sử dụng</p>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                    <input
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Họ và tên"
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
                        placeholder="Email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <p className="text-red-500 text-sm">{formik.errors.email}</p>
                    ) : null}
                </div>
                <div className="mb-4">
                    <input
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Mật khẩu"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <p className="text-red-500 text-sm">{formik.errors.password}</p>
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
                        <option value="">Chọn vai trò</option>
                        <option value="admin">Admin</option>
                        <option value="dev">Developer</option>
                        <option value="customer">Customer</option>
                        <option value="student">Student</option>
                    </select>
                    {formik.touched.role && formik.errors.role ? (
                        <p className="text-red-500 text-sm">{formik.errors.role}</p>
                    ) : null}
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                    Đăng ký
                </button>

            </form>
        </div>
    );
};

export default RegisterForm;
