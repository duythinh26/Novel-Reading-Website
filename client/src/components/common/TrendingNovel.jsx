import React, { useEffect, useState } from 'react';
import axios from "axios";
import NovelCard from '../common/NovelCard';

const TrendingNovel = () => {

    let [ trendingNovels, setTrendingNovel ] = useState(null);

    const fetchTrendingNovels = () => {
        axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/trending")
        .then(({ data }) => {
            setTrendingNovel(data.novels)
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        fetchTrendingNovels();
    }, [])

    return (
        <div className="container w-full mx-auto px-[15px] mb-[40px]">
            <div className="flex flex-wrap mx-[-15px]">
                <div className="flex-[0_0_100%] max-w-full lg:flex-[0_0_75%] lg:max-w-[75%] px-[15px] relative w-full">
                    <div>
                        <header className="px-0 py-2">
                            <span className="bg-[#191a1acc] text-white inline-block px-2 py-1 text-xl leading-6 font-bold mr-5 border-b-2 border-b-transparent border-solid">Nổi bật</span>
                            <span className="leading-6 font-bold mr-5 border-b-2 border-b-transparent border-solid text-[#aaa]">
                                <a href="#" className="hover:text-green hover:outline-0 hover:no-underline text-xl">Top tháng</a>
                            </span>
                            <span className="leading-6 font-bold mr-5 border-b-2 border-b-transparent border-solid text-[#aaa]">
                                <a href="#" className="hover:text-green hover:outline-0 hover:no-underline text-xl">Toàn thời gian</a>
                            </span>
                        </header>
                        <div className="!p-0">
                            <div className="overflow-hidden">
                                <div className="m-0">
                                    <main className="transform3d top-view duration-300">
                                        <>
                                            {
                                                trendingNovels == null ? <h1>Waiting</h1>
                                                : 
                                                trendingNovels.map((novel, i) => {
                                                    return <div key={i} className="w-items text-base inline-block my-[10px] px-[10px] align-top whitespace-normal box-border mr-1">
                                                        {
                                                            console.log(novel.novel_title)
                                                        }
                                                        <NovelCard content={novel} publisher={novel.publisher.personal_info}/>
                                                    </div>
                                                })
                                            }
                                        </>
                                    </main>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-[0_0_100%] max-w-full lg:flex-[0_0_25%] lg:max-w-[25%] px-[15px] relative w-full">
                    <section className="mb-[40px]">
                        <header className="font-bold py-[1em]">
                            <a href="#">
                                <span className="inline-block bg-[#191a1acc] text-white text-xl leading-[1.375rem] px-2 py-1">Thảo luận</span>
                            </a>
                        </header>
                        <main>
                            <div className="mb-2.5 pl-5 pr-2.5 py-0">
                                <div className="flex flex-wrap mx-[-15px]">
                                    <div className="truncate flex-[0_0_75%] max-w-[75%] relative w-full px-[15px]">
                                        <a 
                                            href="#" 
                                            title="Hỏi Truyện từ A đến Z. Góc 8 nhảm cho dịch giả 2.0"
                                        >
                                            Hỏi Truyện từ A đến Z. Góc 8 nhảm cho dịch giả 2.0
                                        </a>
                                    </div>
                                    <div className="flex-[0_0_25%] max-w-[25%] text-lightblack p-0 truncate text-right relative w-full">
                                        <time title="10-04-2024 07:45:04" dateTime="2024-04-10T07:45:04+07:00">
                                            41 phút
                                        </time>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-2.5 pl-5 pr-2.5 py-0">
                                <div className="flex flex-wrap mx-[-15px]">
                                    <div className="truncate flex-[0_0_75%] max-w-[75%] relative w-full px-[15px]">
                                        <a 
                                            href="#" 
                                            title="Hỏi Truyện từ A đến Z. Góc 8 nhảm cho dịch giả 2.0"
                                        >
                                            Hỏi Truyện từ A đến Z. Góc 8 nhảm cho dịch giả 2.0
                                        </a>
                                    </div>
                                    <div className="flex-[0_0_25%] max-w-[25%] text-lightblack p-0 truncate text-right relative w-full">
                                        <time title="10-04-2024 07:45:04" dateTime="2024-04-10T07:45:04+07:00">
                                            41 phút
                                        </time>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-2.5 pl-5 pr-2.5 py-0">
                                <div className="flex flex-wrap mx-[-15px]">
                                    <div className="truncate flex-[0_0_75%] max-w-[75%] relative w-full px-[15px]">
                                        <a 
                                            href="#" 
                                            title="Hỏi Truyện từ A đến Z. Góc 8 nhảm cho dịch giả 2.0"
                                        >
                                            Hỏi Truyện từ A đến Z. Góc 8 nhảm cho dịch giả 2.0
                                        </a>
                                    </div>
                                    <div className="flex-[0_0_25%] max-w-[25%] text-lightblack p-0 truncate text-right relative w-full">
                                        <time title="10-04-2024 07:45:04" dateTime="2024-04-10T07:45:04+07:00">
                                            41 phút
                                        </time>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-2.5 pl-5 pr-2.5 py-0">
                                <div className="flex flex-wrap mx-[-15px]">
                                    <div className="truncate flex-[0_0_75%] max-w-[75%] relative w-full px-[15px]">
                                        <a 
                                            href="#" 
                                            title="Hỏi Truyện từ A đến Z. Góc 8 nhảm cho dịch giả 2.0"
                                        >
                                            Hỏi Truyện từ A đến Z. Góc 8 nhảm cho dịch giả 2.0
                                        </a>
                                    </div>
                                    <div className="flex-[0_0_25%] max-w-[25%] text-lightblack p-0 truncate text-right relative w-full">
                                        <time title="10-04-2024 07:45:04" dateTime="2024-04-10T07:45:04+07:00">
                                            41 phút
                                        </time>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-2.5 pl-5 pr-2.5 py-0">
                                <div className="flex flex-wrap mx-[-15px]">
                                    <div className="truncate flex-[0_0_75%] max-w-[75%] relative w-full px-[15px]">
                                        <a 
                                            href="#" 
                                            title="Hỏi Truyện từ A đến Z. Góc 8 nhảm cho dịch giả 2.0"
                                        >
                                            Hỏi Truyện từ A đến Z. Góc 8 nhảm cho dịch giả 2.0
                                        </a>
                                    </div>
                                    <div className="flex-[0_0_25%] max-w-[25%] text-lightblack p-0 truncate text-right relative w-full">
                                        <time title="10-04-2024 07:45:04" dateTime="2024-04-10T07:45:04+07:00">
                                            41 phút
                                        </time>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-2.5 pl-5 pr-2.5 py-0">
                                <div className="flex flex-wrap mx-[-15px]">
                                    <div className="truncate flex-[0_0_75%] max-w-[75%] relative w-full px-[15px]">
                                        <a 
                                            href="#" 
                                            title="Hỏi Truyện từ A đến Z. Góc 8 nhảm cho dịch giả 2.0"
                                        >
                                            Hỏi Truyện từ A đến Z. Góc 8 nhảm cho dịch giả 2.0
                                        </a>
                                    </div>
                                    <div className="flex-[0_0_25%] max-w-[25%] text-lightblack p-0 truncate text-right relative w-full">
                                        <time title="10-04-2024 07:45:04" dateTime="2024-04-10T07:45:04+07:00">
                                            41 phút
                                        </time>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-2.5 pl-5 pr-2.5 py-0">
                                <div className="flex flex-wrap mx-[-15px]">
                                    <div className="truncate flex-[0_0_75%] max-w-[75%] relative w-full px-[15px]">
                                        <a 
                                            href="#" 
                                            title="Hỏi Truyện từ A đến Z. Góc 8 nhảm cho dịch giả 2.0"
                                        >
                                            Hỏi Truyện từ A đến Z. Góc 8 nhảm cho dịch giả 2.0
                                        </a>
                                    </div>
                                    <div className="flex-[0_0_25%] max-w-[25%] text-lightblack p-0 truncate text-right relative w-full">
                                        <time title="10-04-2024 07:45:04" dateTime="2024-04-10T07:45:04+07:00">
                                            41 phút
                                        </time>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-2.5 pl-5 pr-2.5 py-0">
                                <div className="flex flex-wrap mx-[-15px]">
                                    <div className="truncate flex-[0_0_75%] max-w-[75%] relative w-full px-[15px]">
                                        <a 
                                            href="#" 
                                            title="Hỏi Truyện từ A đến Z. Góc 8 nhảm cho dịch giả 2.0"
                                        >
                                            Hỏi Truyện từ A đến Z. Góc 8 nhảm cho dịch giả 2.0
                                        </a>
                                    </div>
                                    <div className="flex-[0_0_25%] max-w-[25%] text-lightblack p-0 truncate text-right relative w-full">
                                        <time title="10-04-2024 07:45:04" dateTime="2024-04-10T07:45:04+07:00">
                                            41 phút
                                        </time>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-2.5 pl-5 pr-2.5 py-0">
                                <div className="flex flex-wrap mx-[-15px]">
                                    <div className="truncate flex-[0_0_75%] max-w-[75%] relative w-full px-[15px]">
                                        <a 
                                            href="#" 
                                            title="Hỏi Truyện từ A đến Z. Góc 8 nhảm cho dịch giả 2.0"
                                        >
                                            Hỏi Truyện từ A đến Z. Góc 8 nhảm cho dịch giả 2.0
                                        </a>
                                    </div>
                                    <div className="flex-[0_0_25%] max-w-[25%] text-lightblack p-0 truncate text-right relative w-full">
                                        <time title="10-04-2024 07:45:04" dateTime="2024-04-10T07:45:04+07:00">
                                            41 phút
                                        </time>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </section>
                
                    {/* Truyện vừa đọc cho 1024px đổ xuống */}
                    <div className="mt-[20px] lg:hidden"></div>
                </div>
            </div>
        </div>
    )
}

export default TrendingNovel