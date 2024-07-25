import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import axios from 'axios';

const EpisodeList = () => {

    const { novel_id } = useParams();
    const [ episodes, setEpisodes ] = useState([]);
    const { userAuth: { access_token } } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-episodes-in-novel", { novel_id }, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
        .then(({ data }) => {
            setEpisodes(data.episodes);
        })
        .catch(err => {
            console.log(err);
        });
    }, [novel_id, access_token])

    const handleGoBack = () => {
        navigate(-1); // Điều hướng quay lại trang trước đó
    };

    return (
        <>
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl">Danh sách tập</h2>
                    <button onClick={handleGoBack} className="btn text-white bg-[#5bc0de] border-[#46b8da] hover:bg-[#31b0d5] hover:border-[#269abc] text-base">
                        Quay lại
                    </button>
                </div>
                <table className="w-full bg-white rounded-lg shadow">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className='leading-[1.42857143] p-[8px] border-t-[#dddddd] border-t border-solid !align-middle'>Tên tập</th>
                            <th className='leading-[1.42857143] p-[8px] border-t-[#dddddd] border-t border-solid !align-middle'>Giá tiền</th>
                            <th className='leading-[1.42857143] p-[8px] border-t-[#dddddd] border-t border-solid !align-middle'>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {episodes.map((episode) => (
                            <tr key={episode._id} className='bg-gray-100'>
                                <td className='leading-[1.42857143] p-[8px] border-t-[#dddddd] border-t border-solid !align-middle text-center'>
                                    {episode.episode_title}
                                </td>
                                <td className='leading-[1.42857143] p-[8px] border-t-[#dddddd] border-t border-solid !align-middle text-center'>
                                    {episode.price}
                                </td>
                                <td className='leading-[1.42857143] p-[8px] border-t-[#dddddd] border-t border-solid !align-middle text-center'>
                                    <a 
                                        href={`/action/series/episode/${episode._id}`}
                                        className='btn mr-8 max-sm:mr-2 text-white bg-[#5bc0de] border-[#46b8da] hover:bg-[#31b0d5] hover:border-[#269abc]'
                                    >
                                        <i className="fi fi-rr-pen-square text-2xl"></i>
                                    </a>
                                    <button
                                        className='btn mr-8 max-sm:mr-2 text-white bg-[#f44336] border-[#d32f2f] hover:bg-[#e53935] hover:border-[#d32f2f]'
                                        onClick={() => deleteEpisode(episode._id, access_token, setEpisodes)}
                                    >
                                        <i className="fi fi-rr-cross text-2xl"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default EpisodeList