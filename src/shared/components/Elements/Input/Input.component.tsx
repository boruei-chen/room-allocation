import React from 'react';
import { Props } from './Input.types';
import * as S from './Input.styles';

const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => (
  <S.Input {...props} ref={ref} />
));

Input.displayName = 'Input';

export default Input;
