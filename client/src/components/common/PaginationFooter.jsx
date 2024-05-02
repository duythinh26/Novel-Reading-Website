import React from 'react'

const PaginationFooter = ({ state, fetchDataFunction }) => {

    let maxLimit = 6;

    if (state != null && state.totalDocs > state.results.length && state.results.length > 0 ) {
        return (
            <div className="bg-white block p-[10px]">
                <div className="text-right" onClick={() => fetchDataFunction({ page: state.page + 1 })}>
                    {
                        state.page * maxLimit > state.results.length ? <></>
                        : <button 
                        className="border inline-block font-bold text-center normal-case transition-[0.25s] w-full px-5 py-2.5 rounded-[30px] border-solid border-[#111] hover:bg-[#111] hover:text-white"
                    >
                        Xem thêm
                    </button>
                    }
                </div>
            </div>
        )
    }
}

export default PaginationFooter