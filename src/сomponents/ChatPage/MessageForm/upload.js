import React, { useRef } from "react";
import { actionMedia, actionCreateMessage } from "../../../actions";
import { connect } from "react-redux";

const Upload = ({
  onUpload = () => {
    throw ReferenceError("onUpload doesn't set");
  },
}) => {
  const ref = useRef(null);
  return (
    <form
      action="/upload"
      method="post"
      encType="multipart/form-data"
      ref={ref}
    >
      <input
        type="file"
        name="media"
        onChange={() => onUpload(new FormData(ref.current))}
      />
    </form>
  );
};

export const Media = ({ id, onPush }) => {
  var media;
  return (
    <div className="App">
      <Upload
        onUpload={(formData) =>
          fetch("http://chat.fs.a-level.com.ua/upload", {
            method: "POST",
            headers: localStorage.authToken
              ? { Authorization: "Bearer " + localStorage.authToken }
              : {},
            body: formData,
          })
            .then((res) => res.json())
            .then((json) => (media = json))
        }
      />

      <button onClick={() => onPush(media, id)}>file send</button>
    </div>
  );
};

export const CMedia = connect(null, { onPush: actionMedia })(Media);
