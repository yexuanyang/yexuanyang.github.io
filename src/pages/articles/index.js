import Layout from '../../components/Layout';
import Sidebar from '../../components/Sidebar';
import ArticlesList from '../../components/ArticlesList';
import { getArticles } from '../../lib/api';
import { useRouter } from 'next/router';
import styles from './articles.module.css';

const Articles = ({ articles }) => {
    const router = useRouter();
    const { category, tag } = router.query;
    let filteredArticles = articles || [];
    let pageTitle = '所有文章';

    // 根据分类筛选
    if (category) {
        filteredArticles = filteredArticles.filter(article => article.category === category);
        pageTitle = `${category} 分类下的文章`;
    }

    // 根据标签筛选
    if (tag) {
        filteredArticles = filteredArticles.filter(article => article.tags.includes(tag));
        pageTitle = `标签：${tag}`;
    }

    return (
        <Layout>
            <div className={styles.pageContainer}>
                <Sidebar 
                    articles={articles} 
                    currentCategory={category}
                    currentTag={tag}
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

// 静态生成页面
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