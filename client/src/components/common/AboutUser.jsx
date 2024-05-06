import React from 'react'
import { getFullDate } from './date'

const AboutUser = ({ bio, joinedAt }) => {
    return (
        <main className="p-[10px]">
            <div className="mb-[20px]">{bio}</div>
            <div className="pb-0">
                <span className="text-lightblack">Tham gia: </span>
                <span id="info-value">{getFullDate(joinedAt)}</span>
            </div>
        </main>
    )
}

export default AboutUser