import React from 'react'

const NovelSmallCard = (novel, publisher) => {

    let {novel_id: id, 
        novel_title: title, 
        novel_banner: banner, 
        author,
        aritst,
        categories,
        description,
        publishedAt,
        updatedAt,
        activity
    } = novel;

    let {
        username,
        profile_img
    } = publisher;

    return (
        // <div className="relative w-full px-[15px] my-[10px] flex-[0_0_33.33333333%] max-w-[33.33333333%] md:flex-[0_0_25%] md:max-w-[25%] lg:flex-[0_0_16.66666667%] lg:max-w-[16.66666667%]">
        <>
            <div className="text-white relative">
                <a href={`/novel/${novel.content.novel_id}`} title={novel.content.novel_title}>
                    <div className="overflow-hidden relative w-full before:content-[''] before:block before:w-full before:pt-[143.3333333333%]">
                        <div className="absolute inset-0 cover-background" style={{'backgroundImage': `url(${novel.content.novel_banner})`}}></div>
                    </div>
                </a>
                <div className="cover-detail absolute left-0 bottom-0 w-full p-[10px] overflow-hidden">
                    <div 
                        className="overflow-hidden text-ellipsis whitespace-nowrap font-bold"
                        title={novel.content.novel_title}
                    >
                        <a 
                            href={`/novel/${novel.content.novel_id}`}
                            title={novel.content.novel_title}
                            className="hover:text-green hover:outline-0 hover:no-underline"
                        >
                            {novel.content.novel_title}
                        </a>
                    </div>
                    <div className="text-[#4ebef7] overflow-hidden text-ellipsis whitespace-nowrap leading-4">{novel.content.novel_title}</div>
                </div>
            </div>
            <div className="text-base font-bold h-[2.625rem] leading-5 overflow-hidden text-center mt-[6px] mb-[4px]">
                <a 
                    href={`/novel/${novel.content.novel_id}`}
                    title={novel.content.novel_title}
                    className="hover:text-green hover:outline-0 hover:no-underline"
                >
                    {novel.content.novel_title}
                </a>
            </div>
        </>
        // </div>
    )
}

export default NovelSmallCard;