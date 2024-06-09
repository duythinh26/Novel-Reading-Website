import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import axios from 'axios';

const deleteNovel = (novel, access_token, target) => {

    let { index, novel_id, setStateFunc } = novel;

    target.setAttribute("disabled", true);

    axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/delete-novel", { novel_id }, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    })
    .then(({ data }) => {
        target.removeAttribute("disabled")

        setStateFunc(preVal => {
            let { deletedDocCount, totalDocs, results } = preVal;
            
            results.splice(index, 1);

            if (!deletedDocCount) {
                deletedDocCount = 0;
            }

            if (!results.length && totalDocs - 1 > 0) {
                return null;
            }

            console.log({ ...preVal, totalDocs: totalDocs - 1, deletedDocCount: deletedDocCount + 1 })

            return { ...preVal, totalDocs: totalDocs - 1, deletedDocCount: deletedDocCount + 1 }
        })
    })
    .catch(err => {
        console.log(err);
    })
}

const NovelPublishedCard = ({ novel }) => {

    let { novel_id, novel_title, status, type_of_novel, index } = novel;

    index++;

    let { userAuth: { access_token } } = useContext(UserContext);

    return (
        <>
            <td className='leading-[1.42857143] p-[8px] border-t-[#dddddd] border-t border-solid !align-middle'>
                <a 
                    href={`/novel/${novel_id}`}
                    title={novel_title}
                    className='text-[#337ab7] no-underline hover:text-[#23527c] hover:underline'
                >
                    <b className='text-xl font-bold'>{novel_title}</b>
                </a>
            </td>
            <td className='leading-[1.42857143] p-[8px] border-t-[#dddddd] border-t border-solid !align-middle max-lg:hidden'>{type_of_novel}</td>
            <td className='leading-[1.42857143] p-[8px] border-t-[#dddddd] border-t border-solid !align-middle max-md:hidden'>{status}</td>
            <td className='leading-[1.42857143] p-[8px] border-t-[#dddddd] border-t border-solid !align-middle'>
                <a 
                    href={`/action/series/${novel_id}`}
                    className='btn mr-8 max-sm:mr-2 text-white bg-[#5bc0de] border-[#46b8da] hover:bg-[#31b0d5] hover:border-[#269abc]'
                >
                    <i className="fi fi-rr-pen-square text-2xl"></i>
                </a>
                <button 
                    className='btn mr-8 max-sm:mr-2 text-white bg-[#f0ad4e] border-[#eea236] hover:bg-[#ec971f] hover:border-[#d58512]'
                    onClick={(e) => deleteNovel(novel, access_token, e.target)}
                >
                    <i className="fi fi-rr-cross text-2xl"></i>
                </button>
                
            </td>
        </>
    )
}

export default NovelPublishedCard