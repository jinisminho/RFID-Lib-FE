import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
const deleteButton = (props) => {
   return (
      <OverlayTrigger
         key="top"
         placement="top"
         overlay={
            <Tooltip id="tooltip-top">
               {props.tooltipMsg ? props.tooltipMsg : "Delete"}
        </Tooltip>
         }
      >
         <button type="button" rel="tooltip" data-placement="left" className="btn btn-danger btn-simple btn-icon" onClick={props.clicked}>
            <i className="fa fa-trash"></i>
         </button>
      </OverlayTrigger>
   )
}

export default deleteButton