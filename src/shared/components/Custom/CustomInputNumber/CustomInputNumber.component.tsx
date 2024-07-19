import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Props } from './CustomInputNumber.types';
import * as S from './CustomInputNumber.styles';

const CustomInputNumber: React.FC<Props> = (props) => {
  const {
    step = 1,
    max,
    min,
    value,
    onChange,
    onBlur,
    disabled,
    ...restProps
  } = props;

  const fieldElementRef = useRef<HTMLInputElement | null>(null);
  const decrementButtonElementRef = useRef<HTMLButtonElement | null>(null);
  const incrementButtonElementRef = useRef<HTMLButtonElement | null>(null);
  const continuousChangeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [fieldValueState, setFieldValueState] = useState<string | number>(value);

  useEffect(() => {
    if (fieldElementRef.current) {
      fieldElementRef.current.onchange = (event) => {
        if (onChange) onChange(event as unknown as React.ChangeEvent<HTMLInputElement>);
      };
    }
  }, [onChange]);

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value.match(/^-?\d+$/)) return;
    setFieldValueState(event.target.value);
    if (onChange) onChange(event);
  };

  const handleFieldBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const currentValue = +event.target.value;
    const correctionValue = String((max !== undefined && currentValue > +max) ? max : (min !== undefined && currentValue < +min) ? min : currentValue);
    setFieldValueState(correctionValue);
    event.target.value = correctionValue;
    if (onBlur) onBlur(event);
  };

  const handleControlButtonBlur = () => {
    if (fieldElementRef.current) {
      fieldElementRef.current.focus();
      fieldElementRef.current.blur();
    }
  };

  const handleDecrement = () => {
    setFieldValueState((prevState) => {
      const value = +prevState - step;
      const state = min !== undefined ? Math.max(value, +min) : value;
      if (fieldElementRef.current) {
        fieldElementRef.current.value = String(state);
        fieldElementRef.current.dispatchEvent(new Event('change', { bubbles: true }));
      }
      return state;
    });
  };

  const handleIncrement = () => {
    setFieldValueState((prevState) => {
      const value = +prevState + step;
      const state = max !== undefined ? Math.min(value, +max) : value;
      if (fieldElementRef.current) {
        fieldElementRef.current.value = String(state);
        fieldElementRef.current.dispatchEvent(new Event('change', { bubbles: true }));
      }
      return state;
    });
  };

  const handleContinuousDecrement = () => {
    continuousChangeIntervalRef.current = setInterval(() => {
      if (!decrementButtonElementRef.current?.disabled) {
        handleDecrement();
      }
    }, 100);
  };

  const handleContinuousIncrement = () => {
    continuousChangeIntervalRef.current = setInterval(() => {
      if (!incrementButtonElementRef.current?.disabled) {
        handleIncrement();
      }
    }, 100);
  };

  const handleStopContinuousChange = () => {
    if (continuousChangeIntervalRef.current) {
      clearInterval(continuousChangeIntervalRef.current);
      continuousChangeIntervalRef.current = null;
    }
  };

  return (
    <S.CustomInputNumber>
      <S.CustomInputNumber.ControlButton
        type="button"
        variant="outline"
        onClick={handleDecrement}
        onBlur={handleControlButtonBlur}
        onMouseDown={handleContinuousDecrement}
        onMouseUp={handleStopContinuousChange}
        onMouseLeave={handleStopContinuousChange}
        disabled={disabled || (min !== undefined && fieldValueState <= min)}
        ref={decrementButtonElementRef}
      >
        <FontAwesomeIcon icon={faMinus} />
      </S.CustomInputNumber.ControlButton>
      <S.CustomInputNumber.Field
        {...restProps}
        type="number"
        onChange={handleFieldChange}
        onBlur={handleFieldBlur}
        value={fieldValueState}
        disabled={disabled}
        ref={fieldElementRef}
      />
      <S.CustomInputNumber.ControlButton
        type="button"
        variant="outline"
        onClick={handleIncrement}
        onBlur={handleControlButtonBlur}
        onMouseDown={handleContinuousIncrement}
        onMouseUp={handleStopContinuousChange}
        onMouseLeave={handleStopContinuousChange}
        disabled={disabled || (max !== undefined && fieldValueState >= max)}
        ref={incrementButtonElementRef}
      >
        <FontAwesomeIcon icon={faPlus} />
      </S.CustomInputNumber.ControlButton>
    </S.CustomInputNumber>
  );
};

export default CustomInputNumber;
