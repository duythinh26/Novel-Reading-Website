import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { chapterStructure } from '../common/chapterStructure';
import axios from 'axios';
import { episodeStructure } from '../common/episodeStructure';
import { novelStructure } from '../common/novelStructure';

const ReadPage = () => {
    let { chapter_id } = useParams();

    const [ chapterData, setChapterData ] = useState(chapterStructure);
    const [ episodeData, setEpisodeData ] = useState(episodeStructure);
    const [ novelData, setNovelData ] = useState(novelStructure);

    const fetchData = () => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-chapter-episode-novel", { chapter_id })
            .then(({ data }) => {
                if (data.chapter && data.episode) {
                    setChapterData(data.chapter);
                    setEpisodeData(data.episode);
                    setNovelData(data.novel)
                } else {
                    console.error('Data not found');
                }
            })
            .catch((err) => {
                console.error('Error fetching data:', err);
            });
    };

    useEffect(() => {
        fetchData();
    }, [chapter_id])

    return (
        <main className="min-h-[219px] bg-[#eae4d3] relative w-full block pl-0 py-0">
            <div className="container w-full mx-auto">
                <div className="flex flex-wrap row">
                    <div className="leading-[1.5em] lg:flex-[0_0_83.33333333%] lg:max-w-[83.33333333%] flex-[0_0_100%] max-w-full relative w-full lg:ml-[8.33333333%] px-[15px]">
                        <div className="pt-[20px]">
                            <h2 className="leading-[1.5em] font-bold text-2xl text-center">{episodeData.episode_title}</h2>
                            <h4 className="leading-[1.5em] font-bold text-xl text-center">{chapterData.chapter_title}</h4>
                        </div>
                        <section className="flex flex-wrap bg-[#eee] border h-10 overflow-hidden w-full mx-0 my-[30px] rounded-[30px] border-solid border-[#d0d0d0]">
                            <a 
                                href={`/novel/${novelData.novel_id}`}
                                className="relative w-full cursor-pointer text-xl text-center p-[8px] basis-0 grow max-w-full hover:bg-[#999] hover:text-white"
                            >
                                <i className="fi fi-sr-house-chimney"></i>
                            </a>
                        </section>
                        <div 
                            className="chapter-content leading-[28px] mt-[40px] px-0 text-justify font-times"
                            dangerouslySetInnerHTML={{ __html: chapterData.content }}
                        ></div>
                        <section className="flex flex-wrap bg-[#eee] border h-10 overflow-hidden w-full mx-0 my-[30px] rounded-[30px] border-solid border-[#d0d0d0]">
                            <a 
                                href={`/novel/${novelData.novel_id}`}
                                className="relative w-full cursor-pointer text-xl text-center p-[8px] basis-0 grow max-w-full hover:bg-[#999] hover:text-white"
                            >
                                <i className="fi fi-sr-house-chimney"></i>
                            </a>
                        </section>
                    </div>
                    <div className=""></div>
                </div>
            </div>
        </main>
    )
}

export default ReadPage