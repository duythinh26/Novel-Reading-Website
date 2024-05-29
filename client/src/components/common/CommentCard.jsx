import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import TimeDifference from './TimeDifference';
import CommentField from './CommentField';
import { NovelContext } from '../pages/NovelPage';
import axios from 'axios';

const CommentCard = ({ index, leftValue, commentData }) => {

    let {
        _id,
        comment,
        commented_by: {
            personal_info: {
                profile_img,
                username: commented_by_username
            }
        },
        children,
        novel_publisher,
        commentedAt
    } = commentData;

    let { novel, novel: { comments, activity, activity: { total_parent_comments }, comments : { results: commentsArr }, publisher: { personal_info: { username: publisher }}}, setNovel, setTotalParentCommentsLoaded } = useContext(NovelContext)
    
    let { userAuth: { access_token, username }, setUserAuth } = useContext(UserContext);
    
    const [ isReply, setReply ] = useState(false);
    const [ isDisabled, setDisabled ] = useState(false);

    const getParentIndex = () => {
        let startingPoint = index - 1;

        try {
            while (commentsArr[startingPoint].childrenLevel >= commentData.childrenLevel) {
                startingPoint--
            }
        } catch {
            startingPoint = undefined;
        }

        return startingPoint;
    }

    const removeCommentsCards = (startingPoint, isDelete = false) => {
        if (commentsArr[startingPoint]) {
            while(commentsArr[startingPoint].childrenLevel > commentData.childrenLevel) {
                commentsArr.splice(startingPoint, 1)

                if (!commentsArr[startingPoint]) {
                    break
                }
            }
        }

        if (isDelete) {
            let parentIndex = getParentIndex();

            if (parentIndex != undefined) {
                commentsArr[parentIndex].children = commentsArr[parentIndex].children.filter(child => {
                    child != _id
                })

                if (commentsArr[parentIndex].children.length) {
                    commentsArr[parentIndex].isReplyLoaded = false;
                }
            }

            commentsArr.splice(index, 1)
        }

        if (commentData.childrenLevel == 0 && isDelete) {
            setTotalParentCommentsLoaded(preVal => preVal - 1)
        }

        setNovel({ ...novel, comments: { results: commentsArr }, activity: { ...activity, total_parent_comments: total_parent_comments - (commentData.childrenLevel == 0 && isDelete ? 1 : 0 )} })
    }

    const handleReplyText = () => {
        setReply(preVal => !preVal);
    }

    const hideReply = () => {
        commentData.isReplyLoaded = false;
        removeCommentsCards(index + 1)
    }

    const loadReply = ({ skip = 0 }) => {
        if (children.length) {

            hideReply();

            axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-replies", { _id, skip })
            .then(({ data: { replies }}) => {
                commentData.isReplyLoaded = true;

                for( let i = 0; i < replies.length; i++ ) {
                    replies[i].childrenLevel = commentData.childrenLevel + 1;

                    commentsArr.splice(index + 1 + i + skip, 0, replies[i])
                }

                setNovel({ ...novel, comments: { ...comments, results: commentsArr }})
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    const deleteComment = (e) => {
        setDisabled(true);

        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/delete-comment", { _id }, {
            headers: { // Send the headers when we have to verify user using verifyJWT in serverm n        
                'Authorization': `Bearer ${access_token}`
            }
        })
        .then(() => {
            setDisabled(false);

            removeCommentsCards(index + 1, true)
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div className="relative !mt-[12px] clear" style={{ marginLeft: `${leftValue}px`}}>
            <div className="flex gap-1 max-w-full">
                <div className="w-[50px]">
                    <div className="!mx-1 !my-1">
                        <img src={profile_img} className="rounded-full w-10 h-10 "/>
                    </div>
                </div>
                <div className="w-full min-w-0 rounded-md bg-lightgrey !pt-0 !pb-1 pe-0 ps-1 dark:!bg-zinc">
                    <div className="flex flex-col min-w-0 !px-2">
                        <div className="flex align-top justify-between">
                            <div className="flex flex-wrap gap-x-2 gap-y-1 align-middle pt-[4px]">
                                <div className="self-center h-8">
                                    <a 
                                        href={`/user/${commented_by_username}`}
                                        className="md:leading-7 leading-6 font-bold hover:text-green hover:outline-0 hover:no-underline"
                                    >
                                        {commented_by_username}
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="max-h-[90px] overflow-y-hidden mb-[10px] text-breakword">{comment}</div>
                        <div className="flex gap-2 !align-bottom text-[13px]">
                            <a className="text-slate-500 cursor-pointer hover:text-[#10b18e] hover:outline-0 hover:no-underline">
                                <TimeDifference valueDateTime={commentedAt} className="text-[12px]"/>
                            </a>
                            {
                                access_token ?
                                <a 
                                    className="self-center cursor-pointer inline-block leading-[15px] opacity-100 mr-[10px] border-b-0 border-b-[#111] border-solid hover:text-inherit hover:border-b"
                                    onClick={handleReplyText}
                                >
                                    <span className="font-semibold text-[13px]">Trả lời</span>
                                </a>
                                : <></>
                            }
                            {
                                commentData.isReplyLoaded ?
                                <a 
                                    className="self-center cursor-pointer inline-block leading-[15px] opacity-100 mr-[10px] border-b-0 border-b-[#111] border-solid hover:text-inherit hover:border-b"
                                    onClick={hideReply}
                                >
                                    <span className="font-semibold text-[13px]">Ẩn bình luận</span>
                                </a>
                                : 
                                <a 
                                    className="self-center cursor-pointer inline-block leading-[15px] opacity-100 mr-[10px] border-b-0 border-b-[#111] border-solid hover:text-inherit hover:border-b"
                                    onClick={loadReply}
                                >
                                    <span className="font-semibold text-[13px]">{children.length} bình luận</span>
                                </a>
                            }
                            {
                                username == commented_by_username || username == publisher ? 
                                <button 
                                    className="self-center cursor-pointer inline-block leading-[15px] opacity-100 mr-[10px] border-b-0 border-b-[#111] border-solid hover:text-inherit hover:border-b ml-auto"
                                    onClick={deleteComment}
                                    disabled={isDisabled}
                                >
                                    <span className="font-semibold text-[13px]">Xóa bình luận</span>
                                </button>
                                : ""
                            }
                        </div>
                    </div>
                </div>
            </div>
            {
                isReply ? 
                <div className="ml-[50px]">
                    <CommentField action="reply" index={index} replyingTo={_id} setReply={setReply}/>
                </div>
                : ""
            }
        </div>
    )
}

export default CommentCard;