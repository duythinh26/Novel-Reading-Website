import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../App';

const PurchasedEpisodes = () => {

    let { userAuth: { access_token } } = useContext(UserContext);

    const [episodes, setEpisodes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPurchasedEpisodes = () => {
        axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/purchased-episodes", {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        })
        .then(({ data: { purchasedEpisodes } }) => {
            setEpisodes(purchasedEpisodes);
            setLoading(false);
        })
        .catch(err => {
            console.error('Error fetching episodes:', err);
            setError('Failed to fetch episodes');
            setLoading(false);
        });
      };

    useEffect(() => {
        fetchPurchasedEpisodes();
    }, []);

    if (loading) return <p>Loading episodes...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Các tập truyện đã mua</h1>
                {episodes.length > 0 ? (
                    <ul className="space-y-4">
                    {episodes.map((episode) => (
                        <li key={episode._id} className="bg-white p-4 rounded-lg shadow-md flex items-center">
                            <img
                                src={episode.episode_banner || 'https://via.placeholder.com/100'}
                                alt={episode.episode_title}
                                className="w-24 h-24 rounded-lg object-cover mr-4"
                            />
                            <div className="flex-1">
                                <h2 className="text-xl font-semibold text-blue-600">{episode.episode_title}</h2>
                                <p className="text-gray-700 font-bold">
                                    Thuộc về truyện: 
                                    <a href={`/novel/${episode.belonged_to.novel_id}`} className="font-bold"> {episode.belonged_to.novel_title} </a>
                                </p>
                                <p className="font-bold text-red-500 mt-2">Giá tiền: {episode.price} xu</p>
                            </div>
                        </li>
                    ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-600">Bạn chưa mua bất kì tập nào hết</p>
                )}
            </div>
        </>
    );
};

export default PurchasedEpisodes;
