import React, { useContext, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { uploadImage } from './aws.jsx';
import { Toaster, toast } from "react-hot-toast";
import Select from 'react-select';
import novelCategoriesOptions from './novelCategoriesOptions';
import { NovelContext } from '../pages/Editor';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import { UserContext } from '../../App';

const NovelEditor = () => {

    var novelTitleRef, novelCoverRef = useRef(); 
    let { novel, setNovel } = useContext(NovelContext);

    let { userAuth: { access_token } } = useContext(UserContext);

    let navigate = useNavigate();
    let navigateBack = useNavigate();

    let { 
        novel_title, 
        other_name, 
        sensitive_content, 
        novel_banner,
        author,
        artist,
        type_of_novel,
        categories,
        description,
        note,
        status,
        episode,
        publisher,
    } = novel;

    const handleTitleChange = (e) => {
        let input = e.target;

        /**
         * Destructor the novel state
         * 
         * ...novel give the whole of a novel's data to access
         * 
         * title: input.value allow access to title and change value to the input value
         */
        setNovel({ ...novel, novel_title: input.value })
    }

    const handleOthernameChange = (e) => {
        let input = e.target;

        setNovel({ ...novel, other_name: input.value })
    }

    const handleMatureChange = (e) => {
        let input = e.target;

        setNovel({ ...novel, sensitive_content: input.checked })
    }

    const handleBannerUpload = (e) => {
        let img = e.target.files[0];

        if (img) {
            let loadingToast = toast.loading("Bạn chờ tí nhé ...")

            uploadImage(img).then((url) => {
                if (url) {
                    toast.dismiss(loadingToast);
                    toast.success("Đã đăng ảnh thành công!");

                    novelCoverRef.current.className = "block max-w-[100px] max-h-[100px] w-auto h-auto z-20";

                    // Set novel banner to context
                    setNovel({ ...novel, novel_banner: url });
                }
            })
            .catch(err => {
                toast.dismiss(loadingToast);
                return toast.error(err);
            })
        }
    }

    const handleAuthorChange = (e) => {
        let input = e.target;

        setNovel({ ...novel, author: input.value })
    }

    const handleArtistChange = (e) => {
        setNovel({ ...novel, artist: e.target.value })
    }

    const handleTypeChange = (e) => {
        setNovel({ ...novel, type_of_novel: e.target.selectedOptions[0].textContent})
    }

    const handleCategoriesChange = (e) => {
        setNovel({ ...novel, categories: e.map(option => option.label)});
    }

    const handleDescriptionChange = (value, editor) => {
        setNovel({ ...novel, description: editor.getContent()
        })
    }

    const handleNoteChange = (value, editor) => {
        setNovel({ ...novel, note: editor.getContent() })
    }

    const handleStatusChange = (e) => {
        setNovel({ ...novel, status: e.target.selectedOptions[0].textContent})
    }

    const handlePublishEvent = (e) => {

        if (e.target.className.includes("btn-disabled")) {
            return;
        }

        if (!novel_title.length) {
            return toast.error("Truyện đang thiếu tiêu đề")
        }

        if (!author.length) {
            return toast.error("Truyện đang thiếu tác giả")
        }

        if (!categories.length) {
            return toast.error("Truyện đang thiếu thể loại")
        }

        if (!description.length) {
            return toast.error("Truyện đang thiếu tóm tắt")
        }

        let loadingToast = toast.loading("Bạn đợi chút nhé ...")

        // Make disable button to prevent multiple data sent
        e.target.classList.add("btn-disabled");

        let novelObject = {
            novel_title, 
            other_name, 
            sensitive_content, 
            novel_banner,
            author,
            artist,
            type_of_novel,
            categories,
            description,
            note,
            status,
            episode,
            draft: false
        }

        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/create-series", novelObject, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
        .then(() => {
            e.target.classList.remove("btn-disabled");

            toast.dismiss(loadingToast);
            toast.success("Đẫ tạo truyện thành công");

            // After 500 miliseconds, navigate user to homepage
            setTimeout(() => {
                navigate("/")
            }, 500);
        })
        .catch(( { response } ) => { // Must destructor the data to get the error if it has
            e.target.classList.remove("btn-disabled");
            toast.dismiss(loadingToast);
            
            return toast.error(response.data.error);
        })
    }

    const handleGoBack = () => {
        navigateBack(-1); // Điều hướng quay lại trang trước đó
    };

    // const handleSaveDraft = (e) => {

    //     if (e.target.className.includes("btn-disabled")) {
    //         return;
    //     }

    //     let loadingToast = toast.loading("Bạn đợi chút nhé ...")

    //     // Make disable button to prevent multiple data sent
    //     e.target.classList.add("btn-disabled");

    //     let novelObject = {
    //         novel_title, 
    //         other_name, 
    //         sensitive_content, 
    //         novel_banner,
    //         author,
    //         artist,
    //         type_of_novel,
    //         categories,
    //         description,
    //         note,
    //         status,
    //         episode,
    //         draft: true
    //     }

    //     axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/create-series", novelObject, {
    //         headers: {
    //             'Authorization': `Bearer ${access_token}`
    //         }
    //     })
    //     .then(() => {
    //         e.target.classList.remove("btn-disabled");

    //         toast.dismiss(loadingToast);
    //         toast.success("Đẫ lưu nháp thành công");

    //         // After 500 miliseconds, navigate user to homepage
    //         setTimeout(() => {
    //             navigate("/")
    //         }, 500);
    //     })
    //     .catch(( { response } ) => { // Must destructor the data to get the error if it has
    //         e.target.classList.remove("btn-disabled");
    //         toast.dismiss(loadingToast);
            
    //         return toast.error(response.data.error);
    //     })
    // }

    // const handleImageError = (e) => {
    //     let img = e.target;
    //     img.src = "";
    //     console.log(first)
    // }

    // Close the open details when click to other details or click outside
    var details = [...document.querySelectorAll('details')];
    document.addEventListener('click', function(e) {
        if (!details.some(f => f.contains(e.target))) {
            details.forEach(f => f.removeAttribute('open'));
        } else {
            details.forEach(f => !f.contains(e.target) ? f.removeAttribute('open') : '');
        }
    })

    return (
        <>
            <Toaster />
            <div className="container mx-auto px-[15px]">
                <div className="mx-[-15px]">
                    <div className="lg:mx-[10%] lg:w-5/6 lg:float-left relative min-h-[1px] px-[15px]">
                        <div className="bg-white border rounded mb-5 border-solid border-gainsboro">
                            <div className="text-gray bg-neutral-100 border-gainsboro px-4 py-2.5 rounded-t border-b-gainsboro border-b border-solid">Series</div>
                            <div className="p-4">
                                <form>
                                    {/* If an element is taller than the element containing it, and it is floated, it will overflow outside of its container.
                                    Using clearfix "hack" to fix this problem */}
                                    <div className="mb-[15px] clearfix">
                                        <label className='relative px-4 pt-2 text-right lg:w-1/6 lg:float-left after:content-["_*_"] after:text-red'>Tiêu đề</label>
                                        <div className="float-left lg:w-2/3 px-4">
                                            <input 
                                                type="text"
                                                name="title"
                                                className="input input-info w-full h-input border border-solid border-silver"
                                                onChange={handleTitleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-[15px] clearfix">
                                        <label className='relative px-4 pt-2 text-right lg:w-1/6 lg:float-left'>Tên khác</label>
                                        <div className="float-left lg:w-2/3 px-4">
                                            <input 
                                                type="text"
                                                name="altname"
                                                className="input input-info w-full h-input border border-solid border-silver" 
                                                onChange={handleOthernameChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-[15px] clearfix">
                                        <label className='relative px-4 pt-2 text-right lg:w-1/6 lg:float-left font-bold'>Nội dung nhạy cảm</label>
                                        <div className="float-left lg:w-2/3 px-4">
                                            <input 
                                                type="checkbox" 
                                                name='is_mature' 
                                                value={1} 
                                                className='mt-[9px]'
                                                onChange={handleMatureChange}
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
                                                ref={novelCoverRef} 
                                                src={novel_banner} 
                                                className='hidden' 
                                                // onError={handleImageError}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-[15px] clearfix">
                                        <label className='relative px-4 pt-2 text-right lg:w-1/6 lg:float-left after:content-["_*_"] after:text-red'>Tác giả</label>
                                        <div className="float-left lg:w-2/3 px-4">
                                            <input 
                                                type="text"
                                                name="author"
                                                className="input input-info w-full h-input border border-solid border-silver"
                                                onChange={handleAuthorChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-[15px] clearfix">
                                        <label className='relative px-4 pt-2 text-right lg:w-1/6 lg:float-left'>Họa sĩ</label>
                                        <div className="float-left lg:w-2/3 px-4">
                                            <input 
                                                type="text"
                                                name="illustrator"
                                                className="input input-info w-full h-input border border-solid border-silver" 
                                                onChange={handleArtistChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-[15px] clearfix">
                                        <label className='relative px-4 pt-2 text-right lg:w-1/6 lg:float-left after:content-["_*_"] after:text-red'>Loại truyện</label>
                                        <div className="float-left lg:w-2/3 px-4">
                                            <select 
                                                name="type" 
                                                id="select-type" 
                                                defaultValue={1}
                                                className='select select-bordered w-44 text-base px-[10px] py-[5px] leading-normal border-black focus:outline-none focus:border-black'
                                                onChange={handleTypeChange}
                                            >
                                                <option value="1">Truyện dịch</option>
                                                <option value="2">Truyện convert</option>
                                                <option value="3">Truyện sáng tác</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mb-[15px] clearfix">
                                        <label className='relative px-4 pt-2 text-right lg:w-1/6 lg:float-left after:content-["_*_"] after:text-red'>Thể loại</label>
                                        <div className="lg:float-left lg:w-5/6 px-4">
                                            <Select
                                                isMulti
                                                options={novelCategoriesOptions}
                                                placeholder=""
                                                className='border border-solid rounded-md border-silver z-20'
                                                onChange={handleCategoriesChange}
                                            />
                                        </div> 
                                    </div>
                                    <div className="mb-[15px] clearfix">
                                        <label className='relative px-4 pt-2 text-right lg:w-1/6 lg:float-left after:content-["_*_"] after:text-red'>Tóm tắt</label>
                                        <div id='textEditor' className="float-left lg:w-5/6 px-4">
                                            <Editor
                                                apiKey = {import.meta.env.VITE_TINYMCE_API_KEY}
                                                init={{
                                                    plugins: 'anchor autolink charmap emoticons image link lists media searchreplace visualblocks wordcount linkchecker fullscreen',
                                                    toolbar: 'undo redo |  bold italic underline strikethrough | link image | addcomment showcomments | fullscreen | a11ycheck typography |  align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat |',
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
                                                        editor.getContent()
                                                    }
                                                }}
                                                onEditorChange={handleDescriptionChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-[15px] clearfix">
                                        <label className='relative px-4 pt-2 text-right lg:w-1/6 lg:float-left'>Chú thích thêm</label>
                                        <div id='textEditor' className="float-left lg:w-5/6 px-4">
                                            <Editor
                                                apiKey = {import.meta.env.VITE_TINYMCE_API_KEY}
                                                init={{
                                                    plugins: 'anchor autolink charmap emoticons image link lists media searchreplace visualblocks wordcount linkchecker fullscreen',
                                                    toolbar: 'undo redo |  bold italic underline strikethrough | link image | addcomment showcomments | fullscreen | a11ycheck typography |  align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat |',
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
                                                onEditorChange={handleNoteChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-[15px] clearfix">
                                        <label className='relative px-4 pt-2 text-right lg:w-1/6 lg:float-left after:content-["_*_"] after:text-red'>Tình trạng dịch</label>
                                        <div className="float-left lg:w-2/3 px-4">
                                            <select 
                                                name="type" 
                                                id="select-type" 
                                                defaultValue={1}
                                                className='select select-bordered w-44 text-base px-[10px] py-[5px] leading-normal border-black focus:outline-none focus:border-black'
                                                onChange={handleStatusChange}
                                            >
                                                <option value="1">Đang tiến hành</option>
                                                <option value="2">Tạm ngưng</option>
                                                <option value="3">Đã hoàn thành</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mb-[15px] clearfix">
                                        <div className="float-left lg:ml-1/6 lg:w-5/6 px-4">
                                            <button 
                                                type='button' // Default type of button is submit
                                                className='btn btn-confirm text-white text-base'
                                                onClick={handlePublishEvent}
                                            >
                                                Thêm truyện
                                            </button>
                                            <button 
                                                type='button'
                                                className='btn btn-accent text-white text-base ml-4'
                                                // onClick={handleSaveDraft}
                                            >
                                                Lưu nháp
                                            </button>
                                            <button type='button' onClick={handleGoBack} className='btn btn-warning text-base text-white ml-4'>Quay lại</button>
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

export default NovelEditor