import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { userDataStructure } from '../common/userDataStructure';
import { UserContext } from '../../App';
import AboutUser from '../common/AboutUser';
import { filterPaginationData } from '../common/FilterPaginationData';
import NovelInProfile from '../common/NovelInProfile';
import defaultCover from "../../assets/images/user-cover.gif"
import PageNotFound from './PageNotFound';

export const profileDataStructure = {
    personal_info: {
        username: "",
        profile_img: "",
        bio: "",
    },
    account_info: {
        total_posts: 0,
        total_reads: 0,
    },
    joinedAt: " ",
}

const ProfilePage = () => {

    let { id: profileId } = useParams();
    let [ userProfile, setUserProfile ] = useState(userDataStructure);
    let [ loading, setLoading ] = useState(true);
    let [ novels, setNovels ] = useState(null);

    let { userAuth: { username } } = useContext(UserContext)

    const fetchUserData = () => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/users", { username: profileId })
        .then(({ data: user }) => {
            setUserProfile(user);
            getNovels({ user_id: user.user._id})
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
            setLoading(false);
        })
    }

    const getNovels = ({ page = 1, create_new_arr = false, user_id }) => {

        user_id = user_id == undefined ? novels.user_id : user_id;

        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/search-novels", {
            publisher: user_id,
            page
        })
        .then( async ({ data }) => {
            let formatedData = await filterPaginationData({
                state: novels,
                data: data.novels,
                page,
                countRoute: "/search-novels-count",
                create_new_arr,
                data_to_send: { publisher: user_id },
            })
            
            formatedData.user_id = user_id;
            setNovels(formatedData);
        })
    }

    const resetState = () => {
        setUserProfile(userDataStructure);
        setLoading(true);
    }

    useEffect(() => {
        resetState();
        fetchUserData();
    }, [profileId]) // Change back to [] if any error related

    console.log(userProfile)

    return (
        <>
            {
                loading ? <></>
                : 
                userProfile.user == null ? <PageNotFound />
                :
                <main className="w-full min-h-64 pt-nav pb-[30px]">
                    <div className="relative pt-[66px] pb-5">
                        <div className="container mx-auto px-[15px]">
                            <div className="bg-profile rounded border overflow-hidden border-[#e4e5e7_#dadbdd_hsla(214,4%,80%,0.8)] border-solid">
                                <div className="bg-white bg-cover relative w-full">
                                    <div className="relative before:content-[''] before:block before:w-full before:pt-[25%]">
                                        <div className="absolute inset-0 bg-[inherit] bg-[100%_auto] bg-no-repeat" style={{'backgroundImage': `url(${defaultCover})`}}></div>
                                    </div>
                                    <div className="text-white cursor-pointer absolute w-full z-[9] p-2.5 left-0 top-0 shadow999"></div>
                                </div>
                                <div className="relative p-[10px]">
                                    <div className="absolute left-[20px] bottom-[10px]">
                                        <div className="bg-white shadow-[0_0_4px_#333] h-[150px] overflow-hidden relative w-[150px] rounded-[100px]">
                                            <img src={userProfile.user.personal_info.profile_img} alt="avatar" className="block w-full h-auto max-w-full align-middle border-none"/>
                                        </div>
                                    </div>
                                    <div className="float-right leading-[60px] pl-[20px] md:block hidden">
                                        {/* Only render when the user profile is the profile seen in UI */}
                                        {
                                            profileId == username 
                                            ?
                                            <a href="/settings/edit-profile" className="mr-[10px] button button-green">Chỉnh sửa hồ sơ</a>
                                            : " "
                                        }
                                    </div>
                                    <div className="text-white pl-[180px]">
                                        <h3 className="font-bold text-[18px] leading-7 text-[#333]">{userProfile.user.personal_info.username}</h3>
                                    </div>
                                    <div className="text-center mt-[20px] pt-[10px] border-t-[#d4dae2] border-t border-solid md:hidden">
                                        {/* Only render when the user profile is the profile seen in UI */}
                                        {
                                            profileId == username 
                                            ?
                                            <a href="/settings/edit-profile" className="mr-0 button button-green">Chỉnh sửa hồ sơ</a>
                                            : ""
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container mx-auto px-[15px]">
                        <div className="flex flex-wrap ml-[-15px] mr-[-15px]">
                            <div className="relative w-full px-[15px] flex-[0_0_100%] max-w-full lg:flex-[0_0_25%] lg:max-w-[25%]">
                                <section className="mb-[20px] bg-profile rounded border overflow-hidden border-[#e4e5e7_#dadbdd_hsla(214,4%,80%,0.8)] border-solid clear">
                                    <ul className="flex flex-wrap m-0 px-0 py-[10px] border-b-[#d4dae2] border-b border-solid no-underline">
                                        <li className="relative w-full px-[15px] flex-[0_0_50%] max-w-[50%]">
                                            <div className="font-bold text-center text-[22px] leading-[30px]">{userProfile.user.account_info.total_posts.toLocaleString()}</div>
                                            <div className="text-lightblack text-center">Truyện đã đăng</div>
                                        </li>
                                        <li className="relative w-full px-[15px] flex-[0_0_50%] max-w-[50%]">
                                            <div className="font-bold text-center text-[22px] leading-[30px]">{userProfile.user.account_info.total_followings.toLocaleString()}</div>
                                            <div className="text-lightblack text-center">Đang theo dõi</div>
                                        </li>
                                        <li className="relative w-full px-[15px] flex-[0_0_50%] max-w-[50%]">
                                            <div className="font-bold text-center text-[22px] leading-[30px]">{userProfile.user.account_info.total_reads.toLocaleString()}</div>
                                            <div className="text-lightblack text-center">Lượt xem</div>
                                        </li>
                                        <li className="relative w-full px-[15px] flex-[0_0_50%] max-w-[50%]">
                                            <div className="font-bold text-center text-[22px] leading-[30px]">{userProfile.user.account_info.total_comments.toLocaleString()}</div>
                                            <div className="text-lightblack text-center">Bình luận</div>
                                        </li>
                                    </ul>
                                    <AboutUser bio={userProfile.user.personal_info.bio} joinedAt={userProfile.user.joinedAt} />
                                </section>
                            </div>
                            <div className="relative w-full px-[15px] flex-[0_0_100%] max-w-full lg:flex-[0_0_75%] lg:max-w-[75%]">
                                {
                                    novels == null ? <></>
                                    :
                                    <section className="mb-5">
                                        <header className="mb-5 border-b-4 border-b-[#111] border-solid">
                                            <span className="bg-[#111] text-white inline-block font-bold text-[18px] leading-[26px] mr-[10px] px-[10px] py-[6px]">{novels.results.length}</span>
                                            <div className="inline-block font-bold text-[18px] leading-[26px]">Truyện đã đăng</div>
                                        </header>
                                        <div className="flex flex-wrap ml-[-15px] mr-[-15px]">
                                            {
                                                novels.results.length ? 
                                                novels.results.map((novel, i) => {
                                                    return <div key={i} className="relative w-full px-[15px] flex-[0_0_100%] max-w-full md:flex-[0_0_50%] md:max-w-[50%]">
                                                        <NovelInProfile novel={novel}/>
                                                    </div>
                                                })
                                                : ""
                                            }
                                        </div>
                                    </section>
                                }
                            </div>
                        </div>
                    </div>
                </main>
            }
        </>
    )
}

export default ProfilePage;