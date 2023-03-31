import './App.css';
import { AppProvider } from './Context/AppContext';
import { Router } from './Components/Router';

function App() {
  return (
    <AppProvider>
      <Router/>
    </AppProvider>
  );
}

export default App;
