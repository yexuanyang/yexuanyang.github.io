import Link from 'next/link';
import styles from './Navigation.module.css';

const Navigation = () => {
    return (
        <nav className={styles.nav}>
            <Link className={styles.navLink} href="/">首页</Link>
            <Link className={styles.navLink} href="/blog">博客</Link>
            <Link className={styles.navLink} href="/categories">分类</Link>
            <Link className={styles.navLink} href="/about">关于</Link>
        </nav>
    );
};

export default Navigation;