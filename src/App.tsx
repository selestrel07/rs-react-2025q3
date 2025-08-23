import './App.css';
import Button from './components/button/Button.tsx';
import Portal from './components/portal/Portal.tsx';
import { useState } from 'react';
import UncontrolledForm from './components/forms/uncontrolled-form.tsx';

function App() {
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
        {isUncontrolled ? <UncontrolledForm /> : 'React Hook Form'}
      </Portal>
    </div>
  );
}

export default App;
