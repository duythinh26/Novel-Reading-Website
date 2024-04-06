import React from 'react'
import { Link } from 'react-router-dom'

const EditorNavbar = () => {

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
            <nav className="bg-white-smoke relative min-h-[46px] border mb-5 border-solid border-[#e7e7e7]">
                <div className="mx-auto px-[15px]">
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
                            <Link to="/manage/series" className="btn btn-ghost font-bold h-nav min-h-full content-center xl:px-[14px] xl:py-[7px] lg:px-2 lg:py-0">
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
                </div>
            </nav>
        </>
    )
}

export default EditorNavbar