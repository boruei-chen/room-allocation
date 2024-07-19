import styled from 'styled-components';
import { Props } from './Button.types';

export const Button = styled.button<{ $variant: Props['variant']; }>`
  width: 100%;
  background-color: ${props => props.$variant === 'filled' ? '#4A9FCD' : '#FFFFFF'};
  border: 1px solid #4A9FCD;
  border-radius: 4px;
  box-sizing: border-box;
  color: ${props => props.$variant === 'filled' ? '#FFFFFF' : '#4A9FCD'};
  font-size: 16px;
  line-height: 24px;
  padding: 8px 20px;
  cursor: pointer;
  &:disabled {
    opacity: .5;
    cursor: not-allowed;
  }
`;
