import { useState, useEffect } from 'react';
import { getWeather } from '../../lib/weather';

const Ferris = () => {
    const [weather, setWeather] = useState(null);
    const [showMessage, setShowMessage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchWeatherData = async () => {
        setLoading(true);
        setError(null);
        
        if (!navigator.geolocation) {
            setError('你的浏览器不支持地理位置功能');
            setLoading(false);
            return;
        }

        try {
            console.log('Requesting geolocation...');
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                    (pos) => {
                        console.log('Geolocation success:', pos);
                        resolve(pos);
                    },
                    (err) => {
                        console.error('Geolocation error:', err);
                        reject(err);
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 5000,
                        maximumAge: 0
                    }
                );
            });
            
            console.log('Got position:', position);
            const { latitude, longitude } = position.coords;
            const weatherData = await getWeather(latitude, longitude);
            console.log('Weather data:', weatherData);
            setWeather(weatherData);
        } catch (err) {
            console.error('Error in fetchWeatherData:', err);
            if (err.code === 1) {
                setError('请允许访问位置信息以获取天气');
            } else if (err.code === 2) {
                setError('无法获取位置信息，请检查设备设置');
            } else if (err.code === 3) {
                setError('获取位置信息超时');
            } else {
                setError(err.message || '无法获取天气信息');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleClick = () => {
        setShowMessage(true);
        if (!weather && !loading) {
            fetchWeatherData();
        }
        // 5秒后隐藏消息
        setTimeout(() => setShowMessage(false), 5000);
    };

    return (
        <div className="ferris-container">
            {showMessage && (
                <div className={`message-bubble ${loading ? 'loading' : ''}`}>
                    {loading ? (
                        <span>让我看看天气...</span>
                    ) : error ? (
                        <span>{error}</span>
                    ) : weather ? (
                        <span>
                            你好！今天{weather.city}的天气是{weather.description}，
                            气温{weather.temperature}°C
                        </span>
                    ) : (
                        <span>点击我查看天气！</span>
                    )}
                </div>
            )}
            <div className="ferris" onClick={handleClick}>
                <div className="body">
                    <div className="eye left"></div>
                    <div className="eye right"></div>
                </div>
                <div className="claws">
                    <div className="claw left"></div>
                    <div className="claw right"></div>
                </div>
            </div>
            <style jsx>{`
                .ferris-container {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    z-index: 10;
                    animation: bounce 3s ease-in-out infinite;
                }

                .ferris {
                    width: 120px;
                    height: 80px;
                    position: relative;
                    cursor: pointer;
                    transition: transform 0.3s ease;
                }

                .ferris:hover {
                    transform: scale(1.1);
                }

                .body {
                    width: 100%;
                    height: 100%;
                    background: #FF4B4B;
                    border-radius: 50px;
                    position: relative;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                }

                .eye {
                    width: 12px;
                    height: 12px;
                    background: #000;
                    border-radius: 50%;
                    position: absolute;
                    top: 25px;
                }

                .eye.left {
                    left: 30px;
                }

                .eye.right {
                    right: 30px;
                }

                .claws {
                    position: absolute;
                    width: 100%;
                    bottom: -15px;
                }

                .claw {
                    width: 40px;
                    height: 40px;
                    background: #FF4B4B;
                    position: absolute;
                    border-radius: 20px;
                }

                .claw.left {
                    left: -10px;
                    animation: clawWaveLeft 2s ease-in-out infinite;
                }

                .claw.right {
                    right: -10px;
                    animation: clawWaveRight 2s ease-in-out infinite;
                }

                @keyframes bounce {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-15px);
                    }
                }

                @keyframes clawWaveLeft {
                    0%, 100% {
                        transform: rotate(0deg);
                    }
                    50% {
                        transform: rotate(-20deg);
                    }
                }

                @keyframes clawWaveRight {
                    0%, 100% {
                        transform: rotate(0deg);
                    }
                    50% {
                        transform: rotate(20deg);
                    }
                }

                @media (max-width: 768px) {
                    .ferris-container {
                        bottom: 10px;
                        right: 10px;
                    }

                    .ferris {
                        width: 80px;
                        height: 60px;
                    }
                }

                .message-bubble {
                    position: absolute;
                    bottom: 100%;
                    right: 0;
                    background: white;
                    padding: 10px 15px;
                    border-radius: 15px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                    margin-bottom: 15px;
                    max-width: 250px;
                    animation: fadeIn 0.3s ease-out;
                    z-index: 100;
                }

                .message-bubble::after {
                    content: '';
                    position: absolute;
                    bottom: -10px;
                    right: 20px;
                    border-left: 10px solid transparent;
                    border-right: 10px solid transparent;
                    border-top: 10px solid white;
                }

                .message-bubble.loading {
                    background: #f5f5f5;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default Ferris; 