import Layout from '../components/Layout';
import Background from '../components/Background';
import Ferris from '../components/Ferris';
import { getArticles } from '../lib/api';
import Link from 'next/link';
import styles from './home.module.css';
import ViewCounter from '../components/ViewCounter';

const Home = ({ articles = [] }) => {
    // 获取最近一周的文章
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const recentArticles = articles
        .filter(article => {
            const articleDate = new Date(article.date);
            return articleDate >= oneWeekAgo;
        })
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <Layout>
            <Background />
            <div className={styles.container}>
                <div className={styles.hero}>
                    <h1>欢迎来到我的博客</h1>
                    <p className="description">
                        这里是我分享技术、生活和想法的地方。<br/>
                        希望能与你一起探讨、学习、成长。
                    </p>
                    <Link href="/blog" className="cta-button">浏览文章</Link>
                </div>

                {recentArticles.length > 0 && (
                    <section className={styles.recentArticles}>
                        <h2 className={styles.sectionTitle}>最近更新</h2>
                        <div className={styles.articlesGrid}>
                            {recentArticles.map(article => (
                                <article key={article.id} className={styles.articleCard}>
                                    <h3 className={styles.articleTitle}>
                                        <Link href={`/blog/${article.id}`} className={styles.articleTitle}>{article.title}</Link>
                                    </h3>
                                    <div className={styles.articleMeta}>
                                        <span className={styles.date}>{article.date}</span>
                                        <span className={styles.category}>{article.category}</span>
                                        <ViewCounter articleId={article.id} />
                                    </div>
                                    <p className={styles.summary}>{article.summary}</p>
                                    <div className={styles.tags}>
                                        {article.tags.map(tag => (
                                            <Link 
                                                key={tag} 
                                                href={`/articles?tag=${encodeURIComponent(tag)}`}
                                                className={styles.tag}
                                            >#{tag}</Link>
                                        ))}
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                )}
            </div>
            <Ferris />
        </Layout>
    );
};

// 添加 getStaticProps 来获取文章数据
export async function getStaticProps() {
    try {
        const articles = await getArticles();
        return {
            props: {
                articles: articles || []
            }
        };
    } catch (error) {
        console.error('Error fetching articles:', error);
        return {
            props: {
                articles: []
            }
        };
    }
}

export default Home;