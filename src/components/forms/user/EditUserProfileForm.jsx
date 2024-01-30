import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentUser } from '../../../api/user';
import { setUser } from '../../../redux/reducers/userReducer';
// import { updateUserProfile } from '../../redux/actions/userActions';

const EditUserProfileForm = () => {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.user.profile);

    const formik = useFormik({
        initialValues: {
            username: profile.username,
            email: profile.email,
            phone: profile.phone,
            address: profile.address,
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Bắt buộc'),
            email: Yup.string().email('Địa chỉ email không hợp lệ').required('Bắt buộc'),
            phone: Yup.string(),
            address: Yup.string(),
        }),
        onSubmit: async values => {
            try {
                const response = await updateCurrentUser(values);
                dispatch(setUser(response.user))
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
                <h5 className="text-xl font-medium">Chỉnh sửa thông tin cá nhân</h5>
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
                <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                    Lưu thay đổi
                </button>
            </form>
        </div>
    );
};

export default EditUserProfileForm;
