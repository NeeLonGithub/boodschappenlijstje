import React, { FC, useState } from 'react';

interface TextInputFieldProps {
  className?: string,
  text: string;
  onChange: (text: string) => void;
}

export const TextInputField: FC<TextInputFieldProps> = ({ text = '', onChange, className  }) => {

  const [value, setValue] = useState(text);

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

  return (<input className={className}
                 autoFocus
                 value={value}
                 onChange={(event) => setValue(event.target.value)}
                 onBlur={(event) => onBlur(event.target.value)}
                 onKeyPress={(event) => onKeyPress(event.key, event.currentTarget.value)}
      />);
};
