import { remark } from 'remark';
import html from 'remark-html';

// 创建一个异步函数来处理服务器端逻辑
async function getServerSideModule() {
    if (typeof window === 'undefined') {
        // 服务器端动态导入
        const fs = await import('fs');
        const path = await import('path');
        const grayMatter = await import('gray-matter');
        const matter = grayMatter.default;  // 修改这里，使用 default 导出
        
        const postsDirectory = path.join(process.cwd(), 'src/content/posts');

        return {
            getAllPosts: function() {
                const fileNames = fs.readdirSync(postsDirectory);
                const allPostsData = fileNames.map(fileName => {
                    const id = fileName.replace(/\.md$/, '');
                    const fullPath = path.join(postsDirectory, fileName);
                    const fileContents = fs.readFileSync(fullPath, 'utf8');
                    const matterResult = matter(fileContents);

                    return {
                        id,
                        ...matterResult.data,
                        views: 0
                    };
                });

                return allPostsData.sort((a, b) => {
                    if (a.date < b.date) {
                        return 1;
                    } else {
                        return -1;
                    }
                });
            },

            getPostById: async function(id) {
                const fullPath = path.join(postsDirectory, `${id}.md`);
                const fileContents = fs.readFileSync(fullPath, 'utf8');
                const matterResult = matter(fileContents);

                const processedContent = await remark()
                    .use(html)
                    .process(matterResult.content);
                const contentHtml = processedContent.toString();

                return {
                    id,
                    contentHtml,
                    ...matterResult.data,
                    views: 0
                };
            },

            getAllPostIds: function() {
                const fileNames = fs.readdirSync(postsDirectory);
                return fileNames.map(fileName => fileName.replace(/\.md$/, ''));
            }
        };
    }
    
    // 客户端返回空方法
    return {
        getAllPosts: () => [],
        getPostById: () => null,
        getAllPostIds: () => []
    };
}

// 导出异步方法
export async function getAllPosts() {
    try {
        const module = await getServerSideModule();
        const posts = module.getAllPosts();
        return Array.isArray(posts) ? posts : [];
    } catch (error) {
        console.error('Error in getAllPosts:', error);
        return [];
    }
}

export async function getPostById(id) {
    const module = await getServerSideModule();
    return module.getPostById(id);
}

export async function getAllPostIds() {
    const module = await getServerSideModule();
    return module.getAllPostIds();
} 