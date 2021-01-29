import React from "react";
import PropTypes from "prop-types";
import DropZone from "react-dropzone";
import ImagePreview from "../ImagePreview/ImagePreview";
import PlaceHolder from "../PlaceHolder/PlaceHolder";
import ShowError from "../ShowError/ShowError";

const DropZoneField = ({
  handleOnDrop,
  input: { onChange },
  imagefile,
  meta: { error, touched }
}) => (
  <div className="preview-container">
    <DropZone
      accept="image/jpeg, image/png, image/gif, image/bmp"
      className="upload-container"
      onDrop={file => {handleOnDrop(file); onChange(file)}}
      multiple={false}
    >
      {({getRootProps, getInputProps}) =>
        imagefile && imagefile.length > 0 ? (
          <div {...getRootProps()} className="render-preview">
          <input {...getInputProps()} />
          <ImagePreview imagefile={imagefile} />
          </div>
        ) : (
          <PlaceHolder getInputProps={getInputProps} getRootProps={getRootProps} error={error} touched={touched} />
        )
      }
    </DropZone>
    <ShowError error={error} touched={touched} />
  </div>
);

DropZoneField.propTypes = {
  error: PropTypes.string,
  handleOnDrop: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  touched: PropTypes.bool
};

export default DropZoneField;
