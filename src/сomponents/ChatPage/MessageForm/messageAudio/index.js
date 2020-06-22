import React from "react";

export const MessageAudio = ({ audio }) => (
  <>
    {audio !== null && audio !== undefined ? (
      <audio controls="controls">
        <source
          src={`http://chat.fs.a-level.com.ua/${audio[0].url}`}
          type="audio/mp3"
        />
        <source
          src={`http://chat.fs.a-level.com.ua/${audio[0].url}`}
          type="audio/ogg"
        />
        <source
          src={`http://chat.fs.a-level.com.ua/${audio[0].url}`}
          type="audio/mp4"
        />
      </audio>
    ) : null}
  </>
);
