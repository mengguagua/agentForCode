import { DevProcess } from '../types';
import './DevProcessSection.css';

interface DevProcessSectionProps {
  devProcesses: DevProcess[];
}

// Default development process
const defaultProcesses: DevProcess[] = [
  {
    id: 1,
    title: '概念设计',
    description: '从构思到概念，我们设计了独特的时空主题和卡牌机制。每个卡牌都有精心策划的能力和视觉效果。',
    imageUrl: '/assets/sprite/book-sprite.png',
    sortOrder: 1,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 2,
    title: '美术创作',
    description: '我们的美术团队创造了数百张精美的卡牌插画、时空背景和特效动画。所有资源都经过精心打磨。',
    imageUrl: '/assets/ui/card/ATTACK.png',
    sortOrder: 2,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 3,
    title: '程序开发',
    description: '使用最新的游戏引擎开发核心战斗系统、卡牌动画和用户界面。确保流畅的游戏体验。',
    imageUrl: '/assets/sprite/icon-hud.png',
    sortOrder: 3,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 4,
    title: '测试优化',
    description: '经过多轮内部测试和玩家反馈，持续优化游戏平衡性和用户体验，打造精品卡牌游戏。',
    imageUrl: '/assets/sprite/dice-flat.png',
    sortOrder: 4,
    createdAt: '',
    updatedAt: '',
  },
];

export default function DevProcessSection({ devProcesses }: DevProcessSectionProps) {
  const displayProcesses = devProcesses && devProcesses.length > 0 ? devProcesses : defaultProcesses;

  return (
    <section className="dev-process-section section" id="dev-process">
      <div className="container">
        <h2 className="section-title">开发历程</h2>
        <div className="dev-process-list">
          {displayProcesses.map((process, index) => (
            <div
              key={process.id}
              className={`dev-process-item ${index % 2 === 0 ? 'left' : 'right'}`}
            >
              <div className="dev-process-image">
                {process.imageUrl && (
                  <img src={process.imageUrl} alt={process.title} />
                )}
              </div>
              <div className="dev-process-content">
                <span className="dev-process-step">步骤 {index + 1}</span>
                <h3 className="dev-process-title">{process.title}</h3>
                <p className="dev-process-description">{process.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
