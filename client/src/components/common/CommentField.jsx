import React, { useContext, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { NovelContext } from '../pages/NovelPage';
import { UserContext } from '../../App';

const CommentField = ({ action, index = undefined, replyingTo = undefined, setReply }) => {

    let { novel, novel: { _id, novel_id, publisher: { _id: novel_publisher }, comments, comments: { results :  commentsArr }, activity, activity: { total_comments, total_parent_comments } }, setNovel, totalParentCommentsLoaded, setTotalParentCommentsLoaded } = useContext(NovelContext);
    let { userAuth: { access_token, username, profile_img }, setUserAuth } = useContext(UserContext);
    
    const [ comment, setComment ] = useState("");
    const editorRef = React.useRef(null);

    const handleComment = () => {
    
        if (!comment.length) {
            return toast.error("Bạn chưa viết gì để bình luận");
        }
    
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/add-comment", {
            _id, novel_publisher, comment, replying_to: replyingTo
        }, {
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        })
        .then(({ data }) => {
            setComment("");

            if (editorRef.current) {
                editorRef.current.setContent(''); // Clear the editor content
            }

            data.commented_by = { personal_info: { username, profile_img } }
            
            let newCommentArr;

            if (replyingTo) {

                commentsArr[index].children.push(data._id);

                data.childrenLevel = commentsArr[index].childrenLevel + 1;
                data.parentIndex = index;

                commentsArr[index].isReplyLoaded = true;

                console.log(commentsArr[index].isReplyLoaded)

                // [1, 2, 3] => Reply comment 2 with comment 4 => [1, 2, 4, 3] (4 will created before 3 because it replied to comment 2)
                commentsArr.splice(index + 1, 0, data);

                newCommentArr = commentsArr; 

                setReply(false);

            } else {

                data.childrenLevel = 0;
        
                newCommentArr = [data, ...commentsArr];
            }

            
            let parentCommentIncrementVal = replyingTo ? 0 : 1;
    
            setNovel({
                ...novel,
                comments: { ...comments, results: newCommentArr },
                activity: {
                    ...activity,
                    total_comments: total_comments + 1,
                    total_parent_comments: total_parent_comments + parentCommentIncrementVal
                }
            });
    
            setTotalParentCommentsLoaded(prevVal => prevVal + parentCommentIncrementVal);
        })
        .catch(err => {
            console.log(err);
        });
    };

    return (
        <>
            <Toaster />
            <div className="mb-[20px] clear">
                <form>
                    <Editor
                        apiKey = {import.meta.env.VITE_TINYMCE_API_KEY}
                        onInit={(event, editor) => editorRef.current = editor}
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
                        onEditorChange={(value, editor) => setComment(editor.getContent({ format: 'text' }))}
                    />
                    <div className="bg-[rgba(196,234,226,0.412)] p-1.5 rounded-[0_0_4px_4px] border-t-0 clear">
                        <input 
                            type="button"
                            className="inline-block leading-[normal] transition-all duration-[0.3s] px-[20px] py-[6px] bg-[#36a189] rounded text-white float-right font-bold border-0 cursor-pointer hover:opacity-60"
                            onClick={handleComment}
                            value={action == "comment" ? "Đăng bình luận" : "Trả lời"}
                        />
                    </div>
                </form>
            </div>
        </>
    )
}

export default CommentField;