import './App.css';

import AppRouter from './app.router';
import { Toaster } from 'react-hot-toast';
import NavBarComponent from './components/nav-bar.component';
import authService from './services/auth.service'

import ErrorBoundary from './funcs/ErrorBoundary';
function App() {
  const authUser=authService.getAuthUser();
  return (
      
    <div className="container">
      
     
    
      <AppRouter />
      
      <Toaster position="top-right" />
    </div>
   

  );
}

export default App;
