import { GameScreenshot } from '../types';
import './ScreenshotsSection.css';

interface ScreenshotsSectionProps {
  screenshots: GameScreenshot[];
}

// Default screenshots using available assets
const defaultScreenshots: GameScreenshot[] = [
  {
    id: 1,
    title: '时空战场',
    imageUrl: '/assets/ui/battleBackground/template.png',
    sortOrder: 1,
    createdAt: '',
  },
  {
    id: 2,
    title: '卡牌收集',
    imageUrl: '/assets/ui/card/template.png',
    sortOrder: 2,
    createdAt: '',
  },
  {
    id: 3,
    title: '能量系统',
    imageUrl: '/assets/sprite/energy.png',
    sortOrder: 3,
    createdAt: '',
  },
  {
    id: 4,
    title: '遗迹探索',
    imageUrl: '/assets/ui/relic/template.png',
    sortOrder: 4,
    createdAt: '',
  },
  {
    id: 5,
    title: '牌组构建',
    imageUrl: '/assets/sprite/book-sprite.png',
    sortOrder: 5,
    createdAt: '',
  },
];

export default function ScreenshotsSection({ screenshots }: ScreenshotsSectionProps) {
  const displayScreenshots = screenshots && screenshots.length > 0 ? screenshots : defaultScreenshots;

  return (
    <section className="screenshots-section section" id="screenshots">
      <div className="container">
        <h2 className="section-title">游戏截图</h2>
      </div>
      <div className="screenshots-container">
        <div className="screenshots-scroll">
          {displayScreenshots.map((screenshot, index) => (
            <div
              key={screenshot.id}
              className="screenshot-item"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
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
