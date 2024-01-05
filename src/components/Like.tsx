import React, { useState } from "react";
import { BsHeart } from "react-icons/bs";

interface Props {
  onLike: () => void;
}

export const Like = ({onLike}: Props) => {
  const [fill, setfill] = useState(false);
  return (
    <div>
      <BsHeart
        fill={fill ? "red" : "grey"}
        onClick={() => {
          setfill(!fill);
          onLike();
        }}
      />
    </div>
  );
};
