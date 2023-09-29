import React, { useState } from "react"
import clases from '../../../../pomodoro.module.css'
import DropDownMenu from "./DropDownMenu"
import PropTypes from 'prop-types'
import { createPortal } from "react-dom";
import ModalDelete from "../ModalDelete";

function DropDownButton(props){

    const [dropdownOpened, setDropdownOpened] = useState(false);
    const [deleting, setDeleting] = useState(false);

    function handleOpen(){
        if(dropdownOpened){
            setDropdownOpened(false)
        }else{
            setDropdownOpened(true);
        }
    }

    return (
        <>
        <div onClick={handleOpen} className={clases.DropDownButton}>
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="6" viewBox="0 0 26 6" fill="none">
                <circle cx="3" cy="3" r="3" fill="#C4C4C4"/>
                <circle cx="13" cy="3" r="3" fill="#C4C4C4"/>
                <circle cx="23" cy="3" r="3" fill="#C4C4C4"/>
            </svg>
            {dropdownOpened && 
            <DropDownMenu setEditing={props.setEditing} id={props.id} weight={props.weight} setDeleting={setDeleting}/>
            }
        </div>
        {deleting && createPortal(<ModalDelete id={props.id} setDeleting={setDeleting}/> , document.querySelector('#modal_delete_root'))}
        </>
    )
}

DropDownButton.propTypes = {
    weight: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    setEditing: PropTypes.func.isRequired
}

export default DropDownButton