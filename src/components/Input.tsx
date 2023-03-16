import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

import type { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

interface IInputProps {
  inputProps: InputHTMLAttributes<HTMLInputElement>;
  errorMessage?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}

export default function Input({ inputProps, errorMessage }: IInputProps) {
  return (
    <InputWrapper>
      <StyledInput {...inputProps} aria-describedby="errMsg" data-testid="keyword-input" />
      <InputErrorMessage id="errMsg">{errorMessage?.toString()}</InputErrorMessage>
    </InputWrapper>
  );
}

export const StyledInput = styled.input`
  background-color: ${({ theme }) => theme.colors.background.light};
  border: none;
  padding: 27px 24px;
  width: 100%;
  max-width: 733px;
  border-radius: 5px;

  font-size: 18px;
  color: ${({ theme }) => theme.colors.text.tertiary};

  outline: none;
`;

export const InputErrorMessage = styled.span`
  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 20px;
`;
