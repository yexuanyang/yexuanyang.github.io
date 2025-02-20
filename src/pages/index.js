import Layout from '../components/Layout';
import Background from '../components/Background';
import Ferris from '../components/Ferris';
import { getArticles } from '../lib/api';
import Link from 'next/link';

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
            <div className="home-container">
                <div className="home-hero">
                    <h1>欢迎来到我的博客</h1>
                    <p className="home-description">
                        这里是我分享技术、生活和想法的地方。<br/>
                        希望能与你一起探讨、学习、成长。
                    </p>
                    <Link href="/blog" className="home-cta-button">浏览文章</Link>
                </div>

                {recentArticles.length > 0 && (
                    <section className="home-recent-articles">
                        <h2 className="home-section-title">最近更新</h2>
                        <div className="home-articles-grid">
                            {recentArticles.map(article => (
                                <article key={article.id} className="home-article-card">
                                    <h3 className="home-article-title">
                                        <Link href={`/blog/${article.id}`}>{article.title}</Link>
                                    </h3>
                                    <div className="home-article-meta">
                                        <span>{article.date}</span>
                                        <span>{article.category}</span>
                                        <ViewCounter articleId={article.id} />
                                    </div>
                                    <p className="summary">{article.summary}</p>
                                    <div className="home-tags">
                                        {article.tags.map(tag => (
                                            <Link 
                                                key={tag} 
                                                href={`/articles?tag=${encodeURIComponent(tag)}`}
                                                className="home-tag"
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