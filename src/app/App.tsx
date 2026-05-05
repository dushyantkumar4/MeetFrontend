import "../App.css";
import { Providers } from './Providers';
import { AppRouter } from './Router';

const App = () => {
  return (
    <Providers>
      <AppRouter />
    </Providers>
  );
};

export default App;
