export const sortBy = <T>(
  array: T[],
  field: keyof T,
  order: 'ASC' | 'DESC'
): T[] => {
  return array.sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];

    if (aValue === undefined) return 1;
    if (bValue === undefined) return -1;

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return order === 'ASC' ? aValue - bValue : bValue - aValue;
    }

    return order === 'ASC'
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });
};
