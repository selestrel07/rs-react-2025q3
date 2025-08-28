import './App.css';
import Loader from './components/loader/Loader.tsx';
import { lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const Main = lazy(() => import('./pages/Main.tsx'));
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Loader />}>
        <Main />
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
