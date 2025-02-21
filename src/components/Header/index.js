const Header = () => {
    return (
        <header className="nav">
            <div className="nav-container">
                <a href="/" className="nav-brand">人生何处不青山</a>
                <div className="nav-links">
                    <a href="/" className="nav-link">首页</a>
                    <a href="/blog" className="nav-link">文章</a>
                    <a href="/categories" className="nav-link">分类</a>
                    <a href="/about" className="nav-link">关于我</a>
                </div>
            </div>
        </header>
    );
};

export default Header; 