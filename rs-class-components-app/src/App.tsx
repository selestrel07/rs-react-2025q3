import './App.css';
import { MainPage } from './pages/main/Main.tsx';
import { ErrorBoundary } from './features/error-boundary/ErrorBoundary.tsx';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { AboutPage } from './pages/about/About.tsx';
import { ABOUT, ANY, MAIN } from './data/path-constants.ts';
import { NotFoundPage } from './pages/not-found/NotFound.tsx';
import { Provider } from 'react-redux';
import { store } from './store.ts';
import { Page } from './pages/Page.tsx';
import { ThemeContextProvider } from './context/ThemeContext.tsx';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary
          fallback={
            <p className="error-container">
              Something went wrong. Please check the console to see the error
              message.
            </p>
          }
        >
          <ThemeContextProvider>
            <Routes>
              <Route element={<Page />}>
                <Route
                  path="/"
                  element={<Navigate to={`${MAIN}/?page=1`} replace />}
                />
                <Route path={MAIN} element={<MainPage />} />
                <Route path={ABOUT} element={<AboutPage />} />
                <Route path={ANY} element={<NotFoundPage />} />
              </Route>
            </Routes>
          </ThemeContextProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
