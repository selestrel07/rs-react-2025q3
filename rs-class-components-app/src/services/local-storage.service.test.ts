import { afterEach, describe, expect, it } from 'vitest';
import { getSearchString, setSearchString } from './local-storage.service.ts';
const REACT_CLASS_COMPONENTS_SEARCH_STRING =
  'react-class-components-search-string';
const firstSearchString = 'FirstSearchString';
const secondSearchString = 'FirstSearchString';

describe('Test local storage service', () => {
  afterEach(() => localStorage.clear());

  it('Should save provided value', () => {
    setSearchString(firstSearchString);

    expect(localStorage.getItem(REACT_CLASS_COMPONENTS_SEARCH_STRING)).toBe(
      firstSearchString
    );
  });

  it('Should overwrite item with provided value', () => {
    setSearchString(firstSearchString);
    setSearchString(secondSearchString);

    expect(localStorage.getItem(REACT_CLASS_COMPONENTS_SEARCH_STRING)).toBe(
      secondSearchString
    );
  });

  it('Should return value', () => {
    localStorage.setItem(
      REACT_CLASS_COMPONENTS_SEARCH_STRING,
      firstSearchString
    );

    expect(getSearchString()).toBe(firstSearchString);
  });
});
