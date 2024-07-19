import React from 'react';
import { Props } from './Button.types';
import * as S from './Button.styles';

const Button = React.forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const {
    variant,
    children,
    ...restProps
  } = props;
  const childrenNode = children;

  return (
    <S.Button {...restProps} $variant={variant} ref={ref}>
      {childrenNode}
    </S.Button>
  );
});

Button.displayName = 'Button';

export default Button;
