import React, { useContext, useEffect } from 'react';
import { NovelContext } from '../pages/NovelPage';
import { UserContext } from '../../App';
import { Toaster, toast } from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const NovelInteraction = () => {

    let {
        novel, 
        novel: {
            _id,
            novel_title,
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
        setNovel,
        isLikedByUser,
        setLikedByUSer
    } = useContext(NovelContext);

    let { userAuth: { access_token }, setUserAuth } = useContext(UserContext);

    // Check novel is like by user or not, prevent multiple like
    useEffect(() => {
        if (access_token) {
            // Make request to server to get like information
            axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/isliked-by-user", { _id }, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            })
            .then(({ data: { result } }) => {
                console.log("Result:", result);
                setLikedByUSer(Boolean(result))
                console.log("like or not?", isLikedByUser);
                console.log("End\n")
            })
            .catch(err => {
                console.log(err)
            })
        }
    }, [])

    const handleLike = () => {
        if (access_token) {
            setLikedByUSer(preVal => !preVal)

            !isLikedByUser ? total_likes++ : total_likes--;

            setNovel({ ...novel, activity: { ...activity, total_likes }})

            axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/like-novel", { _id, isLikedByUser }, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            })
            .then(({ data }) => {
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            })
        } else {
            toast.error("Cần đăng nhập để thực hiện");
        }
    }

    return (
        <>
            <Toaster />
            <div className="flex-none">
                <div className="flex flex-wrap ml-[-15px] mr-[-15px]">
                    <div className="flex items-start justify-center xl:w-auto md:basis-0 md:grow md:max-w-full relative w-full px-[15px] flex-[0_0_33.33333333%] max-w-[33.33333333%]">
                        <button href={access_token === null ? '/signin' : ''} className="side-feature-button" onClick={handleLike}>
                            <span className="text-[#e22590] leading-[30px] !font-bold">
                                {
                                    isLikedByUser 
                                    ? <i className="fi fi-ss-heart text-[24px]"></i> 
                                    : <i className="fi fi-rs-heart text-[24px]"></i>
                                }
                            </span>
                            <span className="block">{total_likes}</span>
                        </button>
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
                                <i className="fi fi-ss-share text-[24px] block"></i>
                            </span>
                            <span>Chia sẻ</span>
                        </label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NovelInteraction;