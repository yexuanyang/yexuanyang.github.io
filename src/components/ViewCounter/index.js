import { useState, useEffect } from 'react';
import styles from './ViewCounter.module.css';

const ViewCounter = ({ articleId }) => {
    const [views, setViews] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const incrementViews = async () => {
            try {
                const response = await fetch(`/api/articles/${articleId}/views`, {
                    method: 'POST'
                });
                const data = await response.json();
                setViews(data.views);
                setLoading(false);
            } catch (error) {
                console.error('Error incrementing views:', error);
                setLoading(false);
            }
        };

        incrementViews();
    }, [articleId]);

    if (loading) {
        return <span className={styles.viewCount}>--</span>;
    }

    return (
        <span className={styles.viewCount}>
            <i className="far fa-eye"></i> {views} 次浏览
        </span>
    );
};

export default ViewCounter; 