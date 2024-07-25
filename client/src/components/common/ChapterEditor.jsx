import React, { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../App';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { uploadImage } from './aws';
import { Editor } from '@tinymce/tinymce-react';
import { Toaster, toast } from 'react-hot-toast';
import { episodeStructure } from './episodeStructure';
import { chapterStructure } from './chapterStructure'

const ChapterEditor = () => {

    let { episode_id } = useParams();
    const chapterBannerRef = useRef();
    let { userAuth: { access_token } } = useContext(UserContext);

    let [ episode, setEpisode ] = useState(episodeStructure);
    let [ chapter, setChapter ] = useState(chapterStructure);
    
    const navigate = useNavigate();

    const handleTitleChange = (e) => {
        setChapter({ ...chapter, chapter_title: e.target.value });
    }

    const handleBannerUpload = (e) => {
        let img = e.target.files[0];

        if (img) {
            let loadingToast = toast.loading("Bạn chờ tí nhé ...")

            uploadImage(img).then((url) => {
                if (url) {
                    toast.dismiss(loadingToast);
                    toast.success("Đã đăng ảnh thành công!");

                    chapterBannerRef.current.className = "block max-w-[100px] max-h-[100px] w-auto h-auto z-20";

                    setChapter({ ...chapter, chapter_banner: url });
                }
            })
            .catch(err => {
                toast.dismiss(loadingToast);
                return toast.error(err);
            })
        }
    }

    const handleContentChange = (value, editor) => {
        setChapter({ ...chapter, content: editor.getContent() });
    }

    const handleStatusChange = (e) => {
        setChapter({ ...chapter, chapter_status: e.target.value });
    }

    const handlePublishEvent = (e) => {
        if (e.target.className.includes("btn-disabled")) {
            return;
        }

        if (!chapter.chapter_title.length) {
            return toast.error("Chapter đang thiếu tiêu đề");
        }

        if (!chapter.content.length) {
            return toast.error("Chapter đang thiếu nội dung");
        }

        let loadingToast = toast.loading("Bạn đợi chút nhé ...");

        e.target.classList.add("btn-disabled");

        const chapterObject = {
            ...chapter,
            episode_id: episode_id,
        };

        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/create-chapter", chapterObject, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
        .then(() => {
            e.target.classList.remove("btn-disabled");

            toast.dismiss(loadingToast);
            toast.success("Đã tạo chapter thành công");

            setTimeout(() => {
                navigate(`/action`);
            }, 500);
        })
        .catch(({ response }) => {
            e.target.classList.remove("btn-disabled");
            toast.dismiss(loadingToast);
            
            return toast.error(response.data.error);
        });
    }

    return (
        <>
            <Toaster />
            <div className="container mx-auto px-[15px]">
                <div className="row">
                    <div className="lg:ml-[8.33333333%] lg:w-5/6 lg:float-left relative min-h-[1px] px-[15px]">
                        <div className="border-[#dddddd] bg-white border rounded shadow-[0_1px_1px_rgba(0,0,0,0.05)] mb-5 border-solid">
                            <div className="flex items-center justify-between text-[#333333] bg-neutral-100 px-[15px] py-[10px] rounded-t-[3px] border-b-transparent border-[#dddddd] border-b border-solid">
                                <span>Chapter</span>
                            </div>
                            <div className="p-[15px]">
                                <form>
                                    <div className="mb-[15px] clearfix">
                                        <label className='relative px-4 pt-2 text-right lg:w-1/6 lg:float-left after:content-["_*_"] after:text-red'>Tiêu đề chapter</label>
                                        <div className="float-left lg:w-2/3 px-4">
                                            <input 
                                                type="text"
                                                name="chapter_title"
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
                                                ref={chapterBannerRef} 
                                                src={chapter.chapter_banner} 
                                                className='hidden' 
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-[15px] clearfix">
                                        <label className='relative px-4 pt-2 text-right lg:w-1/6 lg:float-left after:content-["_*_"] after:text-red'>Nội dung</label>
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
                                                onEditorChange={handleContentChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-[15px] clearfix">
                                        <label className='relative px-4 pt-2 text-right lg:w-1/6 lg:float-left after:content-["_*_"] after:text-red'>Trạng thái</label>
                                        <div className="float-left lg:w-2/3 px-4">
                                            <select 
                                                name="chapter_status"
                                                className="input input-info w-full h-input border border-solid border-silver"
                                                onChange={handleStatusChange}
                                            >
                                                <option value="Đang tiến hành">Đang tiến hành</option>
                                                <option value="Tạm ngưng">Tạm ngưng</option>
                                                <option value="Đã hoàn thành">Đã hoàn thành</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mb-[15px] clearfix">
                                        <div className="float-left lg:ml-1/6 lg:w-5/6 px-4">
                                            <button 
                                                type='button'
                                                className='btn btn-confirm text-white text-base'
                                                onClick={handlePublishEvent}
                                            >
                                                Thêm chapter
                                            </button>
                                            <button 
                                                type='button'
                                                className='btn btn-accent text-white text-base ml-4'
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
    );
}

export default ChapterEditor;
