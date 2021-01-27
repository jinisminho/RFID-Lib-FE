import React from "react";

const ImagePreview = ({ imagefile }) =>
  imagefile.map((file) => (
    <div key={file.name} className="render-preview">
        <img className="img-thumbnail" src={URL.createObjectURL(file)} alt={file.name} />
      <div className="details">
        {file.name} - {(file.size / 1024000).toFixed(2)}MB
      </div>
    </div>
  ));


export default ImagePreview;
