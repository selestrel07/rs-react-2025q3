export type SortingFields = 'country' | 'population';

export type SortingOrder = 'ASC' | 'DESC';

export type SortingState = {
  field: SortingFields;
  order: SortingOrder;
}