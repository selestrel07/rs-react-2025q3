import './App.css';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import Main from './components/main/Main.tsx';
import List from './components/list/List.tsx';

function App() {

  return (
    <Provider store={store}>
      <Main/>
      <List />
    </Provider>
  );
}

export default App;
