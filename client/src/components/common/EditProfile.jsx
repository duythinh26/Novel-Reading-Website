import React, { useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '../../App'
import axios from 'axios';
import { profileDataStructure } from '../pages/ProfilePage';
import { Toaster, toast } from 'react-hot-toast';
import { Editor } from '@tinymce/tinymce-react';
import { uploadImage } from './aws';
import { storeInSession } from './Session';

const EditProfile = () => {

    let { userAuth, userAuth: { access_token }, setUserAuth } = useContext(UserContext);

    const [ profile, setProfile ] = useState(profileDataStructure);
    const [ loading, setLoading ] = useState(true);
    const [ updateProfileImg, setUpdateProfileImg ] = useState(null);
    const [ content, setContent ] = useState("");

    let { personal_info: { username: profile_username, profile_img, email, bio } } = profile;

    const fileInputRef = useRef(null);
    const editorRef = useRef(null);
    const profileImgRef = useRef();
    const editProfileRef = useRef();

    const handleUploadClick = () => {
        fileInputRef.current.click();
    }

    const handleImagePreview = (e) => {

        let img = e.target.files[0];

        profileImgRef.current.src = URL.createObjectURL(img);

        setUpdateProfileImg(img);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (updateProfileImg) {

            // Nếu bạn muốn thực hiện uploadImage khi updateProfileImg thay đổi
            uploadImage(updateProfileImg)
            .then(url => {
                if (url) {
                    axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/update-profile-img", { url }, {
                        headers: {
                            'Authorization': `Bearer ${access_token}`
                        }
                    })
                    .then(({ data }) => {
                        let newUserAuth = { ...userAuth, profile_img: data.profile_img }

                        storeInSession("user", JSON.stringify(newUserAuth));
                        setUserAuth(newUserAuth);

                        setUpdateProfileImg(null);
                    })
                    .catch(({ response }) => {
                        toast.error(response.data.error)
                    })
                }
            })
            .catch(err => {
                console.log(err);
            });
        }

    }

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     let form = new FormData(editProfileRef.current);
    //     let formData = { };

    //     for (let [key, value] of form.entries()) {
    //         formData[key] = value;
    //     }

    //     console.log(formData);
    // }

    // Make request to server to get user data
    useEffect(() => {

        if (access_token) {
            axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/users", { username: userAuth.username })
            .then(({ data }) => {
                setProfile(data.user);
                setLoading(false);
            })
            .catch(err => {
                console.log(err)
            })
        }

    }, [access_token])

    return (
        <>
            {
                loading ? "" :
                <div className="container mx-auto px-[15px]">
                    <div className="row">
                        <div className="lg:ml-[8.33333333%] lg:w-[83.33333333%] ld:float-left relative min-h-[1px] px-[15px]">
                            <div className="border-[#dddddd] bg-white border rounded shadow-[0_1px_1px_rgba(0,0,0,0.05)] mb-5 border-solid">
                                <div className="text-[#333333] bg-neutral-100 border-[#dddddd] px-[15px] py-[10px] rounded-t-[3px] border-b border-solid">Hồ sơ</div>
                                <div className='p-[15px] before:content-["_"] before:table after:content-["_"] after:table after:clear-both'>
                                    <form method="POST" role='form' ref={editProfileRef}>
                                        <Toaster />
                                        <div className="mb-[15px] clearfix">
                                            <label className='pt-2 lg:w-[16.66666667%] lg:float-left text-right relative min-h-[1px] px-[15px]'>Tên</label>
                                            <div className="lg:w-2/3 lg:float-left relative min-h-[1px] px-[15px]">
                                                <input type="text" className='form-input' name='name' value={profile_username} disabled={true}/>
                                            </div>
                                        </div>
                                        <div className="mb-[15px] clearfix">
                                            <label className='pt-2 lg:w-[16.66666667%] lg:float-left text-right relative min-h-[1px] px-[15px]'>Email</label>
                                            <div className="lg:w-2/3 lg:float-left relative min-h-[1px] px-[15px]">
                                                <input type="text" className='form-input' name='email' value={email} disabled={true}/>
                                            </div>
                                        </div>
                                        <div className="mb-[15px] clearfix">
                                            <label 
                                                className='pt-2 lg:w-[16.66666667%] lg:float-left text-right relative min-h-[1px] px-[15px]'
                                                htmlFor='uploadImg'
                                            >
                                                Ảnh đại diện
                                            </label>
                                            <div className="lg:w-2/3 lg:float-left relative min-h-[1px] px-[15px]">
                                                <div className="w-full">
                                                    <div className="uppercase text-base font-[bold] text-[#7f858a] inline-block mb-[15px]">
                                                        <a 
                                                            className='bg-[#007a96] text-white text-base cursor-pointer inline-block leading-none mt-[12px] px-[26px] py-[12px] rounded-sm hover:bg-[#0986a3] hover:no-underline'
                                                            onClick={handleUploadClick}
                                                        >
                                                            Tải ảnh lên
                                                        </a>
                                                        <input 
                                                            type="file" 
                                                            name="image" 
                                                            accept=".jpeg .png .jpg"
                                                            ref={fileInputRef}
                                                            hidden
                                                            onChange={handleImagePreview}
                                                        />
                                                    </div>
                                                    <img 
                                                        src={profile_img} 
                                                        ref={profileImgRef} 
                                                        className='max-h-[200px] max-w-[200px] align-middle border-0'
                                                    />
                                                    {/* <button 
                                                        className='bg-[#007a96] text-white text-base cursor-pointer inline-block leading-none mt-[12px] px-[26px] py-[12px] rounded-sm hover:bg-[#0986a3] hover:no-underline'
                                                        onClick={handleImageUpload}
                                                    >
                                                        Đăng ảnh
                                                    </button> */}
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="mb-[15px] clearfix">
                                            <label className='pt-2 lg:w-[16.66666667%] lg:float-left text-right relative min-h-[1px] px-[15px]'>Giới thiệu bản thân</label>
                                            <div className="lg:w-2/3 lg:float-left relative min-h-[1px] px-[15px]">
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
                                                    onEditorChange={(value, editor) => setContent(editor.getContent({ format: 'text' }))}
                                                />
                                            </div>
                                        </div> */}
                                        <div className="mb-[15px] lg:ml-[16.66666667%] lg:w-10/12 lg:float-left relative min-h-[1px] px-[15px]">
                                            <button 
                                                type='submit' 
                                                className='btn btn-confirm text-white text-base'
                                                onClick={handleSubmit}
                                            >
                                                Cập nhật
                                            </button>
                                            <a href="javascript: history.back()" className="btn btn-warning text-base text-white ml-4">Quay lại</a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default EditProfile;