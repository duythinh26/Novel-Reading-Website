import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import axios from 'axios';
import { filterPaginationData } from './FilterPaginationData';
import { Toaster, toast } from 'react-hot-toast';
import NoDataMessage from './NoDataMessage';
import NovelPublishedCard from './NovelPublishedCard';

const NovelPublishedList = () => {

    const [ novels, setNovels ] = useState(null);
    const [ drafts, setDrafts ] = useState(null);
    const [ query, setQuery ] = useState("");

    let { userAuth: { access_token, username } } = useContext(UserContext);

    const getNovels = ({ draft, deleteDocCount = 0 }) => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/novel-published", {
            draft, query, deleteDocCount
        }, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
        .then( async ({ data }) => {
            let formatedData = await filterPaginationData({
                state: draft ? drafts : novels,
                data: data.novels, 
                user: access_token,
                countRoute: "/novel-published-count",
                data_to_send: { draft, query }
            })

            console.log("draft => " + draft, formatedData)

            if (draft) {
                setDrafts(formatedData);
            } else {
                setNovels(formatedData)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        if (access_token) { 
            if (novels == null) {
                getNovels({ page: 1, draft: false })
            }

            if (drafts == null) {
                getNovels({ page: 1, draft: true })
            }
        }
    }, [access_token, novels, drafts, query])

    const handleChange = (e) => {
        let searchQuery = e.target.value;

        setQuery(searchQuery);

        if (!searchQuery.length) {
            setQuery("");
            setNovels(null);
            setDrafts(null);
        }
    }

    const handleSearch = (e) => {
        e.preventDefault();

        if (query.length) {
            setNovels(null);
            setDrafts(null);
        }
    }

    return (
        <>
            <Toaster />
            <div className="container mx-auto px-[15px]">
                <div className="row">
                    <div className="lg:float-left lg:w-full relative min-h-[1px] px-[15px]">
                        <div className="border-[#dddddd] bg-white border rounded shadow-[0_1px_1px_rgba(0,0,0,0.05)] mb-5 border-solid">
                            <div className="text-[#333333] bg-neutral-100 border-[#dddddd] px-[15px] py-[10px] rounded-t-[3px] border-b-transparent border-b border-solid">Series of {username}</div>
                            <div className="p-[15px] before:content-['_'] before:table after:content-['_'] after:table after:clear-both">
                                {
                                    novels == null ? "" :
                                    novels.results.length ? 
                                    <div className="float-right mb-[20px]">
                                        <form method="post">
                                            <input type="hidden" name='_token' value={access_token}/>
                                            <div className="relative table border-separate md:inline-table md:align-middle">
                                                <input
                                                    type="search" 
                                                    className='form-input relative z-[2] float-left mb-0 table-cell md:inline-block md:w-auto md:align-middle' 
                                                    style={{"width": "250px"}}
                                                    name=''
                                                    placeholder="Tên truyện"
                                                    onChange={handleChange}
                                                />
                                                <span className="md:w-auto relative text-[0] w-[1%] whitespace-nowrap align-middle table-cell">
                                                    <button 
                                                        className='btn h-[34px] min-h-[34px] text-[#333333] bg-white border-[#cccccc] ml-[-1px] text-base'
                                                        onClick={handleSearch}
                                                    >
                                                        Tìm kiếm
                                                    </button>
                                                </span>
                                            </div>
                                        </form>
                                    </div>
                                    : ""
                                }
                                <table className='w-full max-w-full mb-[20px]'>
                                    {
                                        novels == null ? "" :
                                        novels.results.length ? 
                                        <tbody>
                                            <tr>
                                                <th className='leading-[1.42857143] align-top p-[8px] border-t-[#dddddd] border-t border-solid static float-none table-cell w-7/12 xl:w-1/2 lg:w-5/12 md:w-1/2 min-h-[1px] text-left'>Tên truyện</th>
                                                <th className='leading-[1.42857143] align-top p-2 border-t-[#dddddd] border-t border-solid static float-none table-cell min-h-[1px] text-left max-lg:hidden'>Loại truyện</th>
                                                <th className='leading-[1.42857143] align-top p-2 border-t-[#dddddd] border-t border-solid static float-none table-cell xl:w-1/6 lg:w-1/6 md:w-1/4 min-h-[1px] text-left max-md:hidden'>Trạng thái</th>
                                                <th className='leading-[1.42857143] align-top p-2 border-t-[#dddddd] border-t border-solid static float-none table-cell w-5/12 xl:w-1/6 lg:w-1/4 md:w-1/4 min-h-[1px] text-left'>Quản lý</th>
                                            </tr>
                                            {
                                                novels.results.map((novel, i) => {
                                                    return <React.Fragment key={i}>
                                                        <NovelPublishedCard novel={{ ...novel, index: i, setStateFunc: setNovels }} />
                                                    </React.Fragment>
                                                })
                                            }
                                        </tbody>
                                        : <NoDataMessage message="Không có truyện nào"/>
                                    }
                                </table> 
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NovelPublishedList;