import AppRoutes from './routes/AppRoutes';
import { Navbar, Footer, Emergency } from './components';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
};

export default App;

