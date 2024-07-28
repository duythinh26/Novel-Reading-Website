import React from 'react'

const NovelArticle = (content, publisher) => {

    let {novel_id, 
        novel_title, 
        novel_banner, 
        author,
        aritst,
        categories,
        description,
        publishedAt,
        updatedAt,
        activity
    } = content;

    let {
        username,
        profile_img
    } = publisher;

    return (
        // <article className="clear-left mx-0 my-[10px] list-item list-none flex-[0_0_100%] max-w-full lg:flex-[0_0_50%] lg:max-w-[50%] relative w-full px-[15px]">
            <div className="flex flex-wrap ml-[-15px] mr-[-15px]">
                <div className="relative w-full px-[15px] flex-[0_0_33.33333333%] max-w-[33.33333333%] md:flex-[0_0_25%] md:max-w-[25%] lg:flex-[0_0_33.33333333%] lg:max-w-[33.33333333%]">
                    <div>
                        <a href="#">
                            <div className="relative before:content-[''] before:block before:w-full before:pt-[143.3333333333%]">
                                <div className="absolute inset-0 cover-background" style={{'backgroundImage': `url(${content.content.novel_banner})`}}></div>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="relative w-full px-[15px] flex-[0_0_66.66666667%] max-w-[66.66666667%] md:flex-[0_0_75%] md:max-w-[75%]lg:flex-[0_0_66.66666667%] lg:max-w-[66.66666667%]">
                    <div>
                        <h4 className="font-bold mb-[10px] overflow-hidden text-ellipsis whitespace-nowrap ">
                            <a href={`/novel/${content.content.novel_id}`} className="hover:text-green hover:outline-0 text-2xl no-underline">{content.content.novel_title}</a>
                        </h4>
                        <div 
                            className="text-breakword line-clamp-4 mb-[10px]"
                            dangerouslySetInnerHTML={{ __html: content.content.description }}></div>
                    </div>
                </div>
            </div>
        // </article>
    )
}

export default NovelArticle;