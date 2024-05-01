import React from 'react'

const NoDataMessage = ({ message }) => {
    return (
        <div className="flex-[0_0_100%] max-w-full relative w-full px-[15px]">
            <article className="clear">
                {message}
            </article>
        </div>
    )
}

export default NoDataMessage