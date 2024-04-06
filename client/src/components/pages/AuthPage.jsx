import React, { useContext, useRef } from "react";
import { Link, Navigate } from "react-router-dom";
import InputBox from "../common/InputBox";
import { Toaster, toast } from "react-hot-toast"; // Using for create a pop up alert
import axios from "axios";
import { storeInSession } from "../common/Session";
import { UserContext } from "../../App";

const AuthPage = ({ type }) => {
    const authForm = useRef()
    
    // Get context created
    let { userAuth: { access_token }, setUserAuth } = useContext(UserContext)

    const userAuthToServer = (serverRoute, formData) => {

        axios.post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, formData)
        .then(({ data }) => {
            storeInSession("user", JSON.stringify(data)) // stringify convert object into string
            
            setUserAuth(data)

            type == "signin" ? toast.success("Đăng nhập thành công!") : toast.success("Đăng ký thành công!")
        })
        .catch(({ response }) => {
            toast.error(response.data.error)
        })
    }

    // The e allow access to mouse/event information
    const handleSubmit = (e) => {
        // If not preventDefault, we can't validate data from user
        e.preventDefault()

        let route = type == "signin" ? "/signin" : "/signup"

        // Access the form
        let form = new FormData(authForm.current)
        let formData = {}
        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
        let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/; 
        
        for (let [key, value] of form.entries()) { // form.entries() allow access to input in the form
            formData[key] = value // key is the name attribute of the input
        }

        // Form validation
        let { username, email, password } = formData

        // Only check when username exists
        if (username) {
            if (username.length < 3) {
                return toast.error("Tên tài khoản phải có ít nhất 3 ký tự")
            }
        }

        // Check user input email or not
        if (!email.length) {
            return toast.error("Bạn chưa nhập email")
        }

        if (!emailRegex.test(email)) {
            return toast.error("Email không hợp lệ")
        }
        
        if (!password.length) {
            return toast.error("Bạn chưa nhập mật khẩu" )
        }

        if (!passwordRegex.test(password)) {
            return toast.error("Mật khẩu phải từ 8 đến 20 ký tự và có ít nhất một chữ viết hoa và một chữ số")
        }

        // Send data to server
        userAuthToServer(route, formData)
    }
    
    return (
        access_token ? <Navigate to="/"/>
        :
        <div className="container mx-auto">
            <section className="h-auto flex justify-center">
                <Toaster/>
                <form ref={authForm} className="w-1/4 max-w-4xl form-border">
                    <div className="text-3xl font-gelasio text-center border-b-[#dddddd] border-b border-solid bg-neutral-100 px-[15px] py-[10px]">
                        {type == "signin" ? "Đăng nhập" : "Đăng ký"}
                    </div>
                    <div className="p-[15px]">
                        <label className="form-control w-full">
                            {
                                type == "signup" ?
                                <>
                                    <div className="label">
                                        <span className="label-text text-[16px]">Tên tài khoản</span>
                                    </div>
                                    <InputBox 
                                        id="name" 
                                        name="username" 
                                        type="text" 
                                        placeholder="Tên tài khoản của bạn"
                                        classname="input input-info w-full h-input border border-solid border-silver"/> 
                                </>

                                : ""
                            }

                            <div className="label">
                                <span className="label-text text-[16px]">Địa chỉ Email</span>
                            </div>
                            <InputBox 
                                id="email" 
                                name="email" 
                                type="email" 
                                placeholder="Vui lòng nhập địa chỉ Email" 
                                classname="input input-info w-full h-input border border-solid border-silver"/> 
                            <div className="label">
                                <span className="label-text text-[16px]">Mật khẩu</span>
                            </div>
                            <InputBox 
                                id="password" 
                                name="password" 
                                type="password" 
                                placeholder="Vui lòng nhập mật khẩu" 
                                classname="input input-info w-full h-input border border-solid border-silver"/> 

                            {
                                type == "signup" ?
                                <>
                                    <div className="label">
                                        <span className="label-text text-[16px]">Xác nhận mật khẩu</span>
                                    </div>
                                    <InputBox 
                                        id="password_confirm" 
                                        name="password_confirm" 
                                        type="password" 
                                        placeholder="Xác nhận mật khẩu"
                                        classname="input input-info w-full h-input border border-solid border-silver"/>  
                                </>

                                : ""
                            }
                        </label>
                        
                        <button 
                            className="btn btn-neutral w-full text-[14px] mt-[5px] rounded-full text-white"
                            type="submit" onClick={handleSubmit}
                            >
                            {type == "signin" ? "Đăng nhập" : "Đăng ký"}
                        </button>
                        {
                            type == "signin" ?
                            <>
                                <p className="mt-6 text-dark-grey text-base text-center">
                                    Chưa có tài khoản?
                                    <Link to="/signup" className="underline text-black text-base ml-1">
                                        Đăng ký tại đây
                                    </Link>
                                </p>

                                <div className="relative w-full flex items-center gap-2 my-8 opacity-20 uppercase text-black font-bold">
                                    <hr className="w-1/2 border-black"/>
                                    <p>or</p>
                                    <hr className="w-1/2 border-black"/>
                                </div>
                                <button className="btn text-white bg-facebook hover:bg-[#286090] border-[#2e6da4] hover:border-[#204d74] text-[14px] w-full rounded-full mb-[15px]">
                                    Tiếp tục với Facebook
                                </button>
                                <button className="btn text-white bg-google hover:bg-[#c9302c] border-[#d43f3a] hover:border-[#ac2925] text-[14px] w-full rounded-full">
                                    Tiếp tục với Google
                                </button>
                            </>
                            : 
                            <p className="mt-6 text-dark-grey text-base text-center">
                                Đã có tài khoản ?
                                <Link to="/signin" className="underline text-black text-base ml-1">
                                    Đăng nhập tại đây
                                </Link>
                            </p>
                        }
                    </div>
                </form>
            </section>
        </div>
        
    )
}

export default AuthPage;    