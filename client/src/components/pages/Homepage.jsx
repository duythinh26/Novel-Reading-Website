import React, { useEffect, useState } from 'react';
import TrendingNovel from '../common/TrendingNovel';
import Discussion from '../common/Discussion';
import LatestOriginal from '../common/LatestOriginal';
import LatestChapter from '../common/LatestChapter';
import RecentPublish from '../common/RecentPublish';

const Homepage = () => {
    return (
        <main className="w-full pt-nav pb-0">
            <div className="container w-full mx-auto px-[15px] mb-[40px]">
                <div className="flex flex-wrap mx-[-15px]">
                    <TrendingNovel />
                    <Discussion />
                </div>
            </div>
            <div className="text-center mt-0 mb-[10px] mx-auto"></div>
            <div className="container w-full mx-auto px-[15px] mb-[40px]">
                <div className="flex flex-wrap mx-[-15px]">
                    <div className="flex-[0_0_100%] lg:flex-[0_0_75%] max-w-full lg:max-w-[75%] relative w-full px-[15px]">
                        <LatestOriginal />
                        <LatestChapter />
                    </div>
                </div>
            </div>
            <div className="text-center mt-0 mb-[10px] mx-auto"></div>
            <div className="bg-lightgrey py-10 border-y-[#e3e5e8] border-b border-solid border-t">
                <div className="container w-full mx-auto px-[15px]">
                    <div className="flex flex-wrap ml-[-15px] mr-[-15px]">
                        <RecentPublish />
                    </div>
                </div>
            </div>
            <div className="container w-full mx-auto px-[15px] pt-[40px]">
                <section className="mb-[40px]">
                    <header className="font-bold py-[1em] text-xl leading-[26px]">
                        <span className="inline-block text-xl leading-[22px] bg-boldblack text-white px-[8px] py-[4px]">Truyện</span>
                        <span className="inline-block text-xl leading-[22px] uppercase mx-[8px] my-0 border-b-2 border-b-boldblack border-solid ">Đã hoàn thành</span>
                    </header>
                    <div className="!p-0">
                        <div className="overflow-hidden">
                            <div className="m-0">
                                
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main> 
    )
}

export default Homepage