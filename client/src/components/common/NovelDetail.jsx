import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import novelCategoriesOptions from './novelCategoriesOptions';
import { Editor } from '@tinymce/tinymce-react';
import { useParams } from 'react-router-dom';

const NovelDetail = () => {

    let { novel_id } = useParams();

    console.log(novel_id)

    return (
            <div className="lg:w-[970px] md:w-[750px] mx-auto px-[15px]">
                <div className="row">
                    <div className="lg:ml-[8.33333333%] lg:w-5/6 lg:float-left relative min-h-[1px] px-[15px]">
                        <div className="border-[#dddddd] bg-white border rounded shadow-[0_1px_1px_rgba(0,0,0,0.05)] mb-5 border-solid">
                            <div className="text-[#333333] bg-neutral-100 px-[15px] py-[10px] rounded-t-[3px] border-b-transparent border-[#dddddd] border-b border-solid">Series</div>
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
                                                // onChange={handleTitleChange}
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
                                                // onChange={handleOthernameChange}
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
                                                // onChange={handleMatureChange}
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
                                                            // onChange={handleBannerUpload}
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                            <img 
                                                // ref={novelCoverRef} 
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
                                                // onChange={handleAuthorChange}
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
                                                // onChange={handleArtistChange}
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
                                                // onChange={handleTypeChange}
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
                                                // onChange={handleCategoriesChange}
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
                                                // onEditorChange={handleDescriptionChange}
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
                                                // onEditorChange={handleNoteChange}
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
                                                // onChange={handleStatusChange}
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
                                                // onClick={handlePublishEvent}
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
                                            <a href="javascript: history.back()" className='btn btn-warning text-base text-white ml-4'>Quay lại</a>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default NovelDetail