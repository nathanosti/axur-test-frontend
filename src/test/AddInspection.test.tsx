import React from 'react';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import AddInspection from '../components/AddInspection';

import { StoreContext } from '../store';
import { IInspection } from '../store/types';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../styles/theme';

const mockOnSubmit = jest.fn();

const mockRegisterInspection = jest.fn((keyword) => (mockedState = [{ id: '123', keyword }]));
const mockSetInspection = jest.fn();
let mockedState: IInspection[] = [];

describe('AddInspection Component', () => {
  beforeEach(() => {
    mockOnSubmit.mockClear();
    render(
      <ThemeProvider theme={defaultTheme}>
        <StoreContext.Provider
          value={{
            inspections: mockedState,
            registerInspection: mockRegisterInspection,
            setInspections: mockSetInspection
          }}>
          <AddInspection testMockFunction={mockOnSubmit} />
        </StoreContext.Provider>
      </ThemeProvider>
    );
  });

  it('should display HeadLine text', async () => {
    const headLineComponent = screen.getByText('Insert a new inspection');

    expect(headLineComponent).toBeInTheDocument();
  });

  it('should display Subheading text', async () => {
    const subHeadingComponent = screen.getByText(
      'Here you can add and check existing inspections, backlinks and status'
    );

    expect(subHeadingComponent).toBeInTheDocument();
  });

  it('should display Input component', async () => {
    const inputComponent = screen.getByTestId('keyword-input');

    expect(inputComponent).toBeInTheDocument();

    fireEvent.input(inputComponent, {
      target: { value: 'security' }
    });

    expect(inputComponent).toBeInTheDocument();
    expect(inputComponent).toHaveValue('security');
  });

  it('should display submit button', async () => {
    const submitButton = screen.getByRole('button');

    expect(submitButton).toBeInTheDocument();
  });

  it('should display required error when value is invalid', async () => {
    const keywordInput = screen.getByTestId('keyword-input');

    expect(keywordInput).toBeInTheDocument();

    fireEvent.submit(screen.getByRole('button'));

    expect(await screen.findByText('Please, insert a keyword')).toBeInTheDocument();
    expect(mockOnSubmit).not.toBeCalled();
  });

  it('onSubmit is called when keyword field pass all validations', async () => {
    const keywordInput = screen.getByTestId('keyword-input');

    expect(keywordInput).toBeInTheDocument();

    fireEvent.input(keywordInput, {
      target: { value: 'security' }
    });

    fireEvent.submit(screen.getByRole('button'));

    await waitFor(() =>
      expect(mockOnSubmit).toHaveBeenCalledWith({
        keyword: 'security'
      })
    );

    mockRegisterInspection('security');

    expect(mockedState).toEqual([{ id: '123', keyword: 'security' }]);
    console.log(mockedState);
  });
});
