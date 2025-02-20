import Layout from '../../components/Layout';
import styles from '../../styles/about.module.css';
import Image from 'next/image';

const About = () => {
    return (
        <Layout>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.header}>
                        <div className={styles.avatarContainer}>
                            <Image
                                src="/images/avatar.svg"
                                alt="头像"
                                width={120}
                                height={120}
                                className={styles.avatar}
                            />
                        </div>
                        <h1 className={styles.name}>杨叶轩</h1>
                        <p className={styles.bio}>全栈开发工程师 / 技术写作者</p>
                        <div className={styles.social}>
                            <a href="https://github.com/yexuanyang" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                <i className="fab fa-github"></i>
                            </a>
                            <a href="mailto:myemailyyxg@gmail.com" className={styles.socialLink}>
                                <i className="fas fa-envelope"></i>
                            </a>
                        </div>
                    </div>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>关于我</h2>
                        <div className={styles.sectionContent}>
                            <p>你好！我是一名热爱技术的全栈开发工程师。我喜欢探索新技术，解决具有挑战性的问题，并与他人分享我的知识和经验。</p>
                            <p>在这个博客中，我会分享我在技术领域的学习心得、开发经验和一些有趣的项目。希望这些内容能够帮助到其他开发者。</p>
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>技能专长</h2>
                        <div className={styles.skills}>
                            <div className={styles.skillCategory}>
                                <h3>前端开发</h3>
                                <div className={styles.skillTags}>
                                    <span className={styles.skillTag}>React</span>
                                    <span className={styles.skillTag}>Next.js</span>
                                    <span className={styles.skillTag}>TypeScript</span>
                                    <span className={styles.skillTag}>CSS3</span>
                                </div>
                            </div>
                            <div className={styles.skillCategory}>
                                <h3>后端开发</h3>
                                <div className={styles.skillTags}>
                                    <span className={styles.skillTag}>Node.js</span>
                                    <span className={styles.skillTag}>Express</span>
                                    <span className={styles.skillTag}>MongoDB</span>
                                    <span className={styles.skillTag}>MySQL</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>联系我</h2>
                        <div className={styles.contact}>
                            <p>如果你对我的文章有任何问题，或者想要交流技术话题，欢迎通过以下方式联系我：</p>
                            <ul className={styles.contactList}>
                                <li>邮箱：<a href="mailto:myemailyyxg@gmail.com">myemailyyxg@gmail.com</a></li>
                                <li>GitHub：<a href="https://github.com/yexuanyang" target="_blank" rel="noopener noreferrer">@yexuanyang</a></li>
                            </ul>
                        </div>
                    </section>
                </div>
            </div>
        </Layout>
    );
};

export default About;