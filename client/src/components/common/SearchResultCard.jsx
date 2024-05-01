import React from 'react'

const SearchResultCard = (novel, publisher) => {

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
    } = novel;

    let {
        username,
        profile_img
    } = publisher;

    return (
        <>
            <div className="text-white relative">
                <a 
                    href={`/novel/${novel.novel.novel_id}`} 
                    title={novel.novel.novel_title}
                >
                    <div className="a6-ratio">
                        <div className="absolute inset-0 cover-background" style={{'backgroundImage': `url(${novel.novel.novel_banner})`}}></div>
                    </div>
                </a>
                <div className="cover-detail absolute left-0 bottom-0 w-full p-[10px] overflow-hidden">
                    <div 
                        className="font-bold overflow-hidden text-ellipsis whitespace-nowrap"
                        title={novel.novel.novel_title}
                    >
                        <a 
                            href={`/novel/${novel.novel.novel_id}`}
                            title={novel.novel.novel_title}
                            className="hover:text-green hover:outline-0 hover:no-underline"
                        >
                            {novel.novel.novel_title}
                        </a>
                    </div>
                    <div className="text-[#17deb3] overflow-hidden text-ellipsis whitespace-nowrap text-[13px] leading-4">{novel.novel.novel_title}</div>
                </div>
            </div>
            <div className="text-base font-bold h-[2.625rem] leading-5 overflow-hidden text-center mt-[6px] mb-[4px]">
                <a 
                    href={`/novel/${novel.novel.novel_id}`}
                    title={novel.novel.novel_title}
                    className="hover:text-green hover:outline-0 hover:no-underline"
                >
                    {novel.novel.novel_title}
                </a>
            </div>
        </>
    )
}

export default SearchResultCard