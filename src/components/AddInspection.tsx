import React, { useContext } from 'react';
import Input from './Input';
import styled from 'styled-components';
import { Controller, useForm } from 'react-hook-form';
import { StoreContext } from '../store';

interface IFormData {
  keyword?: string;
}

interface IAddInspection {
  testMockFunction?: jest.Mock<any, any, any>;
}

export default function AddInspection({ testMockFunction }: IAddInspection) {
  const { registerInspection } = useContext(StoreContext);

  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm();

  async function onSubmit(formData: IFormData) {
    try {
      // Function to run Jest Mock
      const { keyword = '' } = formData;
      if (testMockFunction) testMockFunction({ keyword });

      await registerInspection(keyword);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AddInspectionContainer>
      <Headline children="Insert a new inspection" />
      <Subheading children="Here you can add and check existing inspections, backlinks and status" />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="keyword"
          control={control}
          rules={{
            required: { value: true, message: 'Please, insert a keyword' },
            minLength: { value: 4, message: 'Minimal 4 characters to add' }
          }}
          render={({ field: { name, value, onChange } }) => (
            <Input
              errorMessage={errors.keyword?.message}
              inputProps={{
                name,
                id: name,
                value: value || '',
                onChange,
                placeholder: 'Keyword',
                'aria-invalid': errors.keyword ? true : false
              }}
            />
          )}
        />
        <Button type="submit" children="Add" />
      </Form>
    </AddInspectionContainer>
  );
}

const AddInspectionContainer = styled.div`
  width: 50%;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Headline = styled.span`
  font-size: 67px;
  line-height: 77px;

  letter-spacing: 0.01em;

  color: ${({ theme }) => theme.colors.text.primary};

  width: 100%;
  max-width: 500px;

  margin-bottom: 25px;
`;

const Subheading = styled.span`
  font-size: 18px;
  line-height: 29px;

  letter-spacing: 0.01em;

  color: ${({ theme }) => theme.colors.text.secondary};

  width: 100%;
  max-width: 460px;

  margin-bottom: 60px;
`;

const Form = styled.form`
  position: relative;

  width: 100%;
  max-width: 794px;
`;

const Button = styled.button.attrs({ type: 'submit' })`
  position: absolute;

  font-weight: 600;
  font-size: 16px;

  letter-spacing: 0.16em;

  color: ${({ theme }) => theme.colors.text.light};

  background: ${({ theme }) => theme.colors.background.tertiary};
  border: none;
  border-radius: 5px;

  padding: 28px 50px;
  top: 30px;
  right: 15px;

  cursor: pointer;

  text-transform: uppercase;
`;
