import React from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import InspectionList from '../components/InspectionsList';

import { StoreContext } from '../store';
import { IInspection } from '../store/types';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../styles/theme';
import { BrowserRouter } from 'react-router-dom';
import AddInspection from '../components/AddInspection';
import { act } from 'react-dom/test-utils';

const mockOnSubmit = jest.fn();

const mockRegisterInspection = jest.fn(
  (keyword: string) =>
    (mockedInspectionsState = [{ id: '1', keyword, status: 'active', urls: ['http://test.com'] }])
);
const mockSetInspection = jest.fn();
let mockedInspectionsState: IInspection[] = [];

const contextValue = {
  inspections: mockedInspectionsState,
  registerInspection: mockRegisterInspection,
  setInspections: mockSetInspection
};

describe('InspectionList Component', () => {
  beforeEach(() => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <StoreContext.Provider value={contextValue}>
          <BrowserRouter>
            <AddInspection testMockFunction={mockOnSubmit} />
            <InspectionList mockedState={mockedInspectionsState} />
          </BrowserRouter>
        </StoreContext.Provider>
      </ThemeProvider>
    );
  });

  it('should not display if dont have inspections', async () => {
    const InspectionListComponent = screen.queryByTestId('inspection-list-wrapper');
    expect(InspectionListComponent).toBeNull();
  });

  it('should render a List when has items', async () => {
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

    act(() => {
      mockRegisterInspection('security');
    });

    await waitFor(() =>
      expect(mockedInspectionsState).toEqual([
        { id: '1', keyword: 'security', status: 'active', urls: ['http://test.com'] }
      ])
    );

    const { queryByText } = render(
      <ThemeProvider theme={defaultTheme}>
        <StoreContext.Provider value={contextValue}>
          <BrowserRouter>
            <InspectionList mockedState={mockedInspectionsState} />
          </BrowserRouter>
        </StoreContext.Provider>
      </ThemeProvider>
    );

    const listElement = queryByText('Recent Inspections');
    expect(listElement).toBeInTheDocument();
  });
});
