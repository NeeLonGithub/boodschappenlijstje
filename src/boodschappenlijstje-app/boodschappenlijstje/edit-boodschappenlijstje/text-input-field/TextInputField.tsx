import React, { FC, useState } from 'react';
import './TextInputField.scss';

interface TextInputFieldProps {
  text: string;
  size?: 'normal' | 'large';
  onChange: (text: string) => void;
}

export const TextInputField: FC<TextInputFieldProps> = ({ text, size= 'normal', onChange }) => {

  const [value, setValue] = useState(text || '');

  const onBlur = (value: string) => {
    setValue('');
    onChange(value);
  }

  const onKeyPress = (key: string, value: string) => {
    if (key === 'Enter') {
      setValue('');
      onChange(value);
    }
  }

  return (<div>
      <input className={`text-input text-input__size--${size}`}
             autoFocus
             value={value}
             onChange={(event) => setValue(event.target.value)}
             onBlur={(event) => onBlur(event.target.value)}
             onKeyPress={(event) => onKeyPress(event.key, event.currentTarget.value)}
      />
    </div>);
};
