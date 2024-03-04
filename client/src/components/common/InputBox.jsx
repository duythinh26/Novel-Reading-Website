import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const InputBox = ({ name, type, id, value, placeholder}) => {
    const [passwordVisible, setPasswordVisible] = useState(false) //false means not showing the password at the beginning

    return (
        <div className="relative">
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
                className="input input-info w-full h-input border border-solid border-silver mb-[10px]"
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