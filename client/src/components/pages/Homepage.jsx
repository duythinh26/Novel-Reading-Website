import React, { useEffect, useState } from 'react';
import axios from "axios";
import TrendingNovel from '../common/TrendingNovel';

const Homepage = () => {
    return (
        <main className="w-full pt-nav pb-0">
            <TrendingNovel />
        </main>
    )
}

export default Homepage