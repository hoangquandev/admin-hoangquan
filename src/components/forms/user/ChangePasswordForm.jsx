import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { changePassword } from '../../../api/user';
// import { changePassword } from '../../api/auth';

const ChangePasswordForm = () => {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const toggleShowPassword = (passwordType) => {
        switch (passwordType) {
            case 'current':
                setShowCurrentPassword(!showCurrentPassword);
                break;
            case 'new':
                setShowNewPassword(!showNewPassword);
                break;
            case 'confirm':
                setShowConfirmPassword(!showConfirmPassword);
                break;
            default:
                break;
        }
    };

    const formik = useFormik({
        initialValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            currentPassword: Yup.string().required('Bắt buộc'),
            newPassword: Yup.string().required('Bắt buộc').min(6, 'Mật khẩu phải chứa ít nhất 6 ký tự'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('newPassword'), null], 'Mật khẩu xác nhận phải trùng khớp với mật khẩu mới')
                .required('Bắt buộc'),
        }),
        onSubmit: async values => {
            try {
                const response = await changePassword(values);
                console.log(response);
            } catch (error) {
                console.error('Đã xảy ra lỗi khi thay đổi mật khẩu:', error);
            }
        },
    });

    return (
        <div className="w-full mx-auto max-w-[520px] bg-white p-10">
            <div className="text-center mb-10">
                <h5 className="text-xl font-medium">Thay đổi mật khẩu</h5>
                <p className="text-base text-gray-500">Nhập mật khẩu cũ và mật khẩu mới của bạn</p>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-4 relative">
                    <input
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        id="currentPassword"
                        name="currentPassword"
                        type={showCurrentPassword ? 'text' : 'password'}
                        placeholder="Mật khẩu hiện tại"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.currentPassword}
                    />
                    <button
                        className='absolute top-2 right-5'
                        type="button"
                        onClick={() => toggleShowPassword('current')}
                    >
                        {showCurrentPassword ? 'Ẩn' : 'Hiển thị'}
                    </button>
                    {formik.touched.currentPassword && formik.errors.currentPassword ? (
                        <p className="text-red-500 text-sm">{formik.errors.currentPassword}</p>
                    ) : null}
                </div>
                <div className="mb-4 relative">
                    <input
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        id="newPassword"
                        name="newPassword"
                        type={showNewPassword ? 'text' : 'password'}
                        placeholder="Mật khẩu mới"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.newPassword}
                    />
                    <button
                        type="button"
                        className='absolute top-2 right-5'
                        onClick={() => toggleShowPassword('new')}
                    >
                        {showNewPassword ? 'Ẩn' : 'Hiển thị'}
                    </button>
                    {formik.touched.newPassword && formik.errors.newPassword ? (
                        <p className="text-red-500 text-sm">{formik.errors.newPassword}</p>
                    ) : null}
                </div>
                <div className="mb-4 relative">
                    <input
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Xác nhận mật khẩu mới"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confirmPassword}
                    />
                    <button
                        type="button"
                        className='absolute top-2 right-5'
                        onClick={() => toggleShowPassword('confirm')}
                    >
                        {showConfirmPassword ? 'Ẩn' : 'Hiển thị'}
                    </button>
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                        <p className="text-red-500 text-sm">{formik.errors.confirmPassword}</p>
                    ) : null}
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                    Thay đổi mật khẩu
                </button>
            </form>
        </div>
    );
};

export default ChangePasswordForm;
