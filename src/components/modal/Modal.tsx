import { type ChangeEvent, type FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { OPTIONAL_FIELDS } from '../../constants/constants.ts';
import Button from '../button/Button.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks/app-hooks.ts';
import { setFields } from '../../store/fieldsSlice.ts';
import type { YearStatistics } from '../../types/statistics.ts';

const Modal: FC<{ isOpen: boolean; close: () => void }> = ({
  isOpen,
  close,
}) => {
  const initialValues = useAppSelector((state) => state.optionalFields.value);
  const [optionalFields, setOptionalFields] =
    useState<(keyof YearStatistics)[]>(initialValues);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    setOptionalFields(initialValues);
    close();
  };

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };
    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, [isOpen]);

  if (!isOpen) {
    document.body.style.overflowY = '';
    return null;
  } else {
    document.body.style.overflowY = 'hidden';
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    value: keyof YearStatistics
  ) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setOptionalFields([...optionalFields, value]);
    } else {
      setOptionalFields(optionalFields.filter((field) => field !== value));
    }
  };

  return createPortal(
    <div
      onClick={handleClose}
      className="absolute flex justify-center items-center bg-gray-200/70 w-screen h-screen z-50 top-0"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="flex flex-col items-start justify-center gap-2.5 bg-gray-200 p-2.5 max-h-full overflow-auto border-1 rounded-sm"
      >
        {OPTIONAL_FIELDS.map((field) => (
          <label key={field} className="cursor-pointer" htmlFor={field}>
            <input
              className="cursor-pointer"
              id={field}
              checked={optionalFields.map(String).includes(field)}
              onChange={(e) => handleChange(e, field as keyof YearStatistics)}
              type="checkbox"
            />{' '}
            {field}
          </label>
        ))}
        <div className="flex gap-2.5 self-center">
          <Button
            onClick={() => {
              dispatch(setFields(optionalFields));
              close();
            }}
          >
            Apply
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
