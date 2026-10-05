import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';
import UsersPage from './pages/Users';
import LandingPage from './pages/LandingPage';
import Contact from './pages/Contact';
import ContactMessages from './pages/ContactMessages';
import Chat from './pages/Chat';
import PublicContentPage from './pages/PublicContentPage';
import Navbar from './components/Navbar';
import { useAuth } from './context/AuthContext';

const HomeRoute = () => {
  const { user, loading } = useAuth();
  if (loading) return <div role="status">Loading...</div>;
  return user ? <Layout><Dashboard /></Layout> : <LandingPage />;
};

const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div role="status">Loading...</div>;
  return user ? <Navigate to="/" replace /> : children;
};

const PrivateRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (requiredRole && user.role !== requiredRole) return <Navigate to="/" replace />;
  return <Layout>{children}</Layout>;
};

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
          <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
          <Route path="/" element={<HomeRoute />} />
          <Route path="/features" element={<PublicContentPage page="features" />} />
          <Route path="/how-it-works" element={<PublicContentPage page="how-it-works" />} />
          <Route path="/about" element={<PublicContentPage page="about" />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact-messages" element={<PrivateRoute requiredRole="ROLE_ADMIN"><ContactMessages /></PrivateRoute>} />
          <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
          <Route path="/projects" element={<PrivateRoute><Projects /></PrivateRoute>} />
          <Route path="/tasks" element={<PrivateRoute><Tasks /></PrivateRoute>} />
          <Route path="/users" element={<PrivateRoute requiredRole="ROLE_ADMIN"><UsersPage /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
