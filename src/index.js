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
const articles = null;

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