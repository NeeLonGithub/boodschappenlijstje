import React from 'react';
import './SinglePurposeButton.scss';

interface SinglePurposeButtonProps {
  onClick: () => void;
}

const SinglePurposeButton: React.FunctionComponent<SinglePurposeButtonProps> = ({ onClick, children }) => {
  return <button className="single-purpose-button" onClick={onClick}>
    {children}
  </button>
};

export default SinglePurposeButton;
