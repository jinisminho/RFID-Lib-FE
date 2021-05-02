import React from "react";

const ImagePreview = ({ imagefile }) =>
  imagefile.map((file) => {
    if(file.name){
      return(
        <div key={file.name} >
            <img className="img-thumbnail" style={{width: '100%', objectFit:'cover', height:'35vh'}} src={URL.createObjectURL(file)} alt={file.name} onError={(e) => e.target.src = require("assets/img/theme/no-image.png")}/>
        </div>
      )
    }else{
      return (
        <div key={file} >
            <img className="img-thumbnail" style={{width: '100%', objectFit:'cover', height:'35vh'}} src={file} alt={file.name} onError={(e) => e.target.src = require("assets/img/theme/no-image.png")}/>
        </div>
      )
    }
    });


export default ImagePreview;
