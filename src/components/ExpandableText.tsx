import React from "react";
import { useState } from "react";

interface Props {
  maxChars?: number;
  children: string;
}

const ExpandableText = ({ maxChars = 100, children }: Props) => {
    const [expanded, setExpanded] = useState(false);

  if (children.length <= maxChars) {
    return <p>{children}</p>;
  }

  const text = expanded ? children : children.substring(0, maxChars);

  return (
    <p>
      {text}...<button onClick={() => setExpanded(!expanded)}>{expanded ? 'Less' : 'More'}</button>
    </p>
  );
};

export default ExpandableText;
