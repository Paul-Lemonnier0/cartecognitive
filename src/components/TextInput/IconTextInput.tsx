import React, { Dispatch, FC } from "react"

import "./TextInputStyle.css"
import { CustomCard } from "../Card/CustomCard";
import { IconType } from "react-icons";

interface IconTextInputProps {
    textValue: string,
    setTextValue?: Dispatch<string>,
    startingValue?: string,
    onChangeCustom?:(e: React.ChangeEvent<HTMLInputElement>) => void,
    onBlur?: () => void,
    placeholder?: string,
    Icon: IconType,
    iconHover?: boolean
}

const IconTextInput: FC<IconTextInputProps> = ({
    startingValue, 
    textValue, 
    setTextValue, 
    onChangeCustom,
    placeholder,
    Icon,
    onBlur,
    iconHover
}) => {
    
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (setTextValue) {
            setTextValue(newValue);
        }    
    }
    
    return(
        <div style={{minWidth: 50}}>
            <CustomCard customPadding>
                <div className="textInputSubContainer">
                    <div style={{display: "flex"}} className={iconHover ? "iconHover" : ""}>
                        <Icon size={25}/>
                    </div>
                    
                    <input className="customInput"
                        onChange={onChangeCustom ?? onChange}
                        value={textValue}
                        defaultValue={startingValue}
                        placeholder={placeholder}
                        onBlur={onBlur}
                    />
                </div>
            </CustomCard>
        </div>
    )
}

export default IconTextInput