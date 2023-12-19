import React from 'react';
import './style.scss';

interface SeparatorProps {
  title: string;
}

const Separator: React.FC<SeparatorProps> = (props) => {
  const { title } = props;

  return (
    <div className='separator'>
      <span className='separator-text'>{title.toUpperCase()}</span>
      <span className='separator-line'></span>
    </div>
  );
};

export default Separator;
