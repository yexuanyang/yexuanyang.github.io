import { getArticleViews, incrementArticleViews } from '../../../../lib/api';

export default function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'GET') {
        const views = getArticleViews(id);
        res.status(200).json({ views });
    } else if (req.method === 'POST') {
        const views = incrementArticleViews(id);
        res.status(200).json({ views });
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
} 