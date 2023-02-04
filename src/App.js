import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Loading from "./components/general/Loading";
import MainPage from './components/general/MainPage';
import Index from "./components/user";
import { AuthProvider } from './stores/AuthContext';
import RequireAuth from "./routes/PrivateRoute";
import PublicAuth from "./routes/PublicRoute";
import UserProfile from './components/user/UserProfile';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* <Route path='/' element={<MainPage />} /> */}
            {/* <Route path="/dashboard" element={<Index />} /> */}
            <Route
              path="/"
              element={
                <PublicAuth>
                  <MainPage />
                </PublicAuth>
              }
            />
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <Index />
                </RequireAuth>
              }
            />
            <Route
              path="/user/:userName/:isFollowed"
              element={
                <RequireAuth>
                  <UserProfile />
                </RequireAuth>
              }
            />
            <Route
              path="/login"
              element={
                <PublicAuth>
                  <Login />
                </PublicAuth>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicAuth>
                  <Signup />
                </PublicAuth>
              }
            />
            {/* <Route path='/login' element={<Login />} /> */}
            {/* <Route path='/signup' element={<Signup />} /> */}
          </Routes>
        </BrowserRouter>
        {/* <Loading /> */}
      </AuthProvider>
    </div>
  );
}

export default App;
