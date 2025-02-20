import Layout from '../../components/Layout';
import Sidebar from '../../components/Sidebar';
import ArticlesList from '../../components/ArticlesList';
import { getArticles } from '../../lib/api';
import styles from './articles.module.css';

const Articles = ({ query, articles }) => {
    let filteredArticles = articles || [];
    let pageTitle = '所有文章';

    // 根据分类筛选
    if (query.category) {
        filteredArticles = filteredArticles.filter(article => article.category === query.category);
        pageTitle = `${query.category} 分类下的文章`;
    }

    // 根据标签筛选
    if (query.tag) {
        filteredArticles = filteredArticles.filter(article => article.tags.includes(query.tag));
        pageTitle = `标签：${query.tag}`;
    }

    return (
        <Layout>
            <div className={styles.pageContainer}>
                <Sidebar 
                    articles={articles} 
                    currentCategory={query.category}
                    currentTag={query.tag}
                />
                <main className={styles.mainContent}>
                    <h1 className={styles.pageTitle}>{pageTitle}</h1>
                    {filteredArticles.length > 0 ? (
                        <ArticlesList articles={filteredArticles} />
                    ) : (
                        <div className={styles.noResults}>
                            没有找到相关文章
                        </div>
                    )}
                </main>
            </div>
        </Layout>
    );
};

// 获取服务端参数
export async function getServerSideProps({ query }) {
    try {
        const articles = await getArticles();
        return {
            props: { 
                articles: articles || [],
                query: {
                    category: query.category || null,
                    tag: query.tag || null
                }
            }
        };
    } catch (error) {
        console.error('Error fetching articles:', error);
        return {
            props: {
                articles: [],
                query: {
                    category: query.category || null,
                    tag: query.tag || null
                }
            }
        };
    }
}

export default Articles;