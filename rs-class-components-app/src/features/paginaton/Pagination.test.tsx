import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Pagination } from './Pagination.tsx';
import { userEvent } from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../store.ts';
import { setPageCount } from './paginationSlice.ts';

describe('Pagination component tests', () => {
  const navigateToPageMock = vi.fn();
  store.dispatch(setPageCount(2));
  beforeEach(() => {
    navigateToPageMock.mockClear();
  });
  afterAll(() => {
    store.dispatch(setPageCount(1));
  });

  const renderComponent = (pageNumber: number) => {
    render(
      <Provider store={store}>
        <Pagination
          pageNumber={pageNumber}
          navigateToPage={navigateToPageMock}
        />
      </Provider>
    );
  };

  it('Should render buttons and page number', () => {
    const pageNumber = 10;
    renderComponent(pageNumber);

    expect(screen.getByText('<')).toBeInTheDocument();
    expect(screen.getByText('>')).toBeInTheDocument();
    expect(screen.getByText(pageNumber)).toBeInTheDocument();
  });

  it('Should call setPageNumber after previous page button click', async () => {
    const pageNumber = 10;
    renderComponent(pageNumber);

    await userEvent.click(screen.getByRole('button', { name: '<' }));

    expect(navigateToPageMock).toBeCalled();
  });

  it('Should call setPageNumber after next page button click', async () => {
    const pageNumber = 1;
    renderComponent(pageNumber);

    await userEvent.click(screen.getByRole('button', { name: '>' }));

    expect(navigateToPageMock).toBeCalled();
  });

  it('Should not call setPageNumber after previous page button click for first page', async () => {
    const pageNumber = 1;
    renderComponent(pageNumber);

    await userEvent.click(screen.getByRole('button', { name: '<' }));

    expect(navigateToPageMock).not.toBeCalled();
  });

  it('Should not call setPageNumber after next page button click for last page', async () => {
    const pageNumber = 2;
    renderComponent(pageNumber);

    await userEvent.click(screen.getByRole('button', { name: '>' }));

    expect(navigateToPageMock).not.toBeCalled();
  });
});
