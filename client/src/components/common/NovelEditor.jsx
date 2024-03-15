import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import InputBox from "../common/InputBox";
import { uploadImage } from './aws.jsx';
import { Toaster, toast } from "react-hot-toast";
import Select from 'react-select';
import novelTypeOptions from './novelTypeOptions';

const NovelEditor = () => {

    var novelCoverRef = useRef(); 

    const handleBannerUpload = (e) => {
        let img = e.target.files[0];

        if (img) {
            let loadingToast = toast.loading("Bạn chờ tí nhé ...")

            uploadImage(img)
            .then((url) => {
                if (url) {
                    toast.dismiss(loadingToast);
                    toast.success("Đã đăng ảnh thành công!");

                    novelCoverRef.current.src = url;
                    novelCoverRef.current.className = "block max-w-[100px] max-h-[100px] w-auto h-auto z-20";
                }
            })
            .catch(err => {
                toast.dismiss(loadingToast);
                return toast.error(err);
            })
        }
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
                            <details className="dropdown">
                                <summary className="h-nav content-center font-bold xl:px-[14px] xl:py-[7px] lg:px-2 lg:py-0">
                                    Truyện dịch
                                </summary>
                                <ul className="rounded-t-none w-44 !p-0 !m-0 z-20">
                                    <li>
                                        <Link to="#" className="px-5 py-2.5">
                                            Truyện đã đăng
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/truyen-da-dang" className="px-5 py-2.5">
                                            Truyện tham gia
                                        </Link>
                                    </li>
                                </ul>
                            </details>
                        </li>
                        <li>
                            <details className="dropdown">
                                <summary className="h-nav content-center font-bold xl:px-[14px] xl:py-[7px] lg:px-2 lg:py-0">
                                    Convert
                                </summary>
                                <ul className="rounded-t-none w-44 !p-0 !m-0 z-20">
                                    <li>
                                        <Link to="#" className="px-5 py-2.5">
                                            Convert đã đăng
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/truyen-da-dang" className="px-5 py-2.5">
                                            Convert tham gia
                                        </Link>
                                    </li>
                                </ul>
                            </details>
                        </li>
                        <li>
                            <details className="dropdown">
                                <summary className="h-nav content-center font-bold xl:px-[14px] xl:py-[7px] lg:px-2 lg:py-0">
                                    Sáng tác
                                </summary>
                                <ul className="rounded-t-none w-44 !p-0 !m-0 z-20">
                                    <li>
                                        <Link to="#" className="px-5 py-2.5">
                                            OLN đã đăng
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/truyen-da-dang" className="px-5 py-2.5">
                                            OLN tham gia
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
                                        <Link to="/truyen-da-dang" className="px-5 py-2.5">
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
                                        <Link to="/truyen-da-dang" className="px-5 py-2.5">
                                            Thư viện
                                        </Link>
                                    </li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>
            </nav>
            <Toaster />
            <div className="container mx-auto px-[15px]">
                <div className="mx-[-15px]">
                    <div className="lg:mx-[10%] lg:w-5/6 lg:float-left relative min-h-[1px] px-[15px]">
                        <div className="bg-white border rounded mb-5 border-solid border-gainsboro">
                            <div className="text-gray bg-neutral-100 border-gainsboro px-4 py-2.5 rounded-t border-b-gainsboro border-b border-solid">Editor</div>
                            <div className="p-4">
                                <form>
                                    {/* If an element is taller than the element containing it, and it is floated, it will overflow outside of its container.
                                    Using clearfix "hack" to fix this problem */}
                                    <div className="mb-[15px] clearfix">
                                        <label className='relative px-4 pt-2 text-right lg:w-1/6 lg:float-left after:content-["_*_"] after:text-red'>Tiêu đề</label>
                                        <div className="float-left lg:w-2/3 px-4">
                                            <InputBox 
                                                type="text"
                                                name="title"
                                                classname="input input-info w-full h-input border border-solid border-silver" 
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-[15px] clearfix">
                                        <label className='relative px-4 pt-2 text-right lg:w-1/6 lg:float-left'>Tên khác</label>
                                        <div className="float-left lg:w-2/3 px-4">
                                            <InputBox 
                                                type="text"
                                                name="altname"
                                                classname="input input-info w-full h-input border border-solid border-silver" 
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-[15px] clearfix">
                                        <label className='relative px-4 pt-2 text-right lg:w-1/6 lg:float-left'>Ảnh bìa</label>
                                        <div className="lg:float-left lg:w-2/3 px-4">
                                            <div className="w-full h-full clearfix">
                                                <div className="mb-[15px] uppercase font-bold">
                                                    <label htmlFor="uploadBanner">
                                                        <a className="inline-block px-8 py-3.5 text-white bg-seaweed cursor-pointer">Chọn ảnh</a>
                                                        <input
                                                            id="uploadBanner" 
                                                            type="file"
                                                            accept=".png, .jpg, .jpeg"
                                                            className="hidden"
                                                            onChange={handleBannerUpload}
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                            <img ref={novelCoverRef} src={""} className='hidden'/>
                                        </div>
                                    </div>
                                    <div className="mb-[15px] clearfix">
                                        <label className='relative px-4 pt-2 text-right lg:w-1/6 lg:float-left after:content-["_*_"] after:text-red'>Tác giả</label>
                                        <div className="float-left lg:w-2/3 px-4">
                                            <InputBox 
                                                type="text"
                                                name="author"
                                                classname="input input-info w-full h-input border border-solid border-silver" 
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-[15px] clearfix">
                                        <label className='relative px-4 pt-2 text-right lg:w-1/6 lg:float-left'>Họa sĩ</label>
                                        <div className="float-left lg:w-2/3 px-4">
                                            <InputBox 
                                                type="text"
                                                name="illustrator"
                                                classname="input input-info w-full h-input border border-solid border-silver" />
                                        </div>
                                    </div>
                                    <div className="mb-[15px] clearfix">
                                        <label className='relative px-4 pt-2 text-right lg:w-1/6 lg:float-left after:content-["_*_"] after:text-red'>Loại truyện</label>
                                        <div className="float-left lg:w-2/3 px-4">
                                            <select name="type" id="select-type" className='select select-bordered w-44 text-base px-[10px] py-[5px] leading-normal border-black focus:outline-none focus:border-black'>
                                                <option value="1" selected>Truyện dịch</option>
                                                <option value="2">Truyện convert</option>
                                                <option value="3">Truyện sáng tác</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mb-[15px] clearfix">
                                        <label className='relative px-4 pt-2 text-right lg:w-1/6 lg:float-left after:content-["_*_"] after:text-red'>Thể loại</label>
                                        <div className="lg:float-left lg:w-2/3 px-4">
                                            <Select
                                                isMulti
                                                options={novelTypeOptions}
                                                placeholder=""
                                                className='border border-solid rounded-md border-silver'
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-[15px] clearfix">
                                        <label className='relative px-4 pt-2 text-right lg:w-1/6 lg:float-left after:content-["_*_"] after:text-red'>Tóm tắt</label>
                                        <div className="float-left lg:w-2/3 px-4">
                                            
                                        </div>
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

export default NovelEditor