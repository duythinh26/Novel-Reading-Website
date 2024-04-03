import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const InputBox = ({ name, type, id, value, placeholder, classname, required }) => {
    const [passwordVisible, setPasswordVisible] = useState(false) //false means not showing the password at the beginning

    return (
        <div className="relative mb-[10px]">
            <input 
                type={
                    type == "password" ? 
                    passwordVisible ? "text" : "password" 
                    : type
                    // if type = password then check if passwordvisible = true, set type = text, else set type = password
                }
                name={name}
                id={id}
                defaultValue={value}
                placeholder={placeholder} 
                className={classname}
                required={required}
            />
            
            {
                type == "password" ?
                <FontAwesomeIcon icon={(!passwordVisible ? faEye : faEyeSlash) } className="absolute top-10px left-auto right-10px cursor-pointer"
                
                //Handle the show/hide password button
                onClick={() => setPasswordVisible(currentValue => !currentValue)} 
                />
                : ""
            }
        </div>
    )
}

export default InputBox;