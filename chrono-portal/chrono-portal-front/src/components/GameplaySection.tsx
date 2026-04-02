import { Gameplay } from '../types';
import './GameplaySection.css';

interface GameplaySectionProps {
  gameplays: Gameplay[];
}

export default function GameplaySection({ gameplays }: GameplaySectionProps) {
  if (!gameplays || gameplays.length === 0) {
    return (
      <section className="gameplay-section section">
        <h2 className="section-title">游戏玩法</h2>
        <div className="gameplay-placeholder">
          <p>从数据库加载游戏玩法说明...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="gameplay-section section">
      <h2 className="section-title">游戏玩法</h2>
      <div className="gameplay-grid">
        {gameplays.map((gameplay) => (
          <div key={gameplay.id} className="gameplay-card">
            {gameplay.iconUrl && (
              <img 
                src={gameplay.iconUrl} 
                alt={gameplay.title}
                className="gameplay-icon"
              />
            )}
            <h3 className="gameplay-title">{gameplay.title}</h3>
            <p className="gameplay-description">{gameplay.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
