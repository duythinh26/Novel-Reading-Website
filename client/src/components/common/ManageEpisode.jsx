import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { episodeStructure } from './episodeStructure';
import { UserContext } from '../../App';
import { Toaster, toast } from 'react-hot-toast';
import { Editor } from '@tinymce/tinymce-react';

const ManageEpisode = () => {

    let { episode_id } = useParams();

    let [ episode, setEpisode ] = useState(episodeStructure);

    let { userAuth: { access_token } } = useContext(UserContext);

    var episodeCoverRef = useRef();
    let navigate = useNavigate();

    const fetchEpisode = () => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-episodes", { episode_id })
        .then(({ data: { episode } }) => {
            setEpisode(episode);
        })
        .catch(err => {
            console.log(err);
        });
    };

    useEffect(() => {
        resetStates();

        fetchEpisode();
    }, []);

    const resetStates = () => {
        setEpisode(episodeStructure);
    }

    const handleTitleChange = (e) => {
        setEpisode({ ...episode, episode_title: e.target.value });
    }

    const handlePriceChange = (e) => {
        setEpisode({ ...episode, price: e.target.value });
    }

    const handleDescriptionChange = (value, editor) => {
        setEpisode({ ...episode, description: editor.getContent() });
    }

    const handleBannerUpload = async (e) => {
        let img = e.target.files[0];

        if (img) {
            let loadingToast = toast.loading("Bạn chờ tí nhé ...");

            await uploadImage(img).then((url) => {
                if (url) {
                    toast.dismiss(loadingToast);
                    toast.success("Đã đăng ảnh thành công!");

                    episodeCoverRef.current.className = "block max-w-[100px] max-h-[100px] w-auto h-auto z-20";

                    setEpisode({ ...episode, episode_banner: url });
                }
            })
            .catch(err => {
                toast.dismiss(loadingToast);
                toast.error(err.message || 'Có lỗi xảy ra khi đăng ảnh');
            });
        }
    }

    const handleSaveEvent = async (e) => {
        let episodeObject = {
            _id: episode._id,
            episode_title: episode.episode_title,
            episode_banner: episode.episode_banner,
            description: episode.description,
            price: episode.price
        };

        axios.put(import.meta.env.VITE_SERVER_DOMAIN + "/update-episode", episodeObject, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
        .then(() => {
            setTimeout(() => {
                navigate(`/action`);
            }, 500);
        })
        .catch(({ response }) => {
            return toast.error(response.data.error);
        });
    };

    return (
        <>
            <Toaster />
            <div className="container mx-auto px-[15px]"> 
                <div className="row">
                    <div className="lg:ml-[8.33333333%] lg:w-5/6 lg:float-left relative min-h-[1px] px-[15px]">
                        <div className="border-[#dddddd] bg-white border rounded shadow-[0_1px_1px_rgba(0,0,0,0.05)] mb-5 border-solid">
                            <div className="flex items-center justify-between text-[#333333] bg-neutral-100 px-[15px] py-[10px] rounded-t-[3px] border-b-transparent border-[#dddddd] border-b border-solid">
                                <span>Episode</span>
                                {/* <button onClick={handleSubMenu} className="bg-blue-500 cursor-pointer border-[none] bg-blue-500 rounded">
                                    <i className="fi fi-rr-menu-burger"></i>
                                </button>
                                {
                                    episodeSubMenu ?
                                    <div className="right-4 top-11 absolute bg-white border border-[#dddddd] rounded shadow-md">
                                        <a href={`/action/series/${novel_id}/episode-list`} className="block px-4 py-2 hover:bg-gray-100">Danh sách tập</a>
                                        <a href={`/action/series/${novel_id}/episode`} className="block px-4 py-2 hover:bg-gray-100">Thêm tập</a>
                                    </div> : ""
                                } */}
                            </div>
                            <div className="p-[15px]">
                                <form>
                                    <div className="mb-[15px] clearfix">
                                        <label className='relative px-4 pt-2 text-right lg:w-1/6 lg:float-left after:content-["_*_"] after:text-red'>Tiêu đề</label>
                                        <div className="float-left lg:w-2/3 px-4">
                                            <input 
                                                type="text"
                                                name="title"
                                                className="input input-info w-full h-input border border-solid border-silver"
                                                value={episode.episode_title}
                                                onChange={handleTitleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-[15px] clearfix">
                                        <label className='relative px-4 pt-2 text-right lg:w-1/6 lg:float-left'>Ảnh bìa</label>
                                        <div className="lg:float-left lg:w-2/3 px-4">
                                            <div className="w-full h-full clearfix">
                                                <div className="mb-[15px] uppercase font-bold">
                                                    <label htmlFor="uploadBanner">
                                                        <a className="inline-block px-8 py-3.5 text-white bg-seaweed cursor-pointer">Chọn ảnh</a>
                                                        <input
                                                            id="uploadBanner" 
                                                            type="file"
                                                            accept=".png, .jpg, .jpeg"
                                                            className="hidden"
                                                            onChange={handleBannerUpload}
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                            <img 
                                                ref={episodeCoverRef} 
                                                src={episode.episode_banner} 
                                                className='block max-w-[100px] max-h-[100px] w-auto h-auto z-20' 
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-[15px] clearfix">
                                        <label className='relative px-4 pt-2 text-right lg:w-1/6 lg:float-left after:content-["_*_"] after:text-red'>Tóm tắt</label>
                                        <div id='textEditor' className="float-left lg:w-5/6 px-4">
                                            <Editor
                                                apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                                                init={{
                                                    plugins: 'anchor autolink charmap emoticons image link lists media searchreplace visualblocks wordcount linkchecker fullscreen',
                                                    toolbar: 'undo redo | bold italic underline strikethrough | link image | addcomment showcomments | fullscreen | a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat |',
                                                    tinycomments_mode: 'embedded',
                                                    tinycomments_author: 'Author name',
                                                    mergetags_list: [
                                                        { value: 'First.Name', title: 'First Name' },
                                                        { value: 'Email', title: 'Email' },
                                                    ],
                                                    ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("")),
                                                    branding: false,
                                                    selector: "textarea",
                                                    entity_encoding: "raw",
                                                    relative_urls : false,
                                                    convert_urls : false,
                                                    setup: function (editor) {
                                                        editor.getContent();
                                                    }
                                                }}
                                                value={episode.description}
                                                onEditorChange={handleDescriptionChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-[15px] clearfix">
                                        <label className='relative px-4 pt-2 text-right lg:w-1/6 lg:float-left'>Giá</label>
                                        <div className="float-left lg:w-2/3 px-4">
                                            <input 
                                                type="number"
                                                name="price"
                                                className="input input-info w-full h-input border border-solid border-silver"
                                                value={episode.price}
                                                onChange={handlePriceChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-[15px] clearfix">
                                        <div className="float-left lg:ml-1/6 lg:w-5/6 px-4">
                                            <button 
                                                type='button' 
                                                className='btn btn-confirm text-white text-base'
                                                onClick={handleSaveEvent}
                                            >
                                                Cập nhật
                                            </button>
                                            <button 
                                                type='button'
                                                className='btn btn-accent text-base ml-4'
                                                onClick={() => navigate(`/action/series/${novel_id}/episode-list`)}
                                            >
                                                Huỷ bỏ
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>  
                    </div>
                </div>
            </div>
        </>
    )
}

export default ManageEpisode