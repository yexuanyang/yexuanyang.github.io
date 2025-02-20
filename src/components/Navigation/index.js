import Link from 'next/link';
const Navigation = () => {
    return (
        <nav className="nav">
            <Link className="nav-link" href="/">首页</Link>
            <Link className="nav-link" href="/blog">博客</Link>
            <Link className="nav-link" href="/categories">分类</Link>
            <Link className="nav-link" href="/about">关于</Link>
        </nav>
    );
};

export default Navigation;