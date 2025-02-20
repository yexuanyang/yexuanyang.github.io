import Layout from '../../components/Layout';
import Image from 'next/image';

const About = () => {
    return (
        <Layout>
            <div className="about-container">
                <div className="about-content">
                    <div className="about-header">
                        <div className="about-avatar-container">
                            <Image
                                src="/images/avatar.svg"
                                alt="头像"
                                width={120}
                                height={120}
                                className="about-avatar"
                            />
                        </div>
                        <h1 className="about-name">杨叶轩</h1>
                        <p className="about-bio">全栈开发工程师 / 技术写作者</p>
                        <div className="about-social">
                            <a href="https://github.com/yexuanyang" target="_blank" rel="noopener noreferrer" className="about-social-link">
                                <i className="fab fa-github"></i>
                            </a>
                            <a href="mailto:myemailyyxg@gmail.com" className="about-social-link">
                                <i className="fas fa-envelope"></i>
                            </a>
                        </div>
                    </div>

                    <section className="about-section">
                        <h2 className="about-section-title">关于我</h2>
                        <div className="about-section-content">
                            <p>你好！我是一名热爱技术的全栈开发工程师。我喜欢探索新技术，解决具有挑战性的问题，并与他人分享我的知识和经验。</p>
                            <p>在这个博客中，我会分享我在技术领域的学习心得、开发经验和一些有趣的项目。希望这些内容能够帮助到其他开发者。</p>
                        </div>
                    </section>

                    <section className="about-section">
                        <h2 className="about-section-title">技能专长</h2>
                        <div className="about-skills">
                            <div className="about-skill-category">
                                <h3>前端开发</h3>
                                <div className="about-skill-tags">
                                    <span className="about-skill-tag">React</span>
                                    <span className="about-skill-tag">Next.js</span>
                                    <span className="about-skill-tag">TypeScript</span>
                                    <span className="about-skill-tag">CSS3</span>
                                </div>
                            </div>
                            <div className="about-skill-category">
                                <h3>后端开发</h3>
                                <div className="about-skill-tags">
                                    <span className="about-skill-tag">Node.js</span>
                                    <span className="about-skill-tag">Express</span>
                                    <span className="about-skill-tag">MongoDB</span>
                                    <span className="about-skill-tag">MySQL</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </Layout>
    );
};

export default About;