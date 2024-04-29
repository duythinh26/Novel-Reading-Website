import React, { useEffect, useState } from 'react'
import NovelArticle from './NovelArticle';
import axios from 'axios';

const RecentPublish = () => {

    let [articles, setArticle ] = useState(null);

    const fetchLatestPublish = () => {
        axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/latest-publish")
        .then(({ data }) => {
            setArticle(data.novels)
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        fetchLatestPublish();
    }, [])

    return (
        <div className="flex-[0_0_100%] relative w-full max-w-full px-[15px] md:flex-[0_0_66.66666667%] md:max-w-[66.66666667%] lg:flex-[0_0_75%] lg:max-w-[75%]">
            <section className="mb-[40px]">
                <header className="font-bold py-[1em] text-[18px] leading-[26px]">
                    <span className="inline-block text-xl leading-[22px] bg-boldblack text-white px-[8px] py-[4px]">Truyện</span>
                    <span className="inline-block text-xl leading-[22px] uppercase mx-[8px] my-0 border-b-2 border-b-boldblack border-solid">Vừa đăng</span>
                </header>
                <main className="mb-[10px]">
                    <div className="flex flex-wrap ml-[-15px] mr-[-15px]">
                        {
                            articles == null ? <></>
                            :
                            articles.map((novel, i) => {
                                return <article key={i} className="clear-left mx-0 my-[10px] list-item list-none flex-[0_0_100%] max-w-full lg:flex-[0_0_50%] lg:max-w-[50%] relative w-full px-[15px]">
                                    <NovelArticle content={novel} publisher={novel.publisher.personal_info}/>
                                </article>
                            })
                        }
                    </div>
                </main>
                <div className="clear-both">
                    <a href="#" className="border inline-block font-bold text-center normal-case transition-[0.25s] w-full px-5 py-2.5 rounded-[30px] border-solid border-[#111] hover:bg-[#111] hover:text-white">
                        Xem thêm
                    </a>
                </div>
            </section>
        </div>
    )
}

export default RecentPublish;