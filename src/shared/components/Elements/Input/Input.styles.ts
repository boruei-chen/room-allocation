import styled from 'styled-components';

export const Input = styled.input`
  height: 48px;
  background-color: #FFFFFF;
  border: 1px solid #C1C1C1;
  border-radius: 4px;
  box-sizing: border-box;
  color: #676767;
  font-size: 16px;
  padding: 4px;
  outline: none;
  &:disabled {
    background-color: #EFEFEF;
    opacity: .65;
  }
`;
