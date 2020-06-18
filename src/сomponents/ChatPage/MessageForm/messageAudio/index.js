import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Popover, Button, Icon } from "antd";
import { Emoji } from "emoji-mart";
import reactStringReplace from "react-string-replace";
//import { convertCurrentTime, isAudio } from "utils/helpers";

// import wave from "./wave.svg";
// import play from "./play.svg";
// import pause from "./pause.svg";

import { Time, IconReaded, Avatar } from "../";

//import "./Message.scss";

export const MessageAudio = ({ audio }) =>
  audio != null ? (
    audio[0].type === "audio/mpeg" ? (
      <audio controls="controls">
        <source
          src={`http://chat.fs.a-level.com.ua/${audio[0].url}`}
          type="audio/mp3"
        />
        <source
          src={`http://chat.fs.a-level.com.ua/${audio[0].url}`}
          type="audio/ogg"
        />
      </audio>
    ) : null
  ) : null;
