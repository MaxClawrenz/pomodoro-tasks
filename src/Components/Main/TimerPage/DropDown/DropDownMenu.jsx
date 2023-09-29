import React from "react"
import classes from '../../../../pomodoro.module.css'
import DropDownItem from "./DropDownItem"
import Plus from '../../../../Icons/DropDownIcons/Plus'
import Minus from '../../../../Icons/DropDownIcons/Minus'
import Delete from '../../../../Icons/DropDownIcons/Delete'
import Edit from '../../../../Icons/DropDownIcons/Edit'
import PropTypes from 'prop-types'

function DropDownMenu(props){
    
    return (
        <div className={classes.DropDownMenu}>
            <ul className={classes.DropDownMenuList}>
                <DropDownItem id={props.id} weight={props.weight} functional={'increase'} name={'Увеличить'} setDeleting={props.setDeleting} setEditing={props.setEditing}>
                    <Plus/>
                </DropDownItem>
                <DropDownItem id={props.id} weight={props.weight} functional={'decrease'} name={'Уменьшить'} setDeleting={props.setDeleting} setEditing={props.setEditing}>
                    <Minus weight={props.weight}/>
                </DropDownItem>
                <DropDownItem id={props.id} weight={props.weight} functional={'edit'} name={'Редактировать'} setDeleting={props.setDeleting} setEditing={props.setEditing}>
                    <Edit/>
                </DropDownItem>
                <DropDownItem id={props.id} weight={props.weight} functional={'delete'} name={'Удалить'} setDeleting={props.setDeleting} setEditing={props.setEditing}>
                    <Delete/>
                </DropDownItem>
            </ul>
        </div>
    )
}

DropDownMenu.propTypes = {
    weight: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    setDeleting: PropTypes.func.isRequired,
    setEditing: PropTypes.func.isRequired
}

export default DropDownMenu