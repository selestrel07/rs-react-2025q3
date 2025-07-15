import './App.css';
import { MainPage } from './pages/Main.tsx';
import { ErrorBoundary } from './features/error-boundary/ErrorBoundary.tsx';

function App() {
  return (
    <ErrorBoundary
      fallback={
        <p className="error-container">
          Something went wrong. Please check the console to see the error
          message.
        </p>
      }
    >
      <MainPage />
    </ErrorBoundary>
  );
}

export default App;
