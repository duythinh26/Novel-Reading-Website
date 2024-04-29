import React from 'react'

const NovelBigCard = (content, publisher) => {

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
        <div className="text-white relative w-full">
            <a 
                href={`/novel/${content.content.novel_id}`} 
                title={content.content.novel_title} 
                className="inline-block w-full h-banner"
            >
                <div className="overflow-hidden relative w-full before:content-[''] before:block before:w-full before:pt-[143.3333333333%]">
                    <div className="absolute inset-0 cover-background" style={{'backgroundImage': `url(${content.content.novel_banner})`}}>
                    </div>
                </div>
            </a>
            <div className="cover-detail absolute left-0 bottom-0 w-full p-[10px] overflow-hidden">
                <div
                    className="text-xl font-bold h-11 leading-[1.375rem] mb-1 mt-1.5 text-center overflow-hidden"
                    title={content.content.novel_title}
                >
                    <a
                        href={`/novel/${content.content.novel_id}`}
                        title={content.content.novel_title}
                        className="text-xl hover:text-green hover:outline-0 hover:no-underline"
                    >
                        {content.content.novel_title}
                    </a>
                </div>
            </div>
        </div>
    )
}

export default NovelBigCard