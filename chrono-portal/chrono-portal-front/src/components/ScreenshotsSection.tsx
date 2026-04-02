import { GameScreenshot } from '../types';
import './ScreenshotsSection.css';

interface ScreenshotsSectionProps {
  screenshots: GameScreenshot[];
}

export default function ScreenshotsSection({ screenshots }: ScreenshotsSectionProps) {
  if (!screenshots || screenshots.length === 0) {
    return (
      <section className="screenshots-section section">
        <h2 className="section-title">游戏截图</h2>
        <div className="screenshots-placeholder">
          <p>从数据库加载游戏截图...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="screenshots-section section">
      <h2 className="section-title">游戏截图</h2>
      <div className="screenshots-container">
        <div className="screenshots-scroll">
          {screenshots.map((screenshot) => (
            <div key={screenshot.id} className="screenshot-item">
              <img 
                src={screenshot.imageUrl} 
                alt={screenshot.title}
                className="screenshot-image"
              />
              <p className="screenshot-title">{screenshot.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
