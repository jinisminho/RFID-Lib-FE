import React from 'react'
const deleteButton = (props) => {
   return (
      <button type="button" rel="tooltip" data-placement="left" className="btn btn-sm btn-danger btn-simple btn-icon" onClick={props.clicked}>
         <i className="fa fa-trash"></i>
      </button>
   )
}

export default deleteButton