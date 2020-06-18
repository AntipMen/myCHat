import React, { useRef } from "react";
import { connect } from "react-redux";
import { actionMediaMessage } from "../../../../actions";
import "./index.css";

export const Upload = ({ onMedia }) => {
  const ref = useRef(null);
  return (
    <form
      action="/upload"
      method="post"
      encType="multipart/form-data"
      ref={ref}
      className="form-upload"
    >
      <input
        type="file"
        name="media"
        onChange={() => onMedia(ref.current)}
        className="input-upload"
      />
      <i className="icon-camera" />{" "}
    </form>
  );
};

export const CUpload = connect(null, {
  onMedia: actionMediaMessage,
})(Upload);

export const getMediaFile = async (form: HTMLFormElement) => {
  try {
    const mediaFile = await fetch("http://chat.fs.a-level.com.ua/upload", {
      method: "POST",
      headers: localStorage.authToken
        ? { Authorization: "Bearer " + localStorage.authToken }
        : {},
      body: new FormData(form),
    });
    var media = mediaFile.json();

    return mediaFile.ok ? media : new Error("Error");
  } catch (error) {
    return new Error("ERROR MEDIA");
  }
};
