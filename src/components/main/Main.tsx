import { type FC, type FormEvent, useState } from 'react';
import Button from '../button/Button.tsx';
import UncontrolledForm from '../forms/uncontrolled-form.tsx';
import { useAppDispatch } from '../../hooks/store-hooks.ts';
import { addPerson } from '../../store/peopleSlice.ts';
import Portal from '../portal/Portal.tsx';
import { fileToBase64 } from '../../utils/file-to-base64.ts';
import { isPerson } from '../../utils/is-person.ts';
import { convertToPerson } from '../../utils/formdata-to-person.ts';

const Main: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUncontrolled, setIsUncontrolled] = useState(false);
  const dispatch = useAppDispatch();

  const handleClick = (openUncontrolledForm: boolean) => {
    setIsUncontrolled(openUncontrolledForm);
    setIsOpen(true);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    if ('picture' in data) {
      try {
        data.picture = await fileToBase64(data.picture as File);
      } catch (error) {
        console.error('Failed to convert file:', error);
      }
    }
    if (
      isPerson(data, ['name', 'age', 'country', 'email', 'gender', 'password'])
    ) {
      console.log('saving...', data);
      dispatch(addPerson(convertToPerson(data)));
    } else {
      console.log('not person', data);
    }
  };

  return (
    <div className="flex justify-center gap-3">
      <Button onClick={() => handleClick(true)}>Open Uncontrolled Form</Button>
      <Button onClick={() => handleClick(false)}>Open React Hook Form</Button>
      <Portal isOpen={isOpen} close={() => setIsOpen(false)}>
        {isUncontrolled ? (
          <UncontrolledForm onSubmit={handleSubmit}>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </UncontrolledForm>
        ) : (
          'React Hook Form'
        )}
      </Portal>
    </div>
  );
};

export default Main;
