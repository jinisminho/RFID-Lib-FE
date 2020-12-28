import React from 'react'
const updateButton = (props) => {
   return (
    <button onClick={props.clicked} type="button" rel="tooltip" data-placement="left"  className="btn btn-sm btn-success btn-simple btn-icon">
      <i className="fa fa-edit"></i>
   </button>
   )
}

export default updateButton