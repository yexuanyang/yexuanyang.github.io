import Link from 'next/link';
import styles from './Sidebar.module.css';

const Sidebar = ({ articles = [], currentCategory, currentTag }) => {
    // 确保 articles 是数组
    const articlesList = Array.isArray(articles) ? articles : [];

    // 计算每个分类的文章数量
    const categoryCount = articlesList.reduce((acc, article) => {
        acc[article.category] = (acc[article.category] || 0) + 1;
        return acc;
    }, {});

    // 计算每个标签的文章数量
    const tagCount = articlesList.reduce((acc, article) => {
        if (article.tags && Array.isArray(article.tags)) {
            article.tags.forEach(tag => {
                acc[tag] = (acc[tag] || 0) + 1;
            });
        }
        return acc;
    }, {});

    return (
        <div className={styles.sidebar}>
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>分类</h2>
                <ul className={styles.categoryList}>
                    {Object.entries(categoryCount).map(([category, count]) => (
                        <li 
                            key={category}
                            className={`${styles.categoryItem} ${currentCategory === category ? styles.active : ''}`}
                        >
                            <Link 
                                href={`/articles?category=${encodeURIComponent(category)}`}
                                className={styles.categoryLink}
                            >
                                {category} ({count})
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>标签</h2>
                <div className={styles.tagCloud}>
                    {Object.entries(tagCount).map(([tag, count]) => (
                        <Link 
                            key={tag}
                            href={`/articles?tag=${encodeURIComponent(tag)}`}
                            className={`${styles.tag} ${currentTag === tag ? styles.activeTag : ''}`}
                        >
                            {tag} ({count})
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Sidebar;