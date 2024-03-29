import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faEllipsisVertical, faHeart, faBell } from '@fortawesome/free-solid-svg-icons';
import { Link, Outlet } from "react-router-dom";
import { UserContext } from "../../App";
import UserNavigation from "./UserNavigation";

const Navbar = () => {

    const [ userNavPanel, setUserNavPanel ] = useState(false);

    const { userAuth, userAuth: { access_token, profile_img }} = useContext(UserContext);

    const handleUserNavPanel = () => {
        setUserNavPanel(currentValue => !currentValue)
    }

    const handleBlur = () => {
        setTimeout(() => {
            setUserNavPanel(false)
        }, 200)
    }
    
    // Make sub menu in "Hướng dẫn" part can close when click outside the box
    window.addEventListener('click', function(e) {
        document.querySelectorAll('.dropdown').forEach(function(dropdown) {
            if (!dropdown.contains(e.target)) {
                // Click was outside the dropdown, close it
                dropdown.open = false;
            }
        })
    })

    return (
        <>
            <div className="bg-white-smoke fixed left-0 top-0 w-full h-nav z-50">
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
    
                    {/* Navbar main block */}
                    <div className="flex w-3/4 h-nav">
                        <ul className="menu menu-horizontal flex-auto float-left m-0 p-0">
                            <li className="float-left h-nav">
                                <Link to="/sang-tac" className="btn btn-ghost font-bold h-nav min-h-full content-center xl:px-[14px] xl:py-[7px] lg:px-2 lg:py-0">
                                    <span>Sáng tác</span>
                                </Link>
                            </li>
                            <li className="float-left h-nav">
                                <Link to="/convert" className="btn btn-ghost font-bold h-nav min-h-full content-center xl:px-[14px] xl:py-[7px] lg:px-2 lg:py-0"> 
                                    <span>Dịch máy</span>
                                </Link>
                            </li>
                            <li className="float-left h-nav">
                                <Link to="/them-truyen" className="btn btn-ghost font-bold h-nav min-h-full content-center xl:px-[14px] xl:py-[7px] lg:px-2 lg:py-0">
                                    <span>Thêm truyện</span>
                                </Link>
                            </li>
                            <li className="float-left h-nav">
                                <Link to="/danh-sach" className="btn btn-ghost font-bold h-nav min-h-full content-center xl:px-[14px] xl:py-[7px] lg:px-2 lg:py-0">
                                    <span>Danh sách</span>
                                </Link>
                            </li>
                            <li className="float-left h-nav">
                                <Link to="/thao-luan" className="btn btn-ghost font-bold h-nav min-h-full content-center xl:px-[14px] xl:py-[7px] lg:px-2 lg:py-0">
                                    <span>Thảo luận</span>
                                </Link>
                            </li>
                            <li className="h-nav">
                                <details className="dropdown">
                                    <summary className="h-nav content-center font-bold xl:px-[14px] xl:py-[7px] lg:px-2 lg:py-0">
                                        Hướng dẫn
                                    </summary>
                                    {/* Use ! before the classname to set important for that classname */}
                                    <ul className="rounded-t-none w-40 !p-0 !m-0">
                                        <li className="h-nav">
                                            <Link to="/dang-truyen" className="font-bold h-nav content-center w-40">
                                                Đăng truyện
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/gop-y" className="font-bold h-nav content-center w-40">
                                                Góp ý - Báo lỗi
                                            </Link>
                                        </li>
                                    </ul>
                                </details>
                            </li>
                        </ul>
                        <div className="block float-right relative w-64">
                            <form action="/tim-kiem" method="get">
                                <input 
                                    className="input input-bordered input-primary border-gainsboro placeholder:text-dark-grey pr-10 pl-5 h-search rounded-full mr-2.5" 
                                    type="text" 
                                    placeholder="Tối thiểu 2 ký tự" name="keywords"/>
                                <button className="absolute right-6 top-0 leading-icon" type="submit" value={"Tìm kiếm"}>
                                    <FontAwesomeIcon icon={faMagnifyingGlass} className="font-black"/>
                                </button>
                            </form>
                        </div>
                        {
                            access_token ? 
                            <>
                                {/* User block */}
                                <div className="float-right h-nav w-user">
                                    <div className="h-nav cursor-pointer float-left">
                                        <Link to="/ke-sach">
                                            <button className="btn btn-circle btn-sm w-icon h-icon m-2 border-0">
                                                <FontAwesomeIcon icon={faHeart} />
                                            </button>
                                        </Link>
                                    </div>
                                    <div className="h-nav cursor-pointer float-left">
                                        <Link to="">
                                            <button className="btn btn-circle btn-sm w-icon h-icon m-2">
                                                <FontAwesomeIcon icon={faBell} />
                                            </button>
                                        </Link>
                                    </div>
                                    <div className="avatar h-nav" onClick={handleUserNavPanel} onBlur={handleBlur}>
                                        <button className="btn btn-circle btn-sm border-4 m-2 overflow-hidden w-icon h-icon" >
                                            <img src={profile_img} alt="Ảnh đại diện" className="w-full h-full object-cover rounded-full" />
                                        </button>
                                        {
                                            userNavPanel ? <UserNavigation /> : ""
                                        }
                                    </div>
                                </div>
                            </> 
                            : 
                            <>
                                {/* Login block */}
                                <div className="float-right">
                                    <ul className="menu menu-horizontal flex-auto m-0 p-0">
                                        <li>
                                            <div className="btn btn-ghost float-right h-nav border-none px-20px py-10px content-center">
                                                <div className="inline-block">
                                                    <FontAwesomeIcon icon={faEllipsisVertical} className="fa-xl"/>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <Link to="/signin" 
                                            className="btn btn-ghost font-bold h-nav content-center text-base float-right ">
                                                <span>Đăng nhập</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </>
                            
                        }
                    </div>

                    
                </div>
            </div>

            {/* Using Outlet to render component in element attribute when using nested routes (see more in App.jsx) 
                Outlet helps render child element in nested route 
            */}
            <Outlet />
        </>
        
    )
}

export default Navbar