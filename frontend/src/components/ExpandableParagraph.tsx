import React, { useState } from 'react';

interface ExpandableParagraphProps {
  text: string;
  maxLength: number;
}

const ExpandableParagraph: React.FC<ExpandableParagraphProps> = ({ text, maxLength }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <p style={{alignItems:'left', fontFamily:'sans-serif', fontSize:'2.6vh', width:'40vw', lineHeight: 1.4}}>
        {expanded ? text : `${text?.slice(0, maxLength)}...`}
        {!expanded && text?.length > maxLength && (
          <span style={{ color: 'blue', cursor: 'pointer' }} onClick={toggleExpanded}>
            See more
          </span>
        )}
        {expanded && (
          <span style={{ color: 'blue', cursor: 'pointer' }} onClick={toggleExpanded}>
            Show less
          </span>
        )}
      </p>
    </div>
  );
};

export default ExpandableParagraph;