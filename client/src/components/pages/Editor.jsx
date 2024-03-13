import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
import { Navigate } from "react-router-dom";
import NovelEditor from "../common/NovelEditor";
import PublishForm from "../common/PublishForm";

const Editor = () => {

    const [ editorState, setEditorState ] = useState("editor")

    let { userAuth: { access_token }} = useContext(UserContext)

    return (
        access_token === null 
        ? <Navigate to="/signin" /> 
        : editorState == "editor" ? <NovelEditor /> : <PublishForm />
    )
}

export default Editor;