const REACT_CLASS_COMPONENTS_SEARCH_STRING =
  'react-class-components-search-string';

export function getSearchString(): string {
  return localStorage.getItem(REACT_CLASS_COMPONENTS_SEARCH_STRING) ?? '';
}

export function setSearchString(searchString: string): void {
  localStorage.setItem(REACT_CLASS_COMPONENTS_SEARCH_STRING, searchString);
}
