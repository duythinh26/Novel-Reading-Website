import React, { useContext, useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import novelCategoriesOptions from './novelCategoriesOptions';
import { Editor } from '@tinymce/tinymce-react';
import { useNavigate, useParams } from 'react-router-dom';
import { novelStructure } from './novelStructure';
import axios from 'axios';
import { UserContext } from '../../App';
import { Toaster, toast } from 'react-hot-toast';
import { uploadImage } from './aws';

const ManageNovel = () => {

    let { novel_id } = useParams();

    let [ novel, setNovel ] = useState(novelStructure);
    const [ novelSubMenu, setNovelSubMenu ] = useState(false);

    let { userAuth: { access_token } } = useContext(UserContext);

    var novelCoverRef = useRef();
    let navigate = useNavigate();

    // Destructure data to avoid using novel.novel for all attributes
    let {
        artist,
        author,
        categories,
        comments,
        description,
        episode,
        note,
        novel_banner,
        novel_title,
        other_name,
        permission,
        publishedAt,
        publisher: {
            personal_info: { username: publisher_username, profile_img }
        },
        sensitive_content,
        status,
        type_of_novel,
        updatedAt
    } = novel;

    const fetchNovel = () => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-novels", { novel_id })
        .then( async ({ data: { novel } }) => {
            
            setNovel(novel);
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        resetStates();

        fetchNovel();
    }, [])

    const resetStates = () => {
        setNovel(novelStructure);
        // setLikedByUSer(false);
        // setTotalParentCommentsLoaded(0);
    }

    const handleTitleChange = (e) => {
        setNovel({ ...novel, novel_title: e.target.value });
    }

    const handleOthernameChange = (e) => {
        setNovel({ ...novel, other_name: e.target.value });
        console.log(e.target.value)
    }

    const handleMatureChange = (e) => {
        setNovel({ ...novel, sensitive_content: e.target.checked })
    }

    const handleAuthorChange = (e) => {
        setNovel({ ...novel, author: e.target.value })
    }

    const handleArtistChange = (e) => {
        setNovel({ ...novel, artist: e.target.value })
    }

    const handleTypeChange = (e) => {
        setNovel({ ...novel, type_of_novel: e.target.value });
    }

    const handleCategoriesChange = (e) => {
        setNovel({ ...novel, categories: e.map(option => option.label)});
    }

    const handleDescriptionChange = (value, editor) => {
        setNovel({ ...novel, description: editor.getContent() })
    }

    const handleNoteChange = (value, editor) => {
        setNovel({ ...novel, note: editor.getContent() })
    }

    const handleStatusChange = (e) => {
        setNovel({ ...novel, status: e.target.value });
    }

    const handleBannerUpload = async (e) => {
        let img = e.target.files[0];

        if (img) {
            let loadingToast = toast.loading("Bạn chờ tí nhé ...");

            await uploadImage(img).then((url) => {
                if (url) {
                    toast.dismiss(loadingToast);
                    toast.success("Đã đăng ảnh thành công!");

                    // Cập nhật className để hiển thị ảnh
                    novelCoverRef.current.className = "block max-w-[100px] max-h-[100px] w-auto h-auto z-20";

                    // Set novel banner to state
                    setNovel({ ...novel, novel_banner: url });
                }
            })
            .catch(err => {
                toast.dismiss(loadingToast);
                toast.error(err.message || 'Có lỗi xảy ra khi đăng ảnh');
            });
        }
    }

    const handleSaveEvent = async (e) => {

        let novelObject = {
            novel_id,
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

        axios.put(import.meta.env.VITE_SERVER_DOMAIN + "/update-novel", novelObject, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
        .then(() => {
            // After 500 miliseconds, navigate user to homepage
            setTimeout(() => {
                navigate("/action")
            }, 500);
        })
        .catch(( { response} ) => {
            return toast.error(response.data.error);
        })
    }

    const handleSubMenu = () => {
        setNovelSubMenu(currentValue => !currentValue)
    }

    return (
        <>
            <Toaster />
            <div className="container mx-auto px-[15px]"> 
                <div className="row">
                    <div className="lg:ml-[8.33333333%] lg:w-5/6 lg:float-left relative min-h-[1px] px-[15px]">
                        <div className="border-[#dddddd] bg-white border rounded shadow-[0_1px_1px_rgba(0,0,0,0.05)] mb-5 border-solid">
                            <div className="flex items-center justify-between text-[#333333] bg-neutral-100 px-[15px] py-[10px] rounded-t-[3px] border-b-transparent border-[#dddddd] border-b border-solid">
                                <span>Series</span>
                                <button onClick={handleSubMenu} className="bg-blue-500 cursor-pointer border-[none] bg-blue-500 rounded">
                                    <i className="fi fi-rr-menu-burger"></i>
                                </button>
                                {
                                    novelSubMenu ?
                                    <div class="right-4 top-11 absolute bg-white border border-[#dddddd] rounded shadow-md">
                                        <a href={`/action/series/${novel_id}/episode-list`}class="block px-4 py-2 hover:bg-gray-100">Danh sách tập</a>
                                        <a href={`/action/series/${novel_id}/episode`} class="block px-4 py-2 hover:bg-gray-100">Thêm tập</a>
                                    </div> : ""
                                }
                            </div>
                            <div className="p-[15px]">
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
                                                value={novel_title}
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
                                                value={other_name}
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
                                                src={novel.novel_banner} 
                                                className='block max-w-[100px] max-h-[100px] w-auto h-auto z-20' 
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
                                                value={author}
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
                                                value={artist}
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
                                                value={type_of_novel}
                                                className='select select-bordered w-44 text-base px-[10px] py-[5px] leading-normal border-black focus:outline-none focus:border-black'
                                                onChange={handleTypeChange}
                                            >
                                                <option value="Truyện dịch">Truyện dịch</option>
                                                <option value="Truyện convert">Truyện convert</option>
                                                <option value="Truyện sáng tác">Truyện sáng tác</option>
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
                                                value={categories}
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
                                                value={description}
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
                                                value={note}
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
                                                value={status}
                                                className='select select-bordered w-44 text-base px-[10px] py-[5px] leading-normal border-black focus:outline-none focus:border-black'
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
                                                type='button' // Default type of button is submit
                                                className='btn btn-confirm text-white text-base'
                                                onClick={handleSaveEvent}
                                            >
                                                Cập nhật
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

export default ManageNovel;