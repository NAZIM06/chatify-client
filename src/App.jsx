import { Outlet } from 'react-router-dom';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
   <>
  <Outlet></Outlet>
   </>
  );
};

export default App;