import './App.css';
import Routes from './routes';
import AuthProvider from './context/auth/Provider'

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )

}

export default App;
