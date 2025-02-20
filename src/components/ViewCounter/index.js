import styles from './ViewCounter.module.css';

const ViewCounter = ({ articleId }) => {
    return (
        <span className={styles.viewCount}>
            <i className="far fa-eye"></i> -- 次浏览
        </span>
    );
};

export default ViewCounter;