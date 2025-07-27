import './App.css';
import { MainPage } from './pages/main/Main.tsx';
import { ErrorBoundary } from './features/error-boundary/ErrorBoundary.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import { AboutPage } from './pages/about/About.tsx';
import { ABOUT, ANY, MAIN } from './data/path-constants.ts';
import { NotFoundPage } from './pages/not-found/NotFound.tsx';
import { Header } from './features/ui/header/Header.tsx';

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
        <Header />
        <Routes>
          <Route path={MAIN} element={<MainPage />} />
          <Route path={ABOUT} element={<AboutPage />} />
          <Route path={ANY} element={<NotFoundPage />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
