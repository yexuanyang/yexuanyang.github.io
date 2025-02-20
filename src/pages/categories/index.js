import Layout from '../../components/Layout';
import { getCategories, getArticlesByCategory } from '../../lib/api';
import ArticlesList from '../../components/ArticlesList';
import Link from 'next/link';
import styles from './categories.module.css';

const CategoriesPage = ({ categories = [], categoryArticles = {} }) => {
    return (
        <Layout>
            <div className={styles.container}>
                <h1 className={styles.title}>文章分类</h1>
                <div className={styles.categoriesList}>
                    {categories.map(category => (
                        <section key={category} className={styles.categorySection}>
                            <h2 className={styles.categoryTitle}>{category}</h2>
                            <ArticlesList articles={categoryArticles[category] || []} />
                        </section>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export async function getStaticProps() {
    try {
        const categories = await getCategories();
        const categoryArticles = {};
        
        // 获取每个分类下的文章
        for (const category of categories) {
            categoryArticles[category] = await getArticlesByCategory(category);
        }

        return {
            props: {
                categories: categories || [],
                categoryArticles
            }
        };
    } catch (error) {
        console.error('Error fetching categories:', error);
        return {
            props: {
                categories: [],
                categoryArticles: {}
            }
        };
    }
}

export default CategoriesPage; 