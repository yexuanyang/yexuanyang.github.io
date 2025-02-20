import Layout from '../../components/Layout';
import Sidebar from '../../components/Sidebar';
import ArticlesList from '../../components/ArticlesList';
import { getArticles } from '../../lib/api';
import styles from './blog.module.css';

const BlogList = ({ articles }) => {
    return (
        <Layout>
            <div className={styles.pageContainer}>
                <Sidebar articles={articles} />
                <main className={styles.mainContent}>
                    <h1>最新文章</h1>
                    <ArticlesList articles={articles} />
                </main>
            </div>
        </Layout>
    );
};

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

export default BlogList; 