import React, { useContext, useEffect, useState } from 'react';
import { episodeStructure } from './episodeStructure';
import axios from 'axios';
import PopupConfirm from './PopupConfirm';
import { UserContext } from '../../App';
import ChapterList from './ChapterList';

const EpisodeInNovel = ({ episode_id, publisherUsername }) => {
    
    let { userAuth: { access_token, username } } = useContext(UserContext);

    const [ episode, setEpisode ] = useState(episodeStructure);
    const [ showPopup, setShowPopup ] = useState(false);
    const [ popupMessage, setPopupMessage ] = useState('');
    const [ owned, setOwned ] = useState(false);
    const [userData, setUserData] = useState(null);

    let {
        _id,
        activity,
        belonged_to,
        chapter,
        comments,
        description,
        episode_banner,
        episode_title,
        price
    } = episode;

    const fetchEpisode = () => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-episodes", { episode_id })
        .then(({ data }) => {
            setEpisode(data.episode);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const checkOwnedEpisode = () => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/check-owned-episode", { episode_id }, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
        .then(({ data }) => {
            setOwned(data.owned);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const fetchUserData = () => {
        axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/get-user-data", {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
        .then(({ data }) => {
            setUserData(data.user);
        })
        .catch(err => {
            console.log(err);
        });
      };
    
    const handlePurchaseClick = () => {
        setShowPopup(true);
    }

    const handleCancelPurchase = () => {
        setShowPopup(false);
        setPopupMessage('');
    }

    const handleConfirmPurchase = () => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/purchase-episode", { _id }, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
        .then(({ data }) => {
            setPopupMessage(data.message);
            checkOwnedEpisode();
            fetchUserData();
        })
        .catch(err => {
            setPopupMessage("Có lỗi xảy ra, vui lòng thử lại sau");
            console.log(err);
        });
    }

    const handlePurchaseCoins = () => {
        window.location.href = '/purchase-coins'; // Redirect to purchase coins page
    };

    const resetStates = () => {
        setEpisode(episodeStructure);
        setOwned(false);
    }

    useEffect(() => {
        resetStates();
        fetchEpisode();
        checkOwnedEpisode();
        fetchUserData();
    }, [episode_id]);

    const canAccessChapters = owned || username === publisherUsername;

    return (
        <>
            <header className='bg-[#f4f5f6] p-2.5 border-b-[#dadbdd] border-b border-solid font-bold'>
                <span className='block pr-[60px] ml-0 text-[18px] leading-[26px]'>
                    {episode_title}
                </span>
            </header>
            <main className='p-[10px]'>
                <div className="flex flex-wrap ml-[-15px] mr-[-15px]">
                    <div className="relative w-full px-[15px] flex-[0_0_100%] max-w-full md:flex-[0_0_16.66666667%] md:max-w-[16.66666667%]">
                        <div>
                            <a href="#">
                                <div className="a6-ratio">
                                    <div className="inset-0 absolute cover-background" style={{'backgroundImage': `url(${episode_banner})`}}></div>
                                </div>
                            </a>
                            <div className="text-center mt-[10px]">
                                {
                                    username !== publisherUsername && (
                                        price === 0 ? (
                                            <button className='text-xl text-[#4caf50] bg-transparent cursor-default border-[none]' title='Miễn phí'>
                                                Miễn phí
                                            </button>
                                        ) : (
                                            owned ? (
                                                <button
                                                    className='text-xl text-white bg-[#bdbdbd] cursor-default px-[20px] py-[10px] rounded-[5px] border-[none]'
                                                    title='Bạn đã mua tập này'
                                                >
                                                    Đã mua
                                                </button>
                                            ) : (
                                                <button 
                                                    className='text-xl text-white bg-[#f44336] cursor-pointer px-[20px] py-[10px] rounded-[5px] border-[none]'
                                                    onClick={handlePurchaseClick}
                                                >
                                                    {price} xu
                                                </button>
                                            )
                                        )
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="relative w-full px-[15px] flex-[0_0_100%] max-w-full md:flex-[0_0_83.33333333%] md:max-w-[83.33333333%]">
                        {canAccessChapters ? (
                            <ul className='m-0 p-0 no-underline list-style-none'>
                                {chapter.map((chapterId) => (
                                    <li key={chapterId} className="relative px-[10px] py-[5px] hover:bg-[#f0f0f0]">
                                        <ChapterList chapter_id={chapterId} />
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="text-center mt-[10px] text-red-500">
                                Bạn cần mua tập này để truy cập vào các chương.
                            </div>
                        )}
                    </div>
                </div>
            </main>
            {
                showPopup && 
                <PopupConfirm 
                    price={price}
                    userCoins={userData ? userData.account_info.coin : 0}
                    onConfirm={handleConfirmPurchase}
                    onCancel={handleCancelPurchase}
                    onPurchaseCoins={handlePurchaseCoins}
                    message={popupMessage}
                />
            }
        </>
    )
}

export default EpisodeInNovel;
