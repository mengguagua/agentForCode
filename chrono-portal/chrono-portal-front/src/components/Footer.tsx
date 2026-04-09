import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">⚔ CHRONO PORTAL ⚔</div>

        <h3>联系我们</h3>

        <div className="footer-contact">
          <div className="footer-contact-item">
            <span>📧</span>
            <span>contact@chronoportal.com</span>
          </div>
          <div className="footer-contact-item">
            <span>📞</span>
            <span>400-888-8888</span>
          </div>
        </div>

        <div className="footer-links">
          <a href="#" className="footer-link">游戏下载</a>
          <a href="#" className="footer-link">用户协议</a>
          <a href="#" className="footer-link">隐私政策</a>
          <a href="#" className="footer-link">常见问题</a>
        </div>

        <div className="footer-social">
          <a href="#" className="social-icon" title="微信公众号">💬</a>
          <a href="#" className="social-icon" title="微博">📱</a>
          <a href="#" className="social-icon" title="Discord">🎮</a>
        </div>

        <p>时空调牌师 - 一款融合时间魔法的策略卡牌游戏</p>
        <p className="copyright">© 2024 Chrono Portal. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
