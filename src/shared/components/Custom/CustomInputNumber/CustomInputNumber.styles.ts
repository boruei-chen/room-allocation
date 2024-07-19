import styled from 'styled-components';
import Input from '@/shared/components/Elements/Input';
import Button from '@/shared/components/Elements/Button';

const ControlButton = styled(Button)`
  width: 48px;
  height: 48px;
  font-size: 28px;
  padding: 0;
`;

const Field = styled(Input)`
  width: 48px;
  text-align: center;
  margin: 0 8px;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type="number"] {
    -moz-appearance: textfield;
    appearance: textfield;
  }
`;

export const CustomInputNumber = Object.assign(
  styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
  `,
  {
    Field,
    ControlButton
  }
);
