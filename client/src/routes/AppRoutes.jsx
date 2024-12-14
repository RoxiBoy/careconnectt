import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Login, Signup, TraceChild, TraceMother }from '../pages';
import { DashboardPage, TrackMother, TrackChild } from '../components';
import PregnancyEmergencyTips from '../pages/PregnencyEmergency';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/tracechild" element={<TrackChild />} />
        <Route path="/tracemother" element={<TraceMother />} />
        <Route path="/trackmother" element={<TrackMother />} />
        <Route path="/trackchild" element={<TraceChild />} />
        <Route path="/pregnencyemergency" element={<PregnancyEmergencyTips />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
