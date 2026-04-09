import { Banner as BannerType } from '../types';
import './Banner.css';

interface BannerProps {
  banners: BannerType[];
}

// Sample card images from assets - these will be used as floating cards
const cardImages = [
  '/assets/ui/card/ATTACK.png',
  '/assets/ui/card/DEFEND.png',
  '/assets/sprite/drawPile-sheet.png',
];

export default function Banner({ banners }: BannerProps) {
  if (!banners || banners.length === 0) {
    return (
      <section className="banner-section">
        {/* Animated Particles */}
        <div className="banner-particles">
          <div className="banner-particle"></div>
          <div className="banner-particle"></div>
          <div className="banner-particle"></div>
          <div className="banner-particle"></div>
          <div className="banner-particle"></div>
          <div className="banner-particle"></div>
          <div className="banner-particle"></div>
        </div>

        <div className="banner-container">
          <div className="banner-content">
            {/* Left Side - Text */}
            <div className="banner-text">
              <span className="banner-badge">时空调牌师</span>
              <h1 className="banner-title">
                CHRONO PORTAL
                <span>时空调牌师</span>
              </h1>
              <p className="banner-description">
                踏入时空裂缝，收集传奇卡牌，组建你的专属牌组。
                在回合制策略对战中运用时间魔法，击败来自不同时空的敌人。
                成为真正的时空调牌师！
              </p>
              <div className="banner-buttons">
                <button className="btn-primary">开始游戏</button>
                <button className="btn-secondary">了解更多</button>
              </div>
            </div>

            {/* Right Side - Floating Cards */}
            <div className="banner-cards">
              <div className="floating-card">
                <img src={cardImages[0]} alt="Attack Card" />
              </div>
              <div className="floating-card">
                <img src={cardImages[1]} alt="Defend Card" />
              </div>
              <div className="floating-card">
                <img src={cardImages[2]} alt="Draw Pile" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <span>向下滚动</span>
          <div className="scroll-arrow"></div>
        </div>
      </section>
    );
  }

  // If banners exist, display the first one with enhanced styling
  const mainBanner = banners[0];

  return (
    <section className="banner-section">
      {/* Animated Particles */}
      <div className="banner-particles">
        <div className="banner-particle"></div>
        <div className="banner-particle"></div>
        <div className="banner-particle"></div>
        <div className="banner-particle"></div>
        <div className="banner-particle"></div>
        <div className="banner-particle"></div>
        <div className="banner-particle"></div>
      </div>

      <div className="banner-container">
        <div className="banner-content">
          {/* Left Side - Text */}
          <div className="banner-text">
            <span className="banner-badge">时空调牌师</span>
            <h1 className="banner-title">
              {mainBanner.title}
              <span>{mainBanner.subtitle}</span>
            </h1>
            <p className="banner-description">
              踏入时空裂缝，收集传奇卡牌，组建你的专属牌组。
              在回合制策略对战中运用时间魔法，击败来自不同时空的敌人。
              成为真正的时空调牌师！
            </p>
            <div className="banner-buttons">
              <button className="btn-primary">开始游戏</button>
              <button className="btn-secondary">了解更多</button>
            </div>
          </div>

          {/* Right Side - Banner Image or Floating Cards */}
          <div className="banner-cards">
            {mainBanner.imageUrl ? (
              <div className="floating-card" style={{ left: '40px', transform: 'rotate(-3deg)' }}>
                <img src={mainBanner.imageUrl} alt={mainBanner.title} />
              </div>
            ) : (
              <>
                <div className="floating-card">
                  <img src={cardImages[0]} alt="Attack Card" />
                </div>
                <div className="floating-card">
                  <img src={cardImages[1]} alt="Defend Card" />
                </div>
                <div className="floating-card">
                  <img src={cardImages[2]} alt="Draw Pile" />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <span>向下滚动</span>
        <div className="scroll-arrow"></div>
      </div>
    </section>
  );
}
