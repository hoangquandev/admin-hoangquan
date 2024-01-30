import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { setTokens } from '../../redux/reducers/authReducer';
import { loginUser } from '../../api/auth';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Địa chỉ email không hợp lệ').required('Bắt buộc'),
            password: Yup.string().required('Bắt buộc'),
        }),
        onSubmit: async values => {
            try {
                const response = await loginUser(values)
                dispatch(setTokens(response))
                navigate('/')
            } catch (error) {
                console.error('Đã xảy ra lỗi khi gửi yêu cầu đăng nhập:', error);
            }
        },
    });

    return (
        <div className="w-full mx-auto max-w-[520px] bg-white p-10">
            <div className="text-center mb-10">
                <h5 className="text-xl font-medium">Đăng nhập</h5>
                <p className="text-base text-gray-500">Đăng nhập vào tài khoản của bạn để bắt đầu sử dụng</p>
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
                <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                    Đăng nhập
                </button>
                <div className="mt-3 text-center">
                    <Link to="/forgot-password" className="text-blue-500 text-sm">
                        Quên mật khẩu?
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
