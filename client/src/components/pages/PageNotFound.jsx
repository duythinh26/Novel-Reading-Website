import React from 'react';
import { Link } from "react-router-dom";
import pageNotFoundImage from "../../assets/images/404.png"

const PageNotFound = () => {
    return (
        <section className="h-cover relative p-10 flex flex-col items-center gap-20 text-center">
            <img src={pageNotFoundImage} className="select-none w-72 aspect-square object-cover rounded" />
            <h1 className="text-4xl font-gelasio leading-7">Không tìm thấy trang</h1>
            <p className="text-dark-grey text-xl leading-7 -mt-8">Trang bạn cần tìm không khả dụng. Trở về <Link to="/" className="text-black underline">trang chủ tại đây</Link></p>
        </section>
    )
}

export default PageNotFound;