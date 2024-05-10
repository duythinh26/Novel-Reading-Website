import React, { useEffect, useState } from 'react';

const TimeDifference = ({ valueDateTime, className }) => {

    const [timeDifference, setTimeDifference] = useState('');

    useEffect(() => {
        const calculateTimeDifference = () => {
            const storedDate = new Date(valueDateTime);
            const currentDate = new Date();
            const difference = currentDate - storedDate;
            const seconds = Math.floor(difference / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);
            const months = Math.floor(days / 30);
            const years = Math.floor(days / 365);

            if (years > 0) {
                setTimeDifference(`${years} giờ`);
            } else if (months > 0) {
                setTimeDifference(`${months} tháng`);
            } else if (days > 0) {
                setTimeDifference(`${days} ngày`);
            } else if (hours > 0) {
                setTimeDifference(`${hours} giờ`);
            } else if (minutes > 0) {
                setTimeDifference(`${minutes} phút`);
            } else {
                setTimeDifference(`${seconds} giây`);
            }
        };

        calculateTimeDifference();
    }, [valueDateTime]);

    return (
        <time 
            dateTime={valueDateTime} 
            className={className}
        >
            {timeDifference}
        </time>
    )
}

export default TimeDifference;