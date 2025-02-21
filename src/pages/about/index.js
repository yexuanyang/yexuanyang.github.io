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
                                src="/images/head.jpg"
                                alt="头像"
                                width={120}
                                height={120}
                                className="about-avatar"
                            />
                        </div>
                        <h1 className="about-name">杨叶轩</h1>
                        <p className="about-bio">系统开发工程师 / 技术写作者 / RROS Maintainer</p>
                        <p className="about-bio">北京邮电大学研究生 / 计算机科学与技术</p>
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
                            <p>你好！我是一名热爱技术的系统开发工程师。我喜欢探索新技术，解决具有挑战性的问题，并与他人分享我的知识和经验。</p>
                            <p>在这个博客中，我会分享我在技术领域的学习心得、开发经验和一些有趣的项目。希望这些内容能够帮助到其他开发者。</p>
                            <p>目前主要研究Linux可靠性、故障注入、实时驱动、PX4移植</p>
                        </div>
                    </section>

                    <section className="about-section">
                        <h2 className="about-section-title">最近研究</h2>
                        <div className="about-section-content">
                            <p>目前主要研究Linux可靠性、搭建Jenkins + LAVA故障注入系统、实时驱动开发、PX4飞控系统移植</p>
                            <p>欢迎感兴趣的人和我交流相关技术</p>
                        </div>
                    </section>

                    <section className="about-section">
                        <h2 className="about-section-title">技能专长</h2>
                        <div className="about-skills">
                            <div className="about-skill-category">
                                <h3>系统开发</h3>
                                <div className="about-skill-tags">
                                    <span className="about-skill-tag">操作系统</span>
                                    <span className="about-skill-tag">Linux</span>
                                    <span className="about-skill-tag">驱动开发</span>
                                    <span className="about-skill-tag">Uboot</span>
                                    <span className="about-skill-tag">实时操作系统</span>
                                    <span className="about-skill-tag">Xenomai 3/4</span>
                                    <span className="about-skill-tag">Rust-for-linux</span>
                                    <span className="about-skill-tag">CI/CD</span>
                                    <span className="about-skill-tag">LAVA/Kernel CI/Jenkins</span>
                                    <span className="about-skill-tag">QEMU</span>
                                </div>
                            </div>
                            <div className="about-skill-category">
                                <h3>编程语言</h3>
                                <div className="about-skill-tags">
                                    <span className="about-skill-tag">Rust</span>
                                    <span className="about-skill-tag">Python</span>
                                    <span className="about-skill-tag">C/C++</span>
                                    <span className="about-skill-tag">Go</span>
                                </div>
                            </div>
                            <div className="about-skill-category">
                                <h3>软技能</h3>
                                <div className="about-skill-tags">
                                    <span className="about-skill-tag">英语CET6</span>
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