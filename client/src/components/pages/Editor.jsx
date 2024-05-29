import React, { createContext, useContext, useState } from "react";
import { UserContext } from "../../App";
import { Navigate, Outlet } from "react-router-dom";
import NovelEditor from "../common/NovelEditor";

// Create context the same as database
const novelStructure = {
    novel_title: '',
    other_name: '',
    sensitive_content: '',
    novel_banner: '',
    author: [],
    artist: [],
    type_of_novel: 'Truyện dịch',
    categories: [],
    description: '',
    note: '',
    status: 'Đang tiến hành',
    episode: {
        episode_info: { }
    },
    publisher: {
        personal_info: { }
    }
}

export const NovelContext = createContext({ });

const Editor = () => {

    const [ novel, setNovel ] = useState(novelStructure);

    let { userAuth: { access_token }} = useContext(UserContext);

    return (
        <>
            <NovelContext.Provider value={{ novel, setNovel }}>
                {
                    access_token === null 
                    ? <Navigate to="/signin" /> 
                    : 
                    <>
                        <NovelEditor />
                    </>
                }
            </NovelContext.Provider>
            <Outlet />
        </>
    )
}

export default Editor;