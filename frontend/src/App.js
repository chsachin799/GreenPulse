import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { GlobalProvider, useGlobalContext } from './context/GlobalContext';
import Background from './components/Background';
import HUDOverlay from './components/HUDOverlay';
import Header from './components/Header';
import PredictionForm from './components/PredictionForm';
import Dashboard from './components/Dashboard';
import HistorySidebar from './components/HistorySidebar';
import ErrorBoundary from './components/ErrorBoundary';
import ComparisonView from './components/ComparisonView';

import './App.css';

const AppContent = () => {
  const { result, history, showComparison, setShowComparison } = useGlobalContext();

  const gridStyle = history.length > 0 ?
    { display: 'grid', gridTemplateColumns: 'minmax(300px, 350px) 1fr 280px', gap: '20px', padding: '20px 0' } :
    { display: 'grid', gridTemplateColumns: 'minmax(350px, 400px) 1fr', gap: '20px', padding: '20px 0' };

  return (
    <>
      <Background ecoScore={result?.eco_score} />
      <HUDOverlay ecoScore={result?.eco_score || 100} />

      <div className="App">
        <Header />

        {/* Comparison Modal */}
        <AnimatePresence>
          {showComparison && <ComparisonView onClose={() => setShowComparison(false)} />}
        </AnimatePresence>

        <main className="container" style={gridStyle}>
          {/* Left Column: Controls */}
          <PredictionForm />

          {/* Center Column: Visualization */}
          <ErrorBoundary>
            <Dashboard />
          </ErrorBoundary>

          {/* Right Column: History */}
          <HistorySidebar />
        </main >
      </div >
    </>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <GlobalProvider>
        <AppContent />
      </GlobalProvider>
    </ErrorBoundary>
  );
}

export default App;