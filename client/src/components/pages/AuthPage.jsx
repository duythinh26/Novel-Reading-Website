import { Link } from "react-router-dom";
import InputBox from "../common/InputBox";

const AuthPage = ({ type }) => {
    return (
        <div className="container mx-auto">
            <section className="h-auto flex justify-center">
                <form action="" className="w-1/4 max-w-4xl form-border">
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
                                    <InputBox id="name" name="name" type="text" placeholder="Tên tài khoản của bạn"/> 
                                </>

                                : ""
                            }

                            <div className="label">
                                <span className="label-text text-[16px]">Địa chỉ Email</span>
                            </div>
                            <InputBox id="email" name="email" type="email" placeholder="Vui lòng nhập địa chỉ Email"/> 
                            <div className="label">
                                <span className="label-text text-[16px]">Mật khẩu</span>
                            </div>
                            <InputBox id="password" name="password" type="password" placeholder="Vui lòng nhập mật khẩu"/> 

                            {
                                type == "signup" ?
                                <>
                                    <div className="label">
                                        <span className="label-text text-[16px]">Xác nhận mật khẩu</span>
                                    </div>
                                    <InputBox id="password" name="password" type="password" placeholder="Xác nhận mật khẩu"/>  
                                </>

                                : ""
                            }
                        </label>
                        
                        <button type="submit" className="btn btn-neutral w-full text-[14px] mt-[5px] rounded-full text-white">
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