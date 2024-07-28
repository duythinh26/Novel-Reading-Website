import React, { useContext} from 'react'
import { NovelContext } from '../pages/NovelPage';
import { UserContext } from '../../App';
import axios from 'axios';
import NoDataMessage from './NoDataMessage';
import CommentCard from './CommentCard';
import CommentField from './CommentField';

export const fetchComments = async ({ skip = 0, novel_id, setParentCommentCountFun, comment_array = null }) => {

    let res;

    await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-novel-comments", { novel_id, skip })
    .then(({ data }) => {
        data.map(comment => {
            comment.childrenLevel = 0;
        })

        setParentCommentCountFun(preVal => preVal + data.length)

        if (comment_array == null) {
            res = { results: data }
        } else {
           res = { results: [ ...comment_array, ...data ] }
        }
    })
    .catch(err => {
        console.log(err);
    })

    return res;
}

const CommentsContainer = () => {

    let { novel, novel: { _id, novel_id, publisher: { _id: novel_publisher }, comments, comments: { results :  commentsArr }, activity, activity: { total_comments, total_parent_comments } }, setNovel, totalParentCommentsLoaded, setTotalParentCommentsLoaded } = useContext(NovelContext);
    let { userAuth: { access_token, username, profile_img }, setUserAuth } = useContext(UserContext);

    const loadMoreComments = async () => {
        let newCommentsArr = await fetchComments({ skip: totalParentCommentsLoaded, novel_id: _id, setParentCommentCountFun: setTotalParentCommentsLoaded, comment_array: commentsArr })

        setNovel({ ...novel, comments: newCommentsArr })
    }

    return (
        <>
            <section id="series-comments" className="block mb-[20px] basic-section">
                <header className="font-bold bg-[#f4f5f6] p-2.5 border-b-[#dadbdd] border-b border-solid">
                    <span className="section-title inline-block ml-0 pr-0 text-[18px] leading-[26px]">
                        Tổng bình luận ({total_comments})
                        <span></span>
                    </span>
                </header>
                <main className="p-0 !block clear">
                    <span className="p-[10px] inline-block">
                        Báo cáo bình luận không phù hợp ở <a href="#" className="text-[blue]">đây</a>
                    </span>
                    <div className="clear">
                        <section className="block">
                            <header className="py-0 px-[10px]">
                                <h3 className="font-bold text-[18px] leading-[26px]"></h3>
                            </header>
                            <main className="rounded p-[10px] block">
                                {
                                    access_token ?
                                    <CommentField action="comment"/>
                                    : 
                                    <div>
                                        Bạn phải <a href="/signin" className="text-[#0095df] cursor-pointer">
                                            đăng nhập
                                        </a> hoặc <a href="/signup" className='text-[#0095df] cursor-pointer'>
                                            tạo tài khoản</a> để bình luận
                                    </div>
                                }
                                {
                                    commentsArr && commentsArr.length ?
                                    commentsArr.map((comment, i) => {
                                        return <div key={i}>
                                        <CommentCard index={i} leftValue={comment.childrenLevel * 50} commentData={comment}/>
                                    </div>
                                    })
                                    : <NoDataMessage message="Chưa có comment nào cho bộ truyện này hết"/>
                                }
                                {
                                    total_parent_comments > totalParentCommentsLoaded ?
                                    <div className="bg-white block p-[10px]">
                                        <div className="text-right" onClick={loadMoreComments}>
                                            <button 
                                                className="border inline-block font-bold text-center normal-case transition-[0.25s] w-full px-5 py-2.5 rounded-[30px] border-solid border-[#111] hover:bg-[#111] hover:text-white"
                                            >
                                                Xem thêm
                                            </button>
                                        </div>
                                    </div>
                                    : ""
                                }
                            </main>
                        </section>
                    </div>
                </main>
            </section>
        </>
    )
}

export default CommentsContainer;