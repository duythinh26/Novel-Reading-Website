import React, { useEffect, useState } from 'react';
import NovelSmallCard from './NovelSmallCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const LatestOriginal = () => {

    let [ originalNovels, setOriginalNovel ] = useState(null);

    const fetchOriginalNovels = () => {
        axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/latest-original")
        .then(({ data }) => {
            setOriginalNovel(data.novels)
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        fetchOriginalNovels();
    }, [])

    return (
        <section className="block relative mb-[40px]">
            <header className="font-bold py-[1em]">
                <span className="inline-block text-xl leading-[22px] bg-[rgba(26,26,26,0.8)] text-white px-[8px] py-[4px]">Sáng tác</span>
                <span className="inline-block text-xl leading-[22px] uppercase mx-[8px] my-0 border-b-2 border-b-boldblack border-solid">Mới nhất</span>
            </header>
            <main className="flex flex-wrap mx-[-15px]">
                {
                    originalNovels == null ? <></>
                    :
                    originalNovels.map((novel, i) => {
                        return <NovelSmallCard novel={novel} publisher={novel.publisher.personal_info}/>
                    })
                }
                <div className="relative w-full px-[15px] my-[10px] flex-[0_0_33.33333333%] max-w-[33.33333333%] lg:flex-[0_0_16.66666667%] lg:max-w-[16.66666667%]">
                    <div className="text-white relative">
                        <div className="w-full relative overflow-hidden before:content-[''] before:block before:w-full before:pt-[143.3333333333%]">
                            <div className="absolute inset-0"></div>
                        </div>
                        <a href="#" className="font-bold border-2 hover:text-green hover:outline-0 hover:no-underline">
                            <div className="bg-[rgba(0,0,0,0.5)] absolute p-[10px] inset-0">
                                <div className="border h-full relative w-full border-solid border-[#eee]">
                                    <div className="absolute text-center -translate-y-2/4 w-full top-2/4">
                                        <div className="text-[2.5rem]">
                                            <FontAwesomeIcon icon={faCircleArrowRight} className="font-black text-4xl"/>
                                        </div>
                                        <div>Xem thêm</div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </main>
        </section>
    )
}

export default LatestOriginal;