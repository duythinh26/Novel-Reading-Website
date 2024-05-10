import React, { useContext } from 'react';
import { NovelContext } from '../pages/NovelPage';
import { UserContext } from '../../App';
import { Navigate } from 'react-router-dom';

const NovelInteraction = () => {

    let { 
        novel: {
            novel_id,
            activity,
            activity: {
                total_likes
            },
            publisher: {
                personal_info: {
                    username: publisher_username
                }
            }
        },
        setNovel
    } = useContext(NovelContext);

    let { userAuth: { access_token }} = useContext(UserContext);

    return (
        <div className="flex-none">
            <div className="flex flex-wrap ml-[-15px] mr-[-15px]">
                <div className="xl:w-auto md:basis-0 md:grow md:max-w-full relative w-full px-[15px] flex-[0_0_33.33333333%] max-w-[33.33333333%]">
                    <a href={access_token === null ? '/signin' : ''} className="side-feature-button">
                        <span className="text-[#e22590] leading-[30px] !font-bold">
                            <i className="fi fi-rs-heart text-[24px]"></i>
                        </span>
                        <span className="block">{total_likes}</span>
                    </a>
                </div>
                <div className="xl:w-auto md:basis-0 md:grow md:max-w-full relative w-full px-[15px] flex-[0_0_33.33333333%] max-w-[33.33333333%]">
                    <div>
                        <a href="#" className="hover:text-green hover:outline-0 hover:no-underline">
                            <label htmlFor="open-rating" className="side-feature-button">
                                <span className="font-bold leading-[30px] text-[#f5ab00]">
                                    <i className="fi fi-rr-star text-[26px]"></i>
                                </span>
                                <span className="block">Đánh giá</span>
                            </label>
                        </a>
                    </div>
                </div>
                <div className="xl:w-auto md:basis-0 md:grow md:max-w-full relative w-full px-[15px] flex-[0_0_33.33333333%] max-w-[33.33333333%]">
                    <div className="side-feature-button">
                        <span className="block font-bold leading-[30px]">
                            <i className="fi fi-rr-list text-[24px]"></i>
                        </span>
                        <span>Mục lục</span>
                    </div>
                </div>
                <div className="xl:w-auto md:basis-0 md:grow md:max-w-full relative w-full px-[15px] flex-[0_0_33.33333333%] max-w-[33.33333333%]">
                    <a href={`/novel/${novel_id}#series-comments`} className='side-feature-button'>
                        <span className="font-bold leading-[30px] block">
                            <i className="fi fi-ss-comments text-[24px]"></i>
                        </span>
                        <span>Bình luận</span>
                    </a>
                </div>
                <div className="xl:w-auto md:basis-0 md:grow md:max-w-full relative w-full px-[15px] flex-[0_0_33.33333333%] max-w-[33.33333333%]">
                    <label htmlFor="open-sharing" className="side-feature-button">
                        <span className="font-bold leading-[30px]">
                            <i class="fi fi-ss-share text-[24px] block"></i>
                        </span>
                        <span>Chia sẻ</span>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default NovelInteraction;