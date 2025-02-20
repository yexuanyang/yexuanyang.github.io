import { getAllPosts } from './mdx';
import { getViews, incrementViews } from './store';

let cachedPosts = null;

// 获取所有文章
export const getArticles = async () => {
    try {
        if (typeof window === 'undefined') {
            // 服务器端
            const posts = await getAllPosts();
            cachedPosts = Array.isArray(posts) ? posts.map(post => ({
                ...post,
                views: getViews(post.id)
            })) : [];
            return cachedPosts;
        }
        // 客户端
        return cachedPosts || [];
    } catch (error) {
        console.error('Error in getArticles:', error);
        return [];
    }
};

// 获取单篇文章
export const getArticle = async (id) => {
    const articles = await getArticles();
    const article = articles.find(article => article.id === id);
    if (article) {
        return {
            ...article,
            views: getViews(id)
        };
    }
    return null;
};

// 获取所有分类
export const getCategories = async () => {
    try {
        const articles = await getArticles();
        if (!Array.isArray(articles)) {
            return [];
        }
        const categories = new Set(articles.map(article => article.category).filter(Boolean));
        return Array.from(categories);
    } catch (error) {
        console.error('Error in getCategories:', error);
        return [];
    }
};

// 获取所有标签
export const getTags = async () => {
    const articles = await getArticles();
    const tags = new Set();
    articles.forEach(article => {
        article.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
};

// 获取所有分类
export const getArticlesByCategory = async (category) => {
    try {
        const articles = await getArticles();
        if (!Array.isArray(articles)) {
            return [];
        }
        return articles.filter(article => article.category === category);
    } catch (error) {
        console.error('Error in getArticlesByCategory:', error);
        return [];
    }
};

// 获取文章浏览数
export const getArticleViews = (id) => {
    return getViews(id);
};

// 增加文章浏览数
export const incrementArticleViews = (id) => {
    return incrementViews(id);
}; 