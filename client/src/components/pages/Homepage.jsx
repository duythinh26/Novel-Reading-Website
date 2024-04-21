import React, { useEffect, useState } from 'react';
import axios from "axios";
import TrendingNovel from '../common/TrendingNovel';
import Discussion from '../common/Discussion';

const Homepage = () => {
    return (
        <main className="w-full pt-nav pb-0">
            <div className="container w-full mx-auto px-[15px] mb-[40px]">
                <div className="flex flex-wrap mx-[-15px]">
                    <TrendingNovel />
                    <Discussion />
                </div>
            </div>
            <div className="text-center mt-0 mb-[10px] mx-auto"></div>
        </main>
    )
}

export default Homepage