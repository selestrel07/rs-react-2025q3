import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Pagination } from './Pagination.tsx';
import { userEvent } from '@testing-library/user-event';

describe('Pagination component tests', () => {
  const setPageNumberMock = vi.fn();
  beforeEach(() => {
    setPageNumberMock.mockClear();
  });

  it('Should render buttons and page number', () => {
    const pageNumber = 10;
    render(
      <Pagination
        pageNumber={pageNumber}
        pageCount={100}
        navigateToPage={setPageNumberMock}
      />
    );

    expect(screen.getByText('<')).toBeInTheDocument();
    expect(screen.getByText('>')).toBeInTheDocument();
    expect(screen.getByText(pageNumber)).toBeInTheDocument();
  });

  it('Should call setPageNumber after previous page button click', async () => {
    const pageNumber = 10;
    render(
      <Pagination
        pageNumber={pageNumber}
        pageCount={100}
        navigateToPage={setPageNumberMock}
      />
    );

    await userEvent.click(screen.getByRole('button', { name: '<' }));

    expect(setPageNumberMock).toBeCalled();
  });

  it('Should call setPageNumber after next page button click', async () => {
    const pageNumber = 10;
    render(
      <Pagination
        pageNumber={pageNumber}
        pageCount={100}
        navigateToPage={setPageNumberMock}
      />
    );

    await userEvent.click(screen.getByRole('button', { name: '>' }));

    expect(setPageNumberMock).toBeCalled();
  });

  it('Should not call setPageNumber after previous page button click for first page', async () => {
    const pageNumber = 1;
    render(
      <Pagination
        pageNumber={pageNumber}
        pageCount={100}
        navigateToPage={setPageNumberMock}
      />
    );

    await userEvent.click(screen.getByRole('button', { name: '<' }));

    expect(setPageNumberMock).not.toBeCalled();
  });

  it('Should not call setPageNumber after next page button click for last page', async () => {
    const pageNumber = 100;
    render(
      <Pagination
        pageNumber={pageNumber}
        pageCount={100}
        navigateToPage={setPageNumberMock}
      />
    );

    await userEvent.click(screen.getByRole('button', { name: '>' }));

    expect(setPageNumberMock).not.toBeCalled();
  });
});
