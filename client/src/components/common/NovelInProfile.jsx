import React from 'react';
import TimeDifference from './TimeDifference';

const NovelInProfile = (novel) => {
    
    return (
        <div className="mb-[20px] bg-profile showcase-item">
            <div className="flex flex-wrap ml-[-15px] mr-[-15px]">
                <div className="relative w-full px-[15px] flex-[0_0_33.33333333%] max-w-[33.33333333%]">
                    <div className="a6-ratio">
                        <div className="absolute inset-0 cover-background" style={{'backgroundImage': `url(${novel.novel.novel_banner})`}}></div>
                    </div>
                </div>
                <div className="relative w-full px-[15px] flex-[0_0_66.66666667%] max-w-[66.66666667%]">
                    <div className="pl-0 pr-[10px] py-[10px]">
                        <div className="mb-[4px]">
                            <small className={`text-white leading-[16px] px-[10px] py-0 rounded-sm ${
                            novel.novel.type_of_novel === "Truyện dịch" ? "bg-[#36a189]" :
                            novel.novel.type_of_novel === "Truyện sáng tác" ? "bg-[#1d7eaf]" :
                            novel.novel.type_of_novel === "Truyện convert" ? "bg-[#dc8118]" : ""
                            }`}>{novel.novel.type_of_novel}</small>
                        </div>
                        <h5 className="max-h-[4.8rem] overflow-hidden font-bold leading-[1.5rem]">
                            <a 
                                href={`/novel/${novel.novel.novel_id}`}
                                className="text-[16px] hover:text-green hover:outline-0 hover:no-underline"
                            >
                                {novel.novel.novel_title}
                            </a>
                        </h5>
                    </div>
                    <div className="text-[12px] leading-[18px] absolute bottom-[10px]">
                        <div>
                            <span className="font-bold mr-[4px] text-[12px]">Tình trạng: </span>
                            <span className="text-[12px]">{novel.novel.status}</span>
                        </div>
                        <div>
                            <span className="font-bold mr-[4px] text-[12px]">Lần cuối: </span>
                            <span>
                                <TimeDifference valueDateTime={novel.novel.publishedAt} className="text-[12px]"/>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NovelInProfile;