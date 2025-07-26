import './App.css';
import { MainPage } from './pages/main/Main.tsx';
import { ErrorBoundary } from './features/error-boundary/ErrorBoundary.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Path } from './enums/Path.ts';

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary
        fallback={
          <p className="error-container">
            Something went wrong. Please check the console to see the error
            message.
          </p>
        }
      >
        <Routes>
          <Route path={Path.MAIN} element={<MainPage />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
