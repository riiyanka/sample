

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import DashboardPage from './pages/DashboardPage';
import FormBuilderPage from './pages/FormBuilderPage';
import ActiveFormsPage from './pages/ActiveFormsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import PreviewPage from './pages/PreviewPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes that use the main layout with a sidebar */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/builder" element={<FormBuilderPage />} />
          <Route path="/active-forms" element={<ActiveFormsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
        </Route>

        {/* Route that does NOT use the main layout (e.g., for previews) */}
        <Route path="/preview" element={<PreviewPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;