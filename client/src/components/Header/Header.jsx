import "./Header.css"

export default function Header() {
    return <>
     <header className="site-header">
        <div className="header-container">
            <a href="#" className="logo">МойСайт</a>
            <nav>
                <ul className="nav-menu">
                    <li><a href="#">Главная</a></li>
                    <li><a href="#">О нас</a></li>
                    <li><a href="#">Услуги</a></li>
                    <li><a href="#">Контакты</a></li>
                </ul>
            </nav>
        </div>
    </header>
    </>
}