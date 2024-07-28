import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { chapterStructure } from './chapterStructure';
import TimeDifference from './TimeDifference';

const ChapterList = ({ chapter_id }) => {

    const [ chapter, setChapter ] = useState(chapterStructure);

    const fetchChapter = () => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-chapter", { chapter_id })
        .then(({ data }) => {   
            setChapter(data.chapter)
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        fetchChapter();
    }, [])

    return (
        <>
            <div className="pr-[86px] overflow-hidden text-ellipsis whitespace-nowrap">
                <a href={`/read/${chapter_id}`} className="hover:text-[#10b18e]">{chapter.chapter_title}</a>
            </div>
            <div>
                <TimeDifference valueDateTime={chapter.publishedAt} className="text-base text-[#aaa] absolute right-[10px] top-[4px]"/>
            </div>
        </>
    );
}

export default ChapterList;
 