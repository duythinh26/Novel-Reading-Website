import React, { createContext, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import TimeDifference from '../common/TimeDifference';
import { novelStructure } from '../common/novelStructure';
import NovelInteraction from '../common/NovelInteraction';
import { UserContext } from '../../App';
import CommentsContainer, { fetchComments } from '../common/CommentsContainer';
import EpisodeInNovel from '../common/EpisodeInNovel';

export const NovelContext = createContext({ });

const NovelPage = () => {

    let { novel_id } = useParams(); 

    const [ novel, setNovel ] = useState(novelStructure);
    const [ moreDetail, setMoreDetail ] = useState(false);
    const [ isLikedByUser, setLikedByUSer ] = useState(false);
    const [ totalParentCommentsLoaded, setTotalParentCommentsLoaded ] = useState(0);
 
    let { userAuth: { username } } = useContext(UserContext);

    // Destructure data to avoid using novel.novel for all attributes
    let { 
        activity: {
            total_likes,
            total_comments,
            total_reads,
            total_parent_comments
        },
        artist,
        author,
        categories,
        comments,
        description,
        episode,
        note,
        novel_banner,
        novel_title,
        other_name,
        permission,
        publishedAt,
        publisher: {
            personal_info: { username: publisher_username, profile_img }
        },
        sensitive_content,
        status,
        type_of_novel,
        updatedAt
    } = novel;

    const fetchNovel = () => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-novels", { novel_id })
        .then( async ({ data: { novel } }) => {

            novel.comments = await fetchComments({ novel_id: novel._id, setParentCommentCountFun: setTotalParentCommentsLoaded })
            
            setNovel(novel);
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        resetStates();

        fetchNovel();
    }, [novel_id])

    const resetStates = () => {
        setNovel(novelStructure);
        setLikedByUSer(false);
        setTotalParentCommentsLoaded(0);
    }

    const handleMoreDetail = () => {
        setMoreDetail(!moreDetail);
    }

    return (
        <NovelContext.Provider value={{ novel, setNovel, isLikedByUser, setLikedByUSer, totalParentCommentsLoaded, setTotalParentCommentsLoaded }}>
            <main className="min-h-80 pt-20 pb-[30px] w-full">
                <div className="container mx-auto px-[15px]">
                    <div className="flex flex-wrap ml-[-15px] mr-[-15px]">
                        <div className="relative w-full px-[15px] flex-[0_0_100%] max-w-full">
                            <div className="inline-block mb-[20px] px-[10px] py-[4px] page-breadcrumb">
                                <span>
                                    <a href="/" className="hover:text-green hover:outline-0 hover:no-underline">
                                        <FontAwesomeIcon icon={faHouse} className="mr-1"/>
                                    </a>
                                </span>
                                <span>
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </span>
                                <span>
                                    <a href="/" className="hover:text-green hover:outline-0 hover:no-underline"> {type_of_novel}</a>
                                </span>
                            </div>
                        </div>
                        <div className="relative w-full px-[15px] flex-[0_0_100%] max-w-full">
                            {
                                username === publisher_username ?
                                <div className="!text-right pb-[20px]">
                                    <a href={`/action/series/${novel_id}`} className="button button-green">
                                        <i className="fi fi-rr-edit mr-[6px]"></i>Chỉnh sửa
                                    </a>
                                </div>
                                : ""
                            }
                        </div>
                    </div>
                </div>
                <div className="container mx-auto px-[15px]">
                    <div className="!block mx-[-15px] clearfix">
                        <div className="!float-left relative w-full px-[15px] flex-[0_0_100%] max-w-full lg:flex-[0_0_75%] lg:max-w-[75%]">
                            <section className="mb-[20px] feature-section clear">
                                <main className="relative p-0">
                                    <div className="p-[10px]">
                                        <div className="flex flex-wrap mx-[-15px]">
                                            <div className="relative w-full px-[15px] flex-[0_0_100%] max-w-full md:flex-[0_0_25%] md:max-w-[25%]">
                                                <div>
                                                    <div className={`series-type ${
                                                        type_of_novel === "Truyện dịch" ? "bg-[#36a189] before:border-t-[#36a189]" :
                                                        type_of_novel === "Truyện sáng tác" ? "bg-[#1d7eaf] before:border-t-[#1d7eaf]" :
                                                        type_of_novel === "Truyện convert" ? "bg-[#dc8118] before:border-t-[#dc8118]" : ""}`}
                                                    >
                                                        <span>{type_of_novel}</span>
                                                    </div>
                                                    <div className="a6-ratio">
                                                        <div className="absolute inset-0 cover-background" style={{'backgroundImage': `url(${novel_banner})`}}></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col relative w-full px-[15px] flex-[0_0_100%] max-w-full md:flex-[0_0_75%] md:max-w-[75%]">
                                                <div className="flex-1">
                                                    <div className="mb-[10px]">
                                                        <span className="block font-bold">
                                                            <a 
                                                                href={`/novel/${novel_id}`} 
                                                                className="text-[26px] leading-[34px] hover:text-green hover:outline-0 hover:no-underline"
                                                            >{novel_title}</a>
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-col !mb-0">
                                                        <div>
                                                            {categories.map((category, i) => {
                                                                return <a href={`/category/${category.toLowerCase()}`} key={i} className="bg-[#eee] inline-block mr-[10px] mb-[10px] px-[10px] py-0 rounded-[20px] cursor-pointer hover:text-green hover:outline-0 hover:no-underline">{category}</a>
                                                            }) }
                                                        </div>
                                                        <div className="mb-[10px]">
                                                            <span className="font-bold mr-[6px]">Tác giả: </span>
                                                            <span>
                                                                <a 
                                                                    href={`/author/${author}`}
                                                                    className="hover:text-green hover:outline-0 hover:no-underline"
                                                                >
                                                                    {author}
                                                                </a>
                                                            </span>
                                                        </div>
                                                        <div className="mb-[10px]">
                                                        <span className="font-bold mr-[6px]">Họa sĩ: </span>
                                                            <span>
                                                                <a 
                                                                    href={`/artist/${artist}`}
                                                                    className="hover:text-green hover:outline-0 hover:no-underline"
                                                                >
                                                                    {artist}
                                                                </a>
                                                            </span>
                                                        </div>
                                                        <div className="mb-[10px]">
                                                        <span className="font-bold mr-[6px]">Tình trạng: </span>
                                                            <span>
                                                                <a 
                                                                    href={status === "Đang tiến hành" ? "/ongoing" : status === "Đã hoàn thành" ? "/completed" : "paused"}
                                                                    className="hover:text-green hover:outline-0 hover:no-underline"
                                                                >
                                                                    {status}
                                                                </a>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <NovelInteraction />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="overflow-hidden pt-0 pb-[10px] px-[10px]">
                                        <div className="flex flex-wrap mx-[-15px]">
                                            <div className="relative w-full px-[15px] flex-[0_0_100%] max-w-full">
                                                <div className="flex flex-wrap mx-[-15px] pt-[10px] border-t-[#d4dae2] border-t border-solid">
                                                    <div className="relative w-full px-[15px] flex-[0_0_100%] max-w-full md:flex-[0_0_25%] md:max-w-[25%]">
                                                        <div className="text-lightblack text-center">Lần cuối</div>
                                                        <div className="font-bold text-center">
                                                            <TimeDifference valueDateTime={publishedAt} className="text-[18px] leading-6"/>
                                                        </div>
                                                    </div>
                                                    <div className="relative w-full px-[15px] flex-[0_0_33.33333333%] max-w-[33.33333333%] md:flex-[0_0_25%] md:max-w-[25% ">
                                                        <div className="text-lightblack text-center">Số từ</div>
                                                        <div className="text-[18px] font-bold text-center leading-6"></div>
                                                    </div>
                                                    <div className="relative w-full px-[15px] flex-[0_0_33.33333333%] max-w-[33.33333333%] md:flex-[0_0_25%] md:max-w-[25% ">
                                                        <div className="text-lightblack text-center">Đánh giá</div>
                                                        <div className="text-[18px] font-bold text-center leading-6"></div>
                                                    </div>
                                                    <div className="relative w-full px-[15px] flex-[0_0_33.33333333%] max-w-[33.33333333%] md:flex-[0_0_25%] md:max-w-[25% ">
                                                        <div className="text-lightblack text-center">Lượt xem</div>
                                                        <div className="text-[18px] font-bold text-center leading-6">{total_reads}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="relative w-full px-[15px] flex-[0_0_100%] max-w-full mt-[10px] pt-[10px] border-t-[#d4dae2] border-t border-solid">
                                                <div className="mb-[10px]">
                                                    <div className="font-bold mb-[6px]">Tên khác:</div>
                                                    <div>
                                                        <div className="block pb-[5px]">{other_name}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="relative w-full px-[15px] flex-[0_0_100%] max-w-full mt-[10px] pt-[10px] border-t-[#d4dae2] border-t border-solid">
                                                <div className="mb-[20px]">
                                                    <h4 className="font-bold">Tóm tắt</h4>
                                                    {
                                                        moreDetail === false ?
                                                        <>
                                                            <div className="max-h-[100px] overflow-hidden relative mb-0">
                                                                <div 
                                                                    className="leading-6 desc"
                                                                    dangerouslySetInnerHTML={{ __html: description }}
                                                                ></div>
                                                            </div>
                                                            <div className="more-detail hover:text-green" onClick={handleMoreDetail}>
                                                                <div className="cursor-pointer font-bold absolute pl-0 pr-[10px] py-[10px] bottom-0 inset-x-0">Xem thêm</div>
                                                            </div>
                                                        </>
                                                        :
                                                        <>
                                                            <div className="max-h-[none] overflow-hidden relative mb-0">
                                                                <div 
                                                                    className="leading-6 desc"
                                                                    dangerouslySetInnerHTML={{ __html: description }}
                                                                ></div>
                                                            </div>
                                                            <div className="hover:text-green">
                                                                <div className="cursor-pointer font-bold w-full pt-2" onClick={handleMoreDetail}>Ẩn đi</div>
                                                            </div>
                                                        </>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </main>
                            </section>
                        </div>
                        <div className="!float-right relative w-full px-[15px] flex-[0_0_100%] max-w-full lg:flex-[0_0_25%] lg:max-w-[25%]">
                            <div className="flex flex-wrap ml-[-15px] mr-[-15px]">
                                <div className="relative w-full px-[15px] flex-[0_0_100%] max-w-full md:flex-[0_0_50%] md:max-w-[50%] lg:flex-[0_0_100%] lg:max-w-full">
                                    <section className="rounded overflow-hidden mb-[20px] series-users">
                                        <main>
                                            <div className={`block relative w-full ${
                                                type_of_novel === "Truyện dịch" ? "bg-[#36a189]" :
                                                type_of_novel === "Truyện sáng tác" ? "bg-[#1d7eaf]" :
                                                type_of_novel === "Truyện convert" ? "bg-[#dc8118]" : ""}`}
                                            >
                                                <img width="50px" height="50px" src={profile_img} alt="avatar" className="block h-[60px] w-[60px] z-[2]"/>
                                                <div className="absolute -translate-y-2/4 z-[1] left-[80px] top-2/4">
                                                    <span className="font-bold pr-[20px]">
                                                        <a href={`/user/${publisher_username}`} className="text-white">{publisher_username}</a>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="text-center p-0 border-t-[#d4dae2] border-b-4 border-b-[#d9534f] border-solid border-t"></div>
                                        </main>
                                    </section>
                                </div>
                            </div>
                            <section className="basic-section mb-[20px]">
                                <header className="bg-[#f4f5f6] p-[10px] border-b-[#dadbdd] border-b border-solid font-bold">
                                    <span className="inline-block ml-0 pr-0 text-[18px] leading-[26px]">Chú thích thêm</span>
                                </header>
                                <main className="p-[10px] !lg:block">
                                    <div className="text-breakword">
                                        <div 
                                            className="m-0"
                                            dangerouslySetInnerHTML={{ __html: note }}
                                        ></div>
                                    </div>
                                </main>
                            </section>
                            <section className="mb-[20px] basic-section">
                                <header className="bg-[#f4f5f6] p-[10px] border-b-[#dadbdd] border-b border-solid font-bold">
                                    <span className="inline-block ml-0 pr-0 text-[18px] leading-[26px]">Thảo luận</span>
                                </header>
                                <main className="none !lg:block p-[10px]">
                                    <div className="text-right p-[10px]">
                                        <a href="#" className="button button-green">
                                            <FontAwesomeIcon icon={faPlus} /> Tạo bài viết
                                        </a>
                                    </div>
                                </main>
                            </section>
                        </div>
                        <div className="!float-left relative w-full px-[15px] flex-[0_0_100%] max-w-full lg:flex-[0_0_75%] lg:max-w-[75%]">
                            {
                                episode.length ? 
                                episode.map((episode, i) => {
                                    return <section key={i} className='bg-profile rounded border overflow-hidden border-[#e4e5e7_#dadbdd_hsla(214,4%,80%,0.8)] border-solid mb-[20px]'>
                                        <EpisodeInNovel episode_id={episode} publisherUsername={publisher_username}/>
                                    </section>
                                }) : <></>
                            }
                            <CommentsContainer />
                        </div>
                    </div>
                </div>
            </main>
        </NovelContext.Provider>
    )
}

export default NovelPage;