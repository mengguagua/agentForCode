import { Gameplay } from '../types';
import './GameplaySection.css';

interface GameplaySectionProps {
  gameplays: Gameplay[];
}

// Default gameplay features with icons
const defaultGameplays: Gameplay[] = [
  {
    id: 1,
    title: '卡牌收集',
    description: '从时空裂缝中收集数百张独特的卡牌，每张卡牌都有不同的能力和效果',
    iconUrl: '/assets/sprite/drawPile-sheet.png',
    sortOrder: 1,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 2,
    title: '策略对战',
    description: '运用你的智慧和策略，在回合制对战中击败来自不同时空的对手',
    iconUrl: '/assets/ui/card/ATTACK.png',
    sortOrder: 2,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 3,
    title: '牌组构建',
    description: '自由组合你的卡牌，打造独一无二的强力牌组，发现强大的卡牌协同效果',
    iconUrl: '/assets/sprite/book-sprite.png',
    sortOrder: 3,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 4,
    title: '时空冒险',
    description: '穿越不同的时空维度，探索神秘的世界，完成各种挑战和任务',
    iconUrl: '/assets/ui/index-back-2.png',
    sortOrder: 4,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 5,
    title: '升级强化',
    description: '通过战斗和合成来强化你的卡牌，解锁更强大的技能和属性',
    iconUrl: '/assets/sprite/energy.png',
    sortOrder: 5,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 6,
    title: '竞技排名',
    description: '在排位赛中挑战其他玩家，提升你的段位，获取丰厚的奖励',
    iconUrl: '/assets/ui/relic/template.png',
    sortOrder: 6,
    createdAt: '',
    updatedAt: '',
  },
];

export default function GameplaySection({ gameplays }: GameplaySectionProps) {
  const displayGameplays = gameplays && gameplays.length > 0 ? gameplays : defaultGameplays;

  return (
    <section className="gameplay-section section" id="gameplay">
      <div className="container">
        <h2 className="section-title">游戏特色</h2>
        <div className="gameplay-grid">
          {displayGameplays.map((gameplay, index) => (
            <div
              key={gameplay.id}
              className="gameplay-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
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
      </div>
    </section>
  );
}
