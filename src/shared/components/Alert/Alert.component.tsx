import React from 'react';
import { Props } from './Alert.types';
import * as S from './Alert.styles';

const Alert = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    children,
    ...restProps
  } = props;
  const childrenNode = children;

  return (
    <S.Alert {...restProps} ref={ref}>
      {childrenNode}
    </S.Alert>
  );
});

Alert.displayName = 'Alert';

export default Alert;
