import React from "react"
import { Link } from "react-router-dom"

const AuthNavbar = () => {

    return (
        <div className="bg-white-smoke left-0 top-0 w-full h-nav z-50 mb-5">
            <div className="navbar h-nav min-h-full justify-center">

                {/* Logo */}
                <div className="float-left">
                    {/* Use the Link tag to not reloading the page when clicked
                        Use the a tag to reloading the page when clicked */}
                    <Link to="/" 
                        className="bg-teal-green bg bg-no-repeat w-logo h-logo rounded float-left"
                        title="Trang chủ" 
                        >
                    </Link>
                </div>
 
                {/* Main block */}
                <div className="flex w-3/4 flex-row-reverse">
                    {/* Login block */}
                    <div className="float-right">
                        <ul className="menu menu-horizontal flex-auto m-0 p-0">
                            <li>
                                <Link to="/signin" 
                                className="btn btn-ghost font-bold h-nav content-center text-base float-right ">
                                    <span>Đăng nhập</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/signup" 
                                className="btn btn-ghost font-bold h-nav content-center text-base float-right ">
                                    <span>Đăng ký</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthNavbar