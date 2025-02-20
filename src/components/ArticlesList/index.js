import ViewCounter from '../ViewCounter';
import styles from './ArticlesList.module.css';
import Link from 'next/link';

const ArticlesList = ({ articles = [] }) => {
    // 确保 articles 是数组
    const articlesList = Array.isArray(articles) ? articles : [];

    return (
        <div className={styles.articlesGrid}>
            {articlesList.map(article => (
                <div key={article.id} className={styles.articleCard}>
                    <h2><Link href={`/blog/${article.id}`} className={styles.title}>{article.title}</Link></h2>
                    <div className={styles.articleMeta}>
                        <span className={styles.date}>{article.date}</span>
                        <span className={styles.category}>{article.category}</span>
                        <ViewCounter articleId={article.id} />
                    </div>
                    <p className={styles.summary}>{article.summary}</p>
                    <Link href={`/blog/${article.id}`} className={styles.readMore}>阅读更多</Link>
                </div>
            ))}
        </div>
    );
};

export default ArticlesList;