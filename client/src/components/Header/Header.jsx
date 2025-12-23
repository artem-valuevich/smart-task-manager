import "./Header.css";

export default function Header() {
  return (
    <>
      <div className="header">
        <div className="header-logo">
          <div className="logo-icon">✓</div>
          <div>
            <div className="logo-text">TaskManager</div>
            <div className="logo-subtext">Управление задачами</div>
          </div>
        </div>

        <div className="header-actions">
          <div className="user-info">
            <div className="user-avatar">ИИ</div>
            <span className="user-name">Иван Иванов</span>
          </div>
        </div>
      </div>
    </>
  );
}
