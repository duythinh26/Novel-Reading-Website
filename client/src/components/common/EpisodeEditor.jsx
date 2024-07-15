import React, { useContext, useEffect, useRef, useState } from 'react'
import { novelStructure } from './novelStructure';
import { UserContext } from '../../App';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import { episodeStructure } from './episodeStructure';
import { uploadImage } from './aws';
import { Editor } from '@tinymce/tinymce-react';
import { Toaster, toast } from 'react-hot-toast';

const EpisodeEditor = () => {

    let { novel_id } = useParams();
    const episodeBannerRef = useRef();

    let { userAuth: { access_token } } = useContext(UserContext);

    let [ novel, setNovel ] = useState(novelStructure);
    let [ episode, setEpisode ] = useState(episodeStructure);
    const navigate = useNavigate();

    const fetchNovel = () => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-novels", { novel_id })
        .then( async ({ data: { novel } }) => {
            
            setNovel(novel);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const handleTitleChange = (e) => {
        setEpisode({ ...episode, episode_title: e.target.value });
    }

    const handleBannerUpload = (e) => {
        let img = e.target.files[0];

        if (img) {
            let loadingToast = toast.loading("Bạn chờ tí nhé ...")

            uploadImage(img).then((url) => {
                if (url) {
                    toast.dismiss(loadingToast);
                    toast.success("Đã đăng ảnh thành công!");

                    episodeBannerRef.current.className = "block max-w-[100px] max-h-[100px] w-auto h-auto z-20";

                    // Set novel banner to context
                    setEpisode({ ...episode, episode_banner: url });
                }
            })
            .catch(err => {
                toast.dismiss(loadingToast);
                return toast.error(err);
            })
        }
    }

    const handleDescriptionChange = (value, editor) => {
        setEpisode({ ...episode, description: editor.getContent({ format: 'text' })});
    }

    const handlePriceChange = (e) => {
        setEpisode({ ...episode, price: parseFloat(e.target.value) });
    }
    
    const handlePublishEvent = (e) => {
        if (e.target.className.includes("btn-disabled")) {
            return;
        }

        if (!episode.episode_title.length) {
            return toast.error("Episode đang thiếu tiêu đề");
        }

        if (!episode.description.length) {
            return toast.error("Episode đang thiếu tóm tắt");
        }

        if (episode.price == null) {
            return toast.error("Episode đang thiếu giá");
        }

        let loadingToast = toast.loading("Bạn đợi chút nhé ...");

        e.target.classList.add("btn-disabled");

        const episodeObject = {
            ...episode,
            novel_id: novel.novel_id,
        };

        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/create-episode", episodeObject, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
        .then(() => {
            e.target.classList.remove("btn-disabled");

            toast.dismiss(loadingToast);
            toast.success("Đã tạo episode thành công");

            setTimeout(() => {
                navigate(`/novel/${novel.novel_id}`);
            }, 500);
        })
        .catch(({ response }) => {
            e.target.classList.remove("btn-disabled");
            toast.dismiss(loadingToast);
            
            return toast.error(response.data.error);
        });
    }

    useEffect(() => {
        fetchNovel();
    }, [])

    return (
        <>
            <Toaster />
            <div className="container mx-auto px-[15px]">
                <div className="row">
                    <div className="lg:ml-[8.33333333%] lg:w-5/6 lg:float-left relative min-h-[1px] px-[15px]">
                        <div className="border-[#dddddd] bg-white border rounded shadow-[0_1px_1px_rgba(0,0,0,0.05)] mb-5 border-solid">
                            <div className="flex items-center justify-between text-[#333333] bg-neutral-100 px-[15px] py-[10px] rounded-t-[3px] border-b-transparent border-[#dddddd] border-b border-solid">
                                <span>Episode</span>
                            </div>
                            <div className="p-[15px]">
                                <form>
                                    {/* If an element is taller than the element containing it, and it is floated, it will overflow outside of its container.
                                    Using clearfix "hack" to fix this problem */}
                                    <div className="mb-[15px] clearfix">
                                        <label className='relative px-4 pt-2 text-right lg:w-1/6 lg:float-left'>Tiêu đề truyện</label>
                                        <div className="float-left lg:w-2/3 px-4">
                                            <input 
                                                type="text"
                                                name="title"
                                                className="input input-info w-full h-input border border-solid border-silver"
                                                value={novel.novel_title}
                                                disabled={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-[15px] clearfix">
                                        <label className='relative px-4 pt-2 text-right lg:w-1/6 lg:float-left after:content-["_*_"] after:text-red'>Tiêu đề tập</label>
                                        <div className="float-left lg:w-2/3 px-4">
                                            <input 
                                                type="text"
                                                name="chapter"
                                                className="input input-info w-full h-input border border-solid border-silver"
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
                                                ref={episodeBannerRef} 
                                                src={episode.episode_banner} 
                                                className='hidden' 
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
                                                    relative_urls: false,
                                                    convert_urls: false,
                                                }}
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
                                                placeholder='Không nhập giá có nghĩa là miễn phí'
                                                onChange={handlePriceChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-[15px] clearfix">
                                        <div className="float-left lg:ml-1/6 lg:w-5/6 px-4">
                                            <button 
                                                type='button' // Default type of button is submit
                                                className='btn btn-confirm text-white text-base'
                                                onClick={handlePublishEvent}
                                            >
                                                Thêm tập
                                            </button>
                                            <button 
                                                type='button'
                                                className='btn btn-accent text-white text-base ml-4'
                                                // onClick={handleSaveDraft}
                                            >
                                                Lưu nháp
                                            </button>
                                            <a href="javascript: history.back()" className='btn btn-warning text-base text-white ml-4'>Quay lại</a>
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

export default EpisodeEditor;