const Background = () => {
    return (
        <div className="background">
            <div className="geometric-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
                <div className="shape shape-4"></div>
                <div className="rust-gear gear-1"></div>
                <div className="rust-gear gear-2"></div>
            </div>
            <style jsx>{`
                .background {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    z-index: -1;
                    overflow: hidden;
                    background: linear-gradient(to bottom right, #1a1a1a, #2d2d2d);
                }

                .geometric-shapes {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                }

                .shape {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(5px);
                    animation: float 20s infinite linear;
                }

                .shape-1 {
                    width: 300px;
                    height: 300px;
                    top: -150px;
                    left: 10%;
                    animation-delay: -5s;
                }

                .shape-2 {
                    width: 200px;
                    height: 200px;
                    bottom: 20%;
                    right: 10%;
                    animation-delay: -10s;
                }

                .shape-3 {
                    width: 150px;
                    height: 150px;
                    bottom: 30%;
                    left: 20%;
                    animation-delay: -15s;
                }

                .shape-4 {
                    width: 250px;
                    height: 250px;
                    top: 20%;
                    right: 20%;
                    animation-delay: -20s;
                }

                .rust-gear {
                    position: absolute;
                    background: url('/images/rust-gear.svg') no-repeat center;
                    background-size: contain;
                    opacity: 0.1;
                    filter: blur(1px);
                }

                .gear-1 {
                    width: 400px;
                    height: 400px;
                    top: -100px;
                    right: -100px;
                    animation: spin 30s linear infinite;
                }

                .gear-2 {
                    width: 300px;
                    height: 300px;
                    bottom: -50px;
                    left: -50px;
                    animation: spin 20s linear infinite reverse;
                }

                @keyframes float {
                    0% {
                        transform: translate(0, 0) rotate(0deg) scale(1);
                    }
                    25% {
                        transform: translate(10%, 10%) rotate(90deg) scale(1.1);
                    }
                    50% {
                        transform: translate(5%, -5%) rotate(180deg) scale(1);
                    }
                    75% {
                        transform: translate(-10%, 5%) rotate(270deg) scale(0.9);
                    }
                    100% {
                        transform: translate(0, 0) rotate(360deg) scale(1);
                    }
                }

                @keyframes spin {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }

                @media (max-width: 768px) {
                    .shape {
                        animation: float 30s infinite linear;
                    }
                }
            `}</style>
        </div>
    );
};

export default Background; 