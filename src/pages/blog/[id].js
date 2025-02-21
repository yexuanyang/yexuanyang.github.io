import Layout from '../../components/Layout';
import { getPostById, getAllPostIds } from '../../lib/mdx';
import Link from 'next/link';
import styles from './article.module.css';

const ArticlePage = ({ article }) => {
    if (!article) {
        return (
            <Layout>
                <div className={styles.container}>
                    <div className={styles.errorMessage}>
                        文章不存在
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <article className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>{article.title}</h1>
                    <div className={styles.meta}>
                        <span className={styles.date}>{article.date}</span>
                        <Link href={`/articles?category=${encodeURIComponent(article.category)}`} className={styles.category}>{article.category}</Link>
                    </div>
                    <div className={styles.tags}>
                        {article.tags.map(tag => (
                            <Link 
                                key={tag} 
                                href={`/articles?tag=${encodeURIComponent(tag)}`}
                                className={styles.tag}
                            >#{tag}</Link>
                        ))}
                    </div>
                </header>

                <div 
                    className={styles.content}
                    dangerouslySetInnerHTML={{ __html: article.contentHtml }}
                />

                <footer className={styles.footer}>
                    <div className={styles.navigation}>
                        <Link href="/blog" className={styles.backButton}>返回文章列表</Link>
                    </div>
                </footer>
            </article>
        </Layout>
    );
};

// 这个函数在构建时运行，生成所有可能的文章路径
export async function getStaticPaths() {
    const ids = await getAllPostIds();
    const paths = ids.map(id => ({
        params: { id }
    }));

    return {
        paths,
        fallback: false
    };
}

// 这个函数在构建时为每个文章路径生成数据
export async function getStaticProps({ params }) {
    const article = await getPostById(params.id);
    
    return {
        props: {
            article: article || null
        }
    };
}

export default ArticlePage;