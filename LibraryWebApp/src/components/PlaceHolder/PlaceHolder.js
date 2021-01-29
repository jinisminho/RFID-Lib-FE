import React from "react";
import PropTypes from "prop-types";
import { MdCloudUpload } from "react-icons/md";

const PlaceHolder = ({ getInputProps, getRootProps, error, touched }) => (
  <div
    {...getRootProps()}
    className={`placeholder-preview ${error && touched ? "has-error" : ""}`}
    
  >
    <input {...getInputProps()} />
    <MdCloudUpload style={{ fontSize: 100, paddingTop: 50 }} />
    <p>Click or drag image file to this area to upload.</p>
  </div>
);

PlaceHolder.propTypes = {
  error: PropTypes.string,
  getInputProps: PropTypes.func.isRequired,
  getRootProps: PropTypes.func.isRequired,
  touched: PropTypes.bool
};

export default PlaceHolder;
