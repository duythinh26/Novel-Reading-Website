import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClockRotateLeft, faBookmark, faEnvelope, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from "../../App";
import { removeFormSession } from "./Session";

const UserNavigation = ({ coins }) => {
    const { userAuth: { username }, userAuth, setUserAuth } = useContext(UserContext)

    const signOutUser = () => {
        removeFormSession("user");

        // Reset the web auth state
        setUserAuth({ access_token: null })
    }

    return (
        <ul className="bg-white absolute w-user m-0 p-0 right-0 top-[46px] z-20">
            <li>
                <Link to={`/user/${username}`} className="btn btn-ghost font-bold text-base p-3 w-full float-left justify-start border-none">
                    <FontAwesomeIcon icon={faUser} /> Tài khoản
                </Link>
            </li>
            <li>
                <Link to="/lich-su" className="btn btn-ghost font-bold text-base p-3 w-full float-left justify-start border-none">
                    <FontAwesomeIcon icon={faClockRotateLeft} /> Lịch sử
                </Link>
            </li>
            <li>
                <Link to="/bookmark" className="btn btn-ghost font-bold text-base p-3 w-full float-left justify-start border-none">
                    <FontAwesomeIcon icon={faBookmark} /> Đánh dấu
                </Link>
            </li>
            <li>
                <Link to="/tin-nhan" className="btn btn-ghost font-bold text-base p-3 w-full float-left justify-start border-none">
                    <FontAwesomeIcon icon={faEnvelope} /> Tin nhắn
                </Link>
            </li>
            <li>
                <Link to="/action"className="btn btn-ghost font-bold text-base p-3 w-full float-left justify-start border-none">
                    <i className="fi fi-rr-settings"></i> Hệ thống
                </Link>
            </li>
            <p className="font-bold text-base p-3 w-full float-left justify-start border-none">Coins: {coins}</p>
            <li>
                <Link to="/purchase-coins"className="btn btn-ghost font-bold text-base p-3 w-full float-left justify-start border-none">
                    <i className="fi fi-rr-coins"></i> Mua xu
                </Link>
            </li>
            <div className="relative w-full flex items-center gap-2 py-4 opacity-20 uppercase text-black font-bold">
                <hr className="w-full border-black"/>
            </div>
            <li>
                <button 
                    className="btn btn-ghost font-bold text-base p-3 w-full float-left justify-start border-none"
                    onClick={signOutUser}
                >
                    <FontAwesomeIcon icon={faRightFromBracket} /> Đăng xuất
                </button>
            </li>
        </ul>
    )
}

export default UserNavigation