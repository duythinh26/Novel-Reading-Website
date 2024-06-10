import React, { useEffect, useState } from 'react'
import { episodeStructure } from './episodeStructure'
import axios from 'axios';

const EpisodeInNovel = ({ episode_id }) => {

    const [ episode, setEpisode ] = useState(episodeStructure);

    let {
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
            setEpisode(data.episode)
        })
        .catch(err => {
            console.log(err);
        })
    }

    const resetStates = () => {
        setEpisode(episodeStructure);
    }

    useEffect(() => {
        resetStates();

        fetchEpisode();
    }, [episode_id])

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
                        </div>
                    </div>
                    <div className="relative w-full px-[15px] flex-[0_0_100%] max-w-full md:flex-[0_0_83.33333333%] md:max-w-[83.33333333%]"></div>
                </div>
            </main>
        </>
    )
}

export default EpisodeInNovel