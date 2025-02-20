const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// 设置模板引擎
app.set('view engine', 'ejs');
const viewsPath = path.join(__dirname, '../views');
app.set('views', viewsPath);
console.log('Views directory:', viewsPath);

// 模拟文章数据
const articles = [
    {
        id: 1,
        title: '如何开始写技术博客',
        date: '2024-01-15',
        category: '技术写作',
        summary: '写技术博客不仅能够帮助他人学习，还能提升自己的技术水平...',
        content: `
            写技术博客是一个非常有价值的习惯。通过写博客，你不仅能够帮助他人学习，还能提升自己的技术水平。
            
            以下是开始写技术博客的几个关键步骤：
            
            1. 选择你擅长的主题
            首先从你最熟悉的技术领域开始写作。这样你能够提供最有价值的内容，同时写作过程也会更加流畅。
            
            2. 建立写作习惯
            保持规律的更新频率很重要。可以先定一个相对容易达到的目标，比如每周一篇。
            
            3. 注重内容质量
            确保你的文章具有实用价值，包含具体的代码示例和实际应用场景。
            
            4. 持续学习和改进
            通过读者的反馈不断改进你的写作风格和内容质量。
        `,
        tags: ['技术博客', '写作技巧', '经验分享']
    },
    {
        id: 2,
        title: 'Node.js 最佳实践',
        date: '2024-01-10',
        category: '后端开发',
        summary: '本文总结了在 Node.js 开发中常见的最佳实践和注意事项...',
        content: `
            在 Node.js 开发中，遵循最佳实践能够帮助我们写出更好的代码。
            
            以下是一些重要的最佳实践：
            
            1. 错误处理
            始终使用 try-catch 处理可能的异常，特别是在异步操作中。
            
            2. 配置管理
            使用环境变量和配置文件管理不同环境的配置。
            
            3. 日志记录
            实现合适的日志策略，便于问题排查和监控。
            
            4. 代码组织
            遵循模块化原则，合理组织代码结构。
        `,
        tags: ['Node.js', '最佳实践', '后端开发']
    },
    {
        id: 3,
        title: '前端性能优化技巧',
        date: '2024-01-05',
        category: '前端开发',
        summary: '探讨现代前端应用中常用的性能优化方法和工具...',
        content: `
            前端性能优化是提升用户体验的关键因素。
            
            常见的优化方法包括：
            
            1. 资源加载优化
            - 使用懒加载
            - 合理使用缓存
            - 压缩静态资源
            
            2. 渲染性能优化
            - 避免重排和重绘
            - 使用虚拟列表
            - 优化关键渲染路径
            
            3. 代码优化
            - 代码分割
            - Tree Shaking
            - 使用性能更好的算法
        `,
        tags: ['前端开发', '性能优化', 'Web开发']
    }
];

// 首页路由
app.get('/', (req, res) => {
    res.render('welcome', { title: '欢迎' });
});

// 文章列表页
app.get('/articles', (req, res) => {
    const { category, tag } = req.query;
    let filteredArticles = articles;

    if (category) {
        filteredArticles = filteredArticles.filter(article => article.category === category);
    }

    if (tag) {
        filteredArticles = filteredArticles.filter(article => article.tags.includes(tag));
    }

    res.render('articles', { 
        title: '文章列表',
        articles: filteredArticles,
        category,
        selectedTag: tag
    });
});

// 关于页面
app.get('/about', (req, res) => {
    res.render('about', { title: '关于我' });
});

// API 路由
app.get('/api', (req, res) => {
    res.json({ message: '欢迎访问 API' });
});

// 文章详情页路由
app.get('/articles/:id', (req, res) => {
    const articleId = parseInt(req.params.id);
    const article = articles.find(a => a.id === articleId);
    
    if (!article) {
        return res.status(404).render('404', { title: '页面未找到' });
    }
    
    res.render('article-detail', { 
        article,
        totalArticles: articles.length
    });
});

app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
    console.log('当前工作目录:', process.cwd());
}); 