import { type FC, useState } from 'react';
import Button from '../button/Button.tsx';
import UncontrolledForm from '../forms/UncontrolledForm.tsx';
import Portal from '../portal/Portal.tsx';

const Main: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUncontrolled, setIsUncontrolled] = useState(false);

  const handleClick = (openUncontrolledForm: boolean) => {
    setIsUncontrolled(openUncontrolledForm);
    setIsOpen(true);
  };

  return (
    <div className="flex justify-center gap-3">
      <Button onClick={() => handleClick(true)}>Open Uncontrolled Form</Button>
      <Button onClick={() => handleClick(false)}>Open React Hook Form</Button>
      <Portal isOpen={isOpen} close={() => setIsOpen(false)}>
        {isUncontrolled ? (
          <UncontrolledForm onSubmit={() => setIsOpen(false)}>
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
