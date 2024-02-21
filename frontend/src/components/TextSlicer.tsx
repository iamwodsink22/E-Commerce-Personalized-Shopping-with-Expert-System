import React from 'react';

interface TextSlicerProps {
  text: string;
  maxLength: number;
}

function TextSlicer({ text, maxLength }: TextSlicerProps) {
  return (
    <div style={{fontFamily:'Poppins', fontWeight:'550', marginBottom:'0.75vh', fontSize:'17px'}}>
      {text?.length > maxLength ? text.slice(0, maxLength) + "..." : text}...
    </div>
  );
}

export default TextSlicer;
