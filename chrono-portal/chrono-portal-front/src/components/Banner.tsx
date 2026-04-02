import { Banner as BannerType } from '../types';
import './Banner.css';

interface BannerProps {
  banners: BannerType[];
}

export default function Banner({ banners }: BannerProps) {
  if (!banners || banners.length === 0) {
    return (
      <section className="banner-section">
        <div className="banner-placeholder">
          <h2>游戏宣传 Banner</h2>
          <p>从数据库加载宣传图片...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="banner-section">
      <div className="banner-container">
        {banners.map((banner) => (
          <div key={banner.id} className="banner-item">
            <img 
              src={banner.imageUrl} 
              alt={banner.title}
              className="banner-image"
            />
            <div className="banner-overlay">
              <h2 className="banner-title">{banner.title}</h2>
              <p className="banner-subtitle">{banner.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
