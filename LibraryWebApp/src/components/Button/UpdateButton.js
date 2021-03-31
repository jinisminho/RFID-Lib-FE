import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
const updateButton = (props) => {
   return (
      <OverlayTrigger
         key="top"
         placement="top"
         overlay={
            <Tooltip id="tooltip-top">
               {props.tooltipMsg ? props.tooltipMsg : "Update"}
            </Tooltip>
         }
      >
         <button onClick={props.clicked} type="button" rel="tooltip" data-placement="left" className="btn btn-success btn-simple btn-icon">
            <i className="fa fa-edit"></i>
         </button>
      </OverlayTrigger>
   )
}

export default updateButton