import { useState, useEffect } from 'react';
import { fetchHomePageData } from './api';
import { HomePageData } from './types';
import Banner from './components/Banner';
import GameplaySection from './components/GameplaySection';
import ScreenshotsSection from './components/ScreenshotsSection';
import DevProcessSection from './components/DevProcessSection';
import Footer from './components/Footer';

function App() {
  const [data, setData] = useState<HomePageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const homeData = await fetchHomePageData();
        setData(homeData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <p>加载中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <p>错误: {error}</p>
      </div>
    );
  }

  return (
    <div className="app">
      <Banner banners={data?.banners || []} />
      <GameplaySection gameplays={data?.gameplays || []} />
      <ScreenshotsSection screenshots={data?.screenshots || []} />
      <DevProcessSection devProcesses={data?.devProcesses || []} />
      <Footer />
    </div>
  );
}

export default App;
