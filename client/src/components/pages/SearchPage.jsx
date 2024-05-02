import React, { useEffect, useState } from 'react'
import { useLocation} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { Toaster, toast } from "react-hot-toast";
import NoDataMessage from '../common/NoDataMessage';
import axios from 'axios';
import { filterPaginationData } from '../common/FilterPaginationData';
import SearchResultCard from '../common/SearchResultCard';
import PaginationFooter from '../common/PaginationFooter';

const SearchPage = () => {

    // Using useLocation to access the current location object
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const inititalQuery = queryParams.get('keywords') || "";

    const [ novel, setNovel ] = useState(null);
    const [ query, setQuery ] = useState(inititalQuery);
    const [ currentPage, setCurrentPage ] = useState(1);

    const searchNovels = ({  page = 1, create_new_arr = false }) => {

        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/search-novels", { query, page })
        .then( async ({ data }) => {

            if (query.length < 2) {
                return toast.error("Từ khóa phải có ít nhất 2 ký tự")
            }

            let formatedData = await filterPaginationData({
                state: novel,
                data: data.novels,
                page,
                countRoute: "/search-novels-count",
                data_to_send: { query },
                create_new_arr
            })

            setNovel(formatedData)
        }) 

    }
    
    const handleSearchValue = (e) => {
        setQuery(e.target.value)
    }

    // Update query state whenever the query parameter changes
    useEffect(() => {
        const updatedQuery = queryParams.get('keywords') || '';
        setQuery(updatedQuery);
    }, [location.search]); // Trigger effect when location.search changes

    useEffect(() => {
        searchNovels({ page: 1 });
    }, [])

    return (
        // <div className="pt-nav">Search result: {query}</div>
        <main className="min-h-[333px] w-full pt-nav pb-[30px]">
            <header className="mb-[20px]">
                <div>
                    <div className="container relative px-[15px] mx-auto">
                        <span className="font-bold text-[22px] leading-[30px]">
                            <FontAwesomeIcon icon={faCircle} className="text-[#36a189] text-base mr-[10px]"/> Tìm kiếm
                        </span>
                    </div>
                </div>
            </header>
            <div className="mb-[20px]">
                <div className="container mx-auto px-[15px]">
                    <Toaster />
                    <form action="search" method="get" className="before:content-['_'] before:table after:clear-both after:content-['_'] after:table">
                        <div className="flex flex-wrap ml-[-15px] mr-[-15px]">
                            <input
                                name="keywords"
                                type="text"
                                placeholder="Tối thiểu 2 kí tự"
                                size="40"
                                value={query}
                                className="float-left h-[40px] mb-[10px] search-box lg:flex-[0_0_83.33333333%] lg:max-w-[83.33333333%] md:flex-[0_0_83.33333333%] md:max-w-[83.33333333%] flex-[0_0_66.66666667%] max-w-[66.66666667%]"
                                onChange={handleSearchValue}
                            />
                            <input 
                                type="submit" 
                                value="Tìm kiếm" 
                                className="search-submit lg:flex-[0_0_16.66666667%] lg:max-w-[16.66666667%] md:flex-[0_0_16.66666667%] md:max-w-[16.66666667%] flex-[0_0_33.33333333%] max-w-[33.33333333%]"
                            />
                        </div>
                        <a 
                            href="advanced-search"
                            className="mt-[10px] cursor-pointer float-right hover:text-green hover:outline-0 hover:no-underline"
                        >
                            Tìm kiếm nâng cao
                        </a>
                    </form>
                </div>
            </div>
            <div className="container mx-auto px-[15px]">
                <section className="basic-section mb-[20px]">
                    <main className="p-[10px]">
                        <div className="flex flex-wrap ml-[-15px] mr-[-15px]">
                        {
                            novel == null ? 
                                <NoDataMessage message="Không có truyện nào"/>
                            : (
                                novel.results.length ? 
                                novel.results.map((novel, i) => {
                                    return <div key={i} className="relative w-full px-[15px] my-[10px] flex-[0_0_33.33333333%] max-w-[33.33333333%] md:flex-[0_0_25%] md:max-w-[25%] lg:flex-[0_0_16.66666667%] lg:max-w-[16.66666667%]">
                                        <SearchResultCard novel={novel} publisher={novel.publisher}/>
                                    </div>
                                })
                                : <NoDataMessage  message="Không có truyện nào"/>
                            )
                        }
                        </div>
                    </main>
                    <PaginationFooter state={novel} fetchDataFunction={searchNovels} />
                </section>
            </div>
        </main>
    )
}

export default SearchPage;