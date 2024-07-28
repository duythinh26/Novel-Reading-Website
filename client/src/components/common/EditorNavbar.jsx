import React, { useContext, useState } from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { UserContext } from '../../App';

const EditorNavbar = () => {

    const { userAuth: { access_token, username }, userAuth, setUserAuth } = useContext(UserContext);

    const [ isDropdownVisible, setDropdownVisible ] = useState(false);

    const handleUserClick = () => {
        setDropdownVisible(!isDropdownVisible);
    }

    // Close the open details when click to other details or click outside
    var details = [...document.querySelectorAll('details')];
    document.addEventListener('click', function(e) {
        if (!details.some(f => f.contains(e.target))) {
            details.forEach(f => f.removeAttribute('open'));
        } else {
            details.forEach(f => !f.contains(e.target) ? f.removeAttribute('open') : '');
        }
    })

    return (
        <>
            {
                access_token ?
                <nav className="bg-white-smoke relative min-h-[46px] border mb-5 border-solid border-[#e7e7e7]">
                    <div className="mx-auto px-[15px] before:content-['_'] before:table after:clear-both">
                        {/* Logo */}
                        <ul className="menu menu-horizontal w-3/4 m-0 p-0">
                            <li>
                                {/* Use the Link tag to not reloading the page when clicked
                                Use the a tag to reloading the page when clicked */}
                                <Link to="/" className="btn btn-ghost font-bold h-nav min-h-full content-center xl:px-[14px] xl:py-[7px] lg:px-2 lg:py-0">
                                    <span>Trang chủ</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/action" className="btn btn-ghost font-bold h-nav min-h-full content-center xl:px-[14px] xl:py-[7px] lg:px-2 lg:py-0">
                                    <span>Hệ thống</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/action/series" className="btn btn-ghost font-bold h-nav min-h-full content-center xl:px-[14px] xl:py-[7px] lg:px-2 lg:py-0">
                                    <span>Thêm truyện</span>
                                </Link>
                            </li>
                            <li>
                                <details className="dropdown">
                                    <summary className="h-nav content-center font-bold xl:px-[14px] xl:py-[7px] lg:px-2 lg:py-0">
                                        Danh sách của bạn
                                    </summary>
                                    <ul className="rounded-t-none w-44 !p-0 !m-0 z-20">
                                        <li>
                                            <Link to="#" className="px-5 py-2.5">
                                                Truyện dịch
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#" className="px-5 py-2.5">
                                                Truyện convert
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#" className="px-5 py-2.5">
                                                Truyện sáng tác
                                            </Link>
                                        </li>
                                    </ul>
                                </details>
                            </li>
                            <li>
                                <Link to="/action/bought-novel" className="btn btn-ghost font-bold h-nav min-h-full content-center xl:px-[14px] xl:py-[7px] lg:px-2 lg:py-0">
                                    <span>Truyện đã mua</span>
                                </Link>
                            </li>
                            <li>
                                <details className="dropdown">
                                    <summary className="h-nav content-center font-bold xl:px-[14px] xl:py-[7px] lg:px-2 lg:py-0">
                                        Thảo luận
                                    </summary>
                                    <ul className="rounded-t-none w-48 !p-0 !m-0 z-20">
                                        <li>
                                            <Link to="#" className="px-5 py-2.5">
                                                Thêm thảo luận
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#" className="px-5 py-2.5">
                                                Thảo luận của bạn
                                            </Link>
                                        </li>
                                    </ul>
                                </details>
                            </li>
                            <li>
                                <details className="dropdown">
                                    <summary className="h-nav content-center font-bold xl:px-[14px] xl:py-[7px] lg:px-2 lg:py-0">
                                        Tiện ích
                                    </summary>
                                    <ul className="rounded-t-none w-40 !p-0 !m-0 z-20">
                                        <li>
                                            <Link to="#" className="px-5 py-2.5">
                                                Thể loại
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#" className="px-5 py-2.5">
                                                Thư viện
                                            </Link>
                                        </li>
                                    </ul>
                                </details>
                            </li>
                        </ul>
                        <ul className="md:!float-right md:mr-[-15px] md:m-0 mx-[-15px] my-[7.5px] mb-0 pl-0 list-style-none before:content-['_' before:table after:clear-both after:content-['_'] after:table">
                            <li className='md:float-left relative block'>
                                <a
                                    className='text-[#777777] md:py-[15px] py-[10px] leading-[20px] relative block px-[12px] hover:text-[#333333] hover:bg-transparent focus:text-[#333333] focus:bg-transparent mr-[15px]'
                                    role='button'
                                    aria-expanded={isDropdownVisible}
                                    onClick={handleUserClick}
                                >
                                    <i className="fi fi-ss-user"></i>
                                </a>
                                {isDropdownVisible && (
                                    <ul className="dropdown-menu md:left-auto md:right-0" role='menu'>
                                        <li>
                                            <a>{username}</a>
                                        </li>
                                        <li role='separator' className='h-px overflow-hidden bg-neutral-200 mx-0 my-[9px]'></li>
                                        <li>
                                            <a href="/action/profile">Đổi thông tin</a>
                                        </li>
                                        <li>
                                            <a href="/action/password">Đổi mật khẩu</a>
                                        </li>
                                        <li role='separator' className='h-px overflow-hidden bg-neutral-200 mx-0 my-[9px]'></li>
                                        <li>
                                            <a href="/action/email">Đổi Email</a>
                                        </li>
                                        <li>
                                            <a href="/action/username">Đổi Username</a>
                                        </li>
                                        <li role='separator' className='h-px overflow-hidden bg-neutral-200 mx-0 my-[9px]'></li>
                                    </ul>
                                )}
                            </li>
                        </ul>
                    </div>
                </nav> : ""
            }
            <Outlet />
        </>
    )
}

export default EditorNavbar