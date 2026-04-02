import { DevProcess } from '../types';
import './DevProcessSection.css';

interface DevProcessSectionProps {
  devProcesses: DevProcess[];
}

export default function DevProcessSection({ devProcesses }: DevProcessSectionProps) {
  if (!devProcesses || devProcesses.length === 0) {
    return (
      <section className="dev-process-section section">
        <h2 className="section-title">游戏制作过程</h2>
        <div className="dev-process-placeholder">
          <p>从数据库加载制作过程说明...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="dev-process-section section">
      <h2 className="section-title">游戏制作过程</h2>
      <div className="dev-process-list">
        {devProcesses.map((process, index) => (
          <div key={process.id} className={`dev-process-item ${index % 2 === 0 ? 'left' : 'right'}`}>
            <div className="dev-process-image">
              {process.imageUrl && (
                <img src={process.imageUrl} alt={process.title} />
              )}
            </div>
            <div className="dev-process-content">
              <h3 className="dev-process-title">{process.title}</h3>
              <p className="dev-process-description">{process.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
