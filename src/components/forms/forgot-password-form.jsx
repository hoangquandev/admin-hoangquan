import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { forgotPassword } from '../../api/auth';

const ForgotPasswordForm = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Địa chỉ email không hợp lệ').required('Bắt buộc'),
        }),
        onSubmit: async values => {
            try {
                const response = await forgotPassword(values);
                console.log(response)
            } catch (error) {
                console.error('Đã xảy ra lỗi khi gửi yêu cầu quên mật khẩu:', error);
            }
        },
    });

    return (
        <div className="w-full mx-auto max-w-[520px] bg-white p-10">
            <div className="text-center mb-10">
                <h5 className="text-xl font-medium">Quên mật khẩu</h5>
                <p className="text-base text-gray-500">Nhập địa chỉ email của bạn để đặt lại mật khẩu</p>
            </div>
            <form onSubmit={formik.handleSubmit}>
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
                <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                    Gửi yêu cầu đặt lại mật khẩu
                </button>
            </form>
        </div>
    );
};

export default ForgotPasswordForm;
