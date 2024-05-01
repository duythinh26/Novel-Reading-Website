import React, { useEffect, useState } from 'react';
import axios from "axios";
import NovelBigCard from './NovelBigCard';

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
                                        trendingNovels == null ? <></>
                                        : 
                                        trendingNovels.map((novel, i) => {
                                            return <div key={i} className="w-items text-base inline-block my-[10px] px-[10px] align-top whitespace-normal box-border mr-1">
                                                <NovelBigCard content={novel} publisher={novel.publisher}/>
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
    )
}

export default TrendingNovel