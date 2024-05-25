import React, { useContext, useRef, useState } from 'react';
import { toast, Toaster } from "react-hot-toast";
import { UserContext } from '../../App';
import axios from 'axios';

const ChangePassword = () => {

    let { userAuth: { access_token } } = useContext(UserContext)

    let changePasswordForm = useRef();
    let [ isDisabled, setDisabled ] = useState(false);
    
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/; 

    const handleSubmit = (e) => {
        e.preventDefault();

        let form = new FormData(changePasswordForm.current);
        let formData = { };

        for (let [key, value] of form.entries()) {
            formData[key] = value;
        }

        let { currentPassword, newPassword, confirmationPassword } = formData;

        if (!currentPassword.length || !newPassword.length || !confirmationPassword.length) {
            return toast.error("Bạn cần điền toàn bộ các mục");
        }

        if (!passwordRegex.test(currentPassword) || !passwordRegex.test(newPassword)) {
            return toast.error("Mật khẩu từ 8 tới 20 ký tự và có ít nhất một chữ in hoa và một chữ số")
        }

        if (newPassword !== confirmationPassword) {
            return toast.error("Mật khẩu không trùng khớp");
        }

        setDisabled(true);

        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/change-password", formData, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
        .then(() => {
            setDisabled(false);
            return toast.success("Đã thay đổi mật khẩu");
        })
        .catch(({ response }) => {
            setDisabled(false);
            return toast.error(response.data.error);
        })
        
    }

    return (
        <>
            <Toaster />
            <div className='container mx-auto px-[15px] mt-[50px]'>
                <div className='my-[-15px] before:content-["_"] before:table after:content-["_"] after:table after:clear-both'>
                    <div className="lg:ml-[8.33333333%] lg:w-[83.33333333%] ld:float-left relative min-h-[1px] px-[15px]">
                        <div className="border-[#dddddd] bg-white border rounded shadow-[0_1px_1px_rgba(0,0,0,0.05)] mb-5 border-solid">
                            <div className="text-[#333333] bg-neutral-100 border-[#dddddd] px-[15px] py-[10px] rounded-t-[3px] border-b border-solid">Đổi mật khẩu</div>
                            <div className='p-[15px] before:content-["_"] before:table after:content-["_"] after:table after:clear-both'>
                                <form method="POST" role='form' ref={changePasswordForm}>
                                    <div className="mb-[15px] clearfix">
                                        <label className='pt-2 lg:w-[16.66666667%] lg:float-left text-right relative min-h-[1px] px-[15px] after:content-["_*_"] after:text-[red]'>Mật khẩu cũ</label>
                                        <div className="lg:w-2/3 lg:float-left relative min-h-[1px] px-[15px]">
                                            <input type="password" className='form-input' name='currentPassword'/>
                                        </div>
                                    </div>
                                    <div className="mb-[15px] clearfix">
                                        <label className='pt-2 lg:w-[16.66666667%] lg:float-left text-right relative min-h-[1px] px-[15px] after:content-["_*_"] after:text-[red]'>Mật khẩu mới</label>
                                        <div className="lg:w-2/3 lg:float-left relative min-h-[1px] px-[15px]">
                                            <input type="password" className='form-input' name='newPassword'/>
                                        </div>
                                    </div>
                                    <div className="mb-[15px] clearfix">
                                        <label className='pt-2 lg:w-[16.66666667%] lg:float-left text-right relative min-h-[1px] px-[15px] after:content-["_*_"] after:text-[red]'>Xác nhận mật khẩu</label>
                                        <div className="lg:w-2/3 lg:float-left relative min-h-[1px] px-[15px]">
                                            <input type="password" className='form-input' name='confirmationPassword'/>
                                        </div>
                                    </div>
                                    <div className="mb-[15px] lg:ml-[16.66666667%] lg:w-10/12 lg:float-left relative min-h-[1px] px-[15px]">
                                        <button type='submit' className='btn btn-confirm text-white text-base' onClick={handleSubmit} disabled={isDisabled}>Đổi mật khẩu</button>
                                        <a href="javascript: history.back()" class="btn btn-warning text-base text-white ml-4">Quay lại</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        
    )
}

export default ChangePassword;