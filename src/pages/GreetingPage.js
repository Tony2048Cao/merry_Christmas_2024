import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

function GreetingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const message = location.state?.message;
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const fireConfetti = () => {
    // 创建多彩礼花效果
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  useEffect(() => {
    if (!message) {
      navigate('/');
    }
  }, [message, navigate]);

  return (
    <div className="christmas-container">
      <audio
        id="bgMusic"
        loop
        src={process.env.PUBLIC_URL + "/merry christmas001.mp3"}
      />
      
      <div 
        className={`christmas-card ${isFlipped ? 'flipped' : ''}`}
        onClick={() => {
          setIsFlipped(!isFlipped);
          if (!isFlipped) {
            fireConfetti(); // 在卡片翻转时触发礼花效果
          }
        }}
      >
        <div className="card-front">
          <div className="christmas-tree">
            <div className="tree">🎄</div>
            <div className="additional-decorations">
                <div className="decorations-wrapper">
                    {/* 第一组装饰品 */}
                    <span>🦌</span>
                    <span>🛷</span>
                    <span>🎅</span>
                    <span>⛄</span>
                    {/* 第二组相同的装饰品 */}
                    <span>🦌</span>
                    <span>🛷</span>
                    <span>🎅</span>
                    <span>⛄</span>
                </div>
                </div>
          </div>
          <h1>Merry Christmas</h1>
          <div className="snowflakes">
            {[...Array(30)].map((_, i) => (
              <div key={i} className="snowflake">❄</div>
            ))}
          </div>
          <div className="decorations">
            <span 
              className={`bell ${isPlaying ? 'playing' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                const audio = document.getElementById('bgMusic');
                if (isPlaying) {
                  audio.pause();
                } else {
                  audio.play();
                }
                setIsPlaying(!isPlaying);
              }}
            >
              🔔
            </span>
            <span 
              className="decoration star" 
              onClick={(e) => {
                e.stopPropagation(); // Prevent card flip
                fireConfetti();
              }}
            >
              ⭐
            </span>
            <span 
              className="decoration gift"
              onClick={(e) => {
                e.stopPropagation();
                // 播放音乐
                const audio = document.getElementById('bgMusic');
                if (!isPlaying) {
                  audio.play();
                  setIsPlaying(true);
                }
                // 触发烟花效果
                fireConfetti();
                // 翻转卡片
                setIsFlipped(true);
                // 添加礼物晃动效果
                e.target.classList.add('shake');
                setTimeout(() => {
                  e.target.classList.remove('shake');
                }, 1000);
              }}
            >
              🎁
            </span>
          </div>
        </div>
        <div className="card-inside">
          <div className="message-content">
            <p className="dear">Dear {message?.split('，')[0].split(' ')[1]},</p>
            <p className="greeting-message">
              Wishing you a Christmas season filled with warmth, joy, and wonderful surprises.
              May the magic of Christmas fill your heart with peace and happiness.
            </p>
            <p className="signature">With Best Wishes</p>
            <p className="date">December 25, 2023</p>
          </div>
          <button 
            onClick={() => navigate('/')} 
            className="back-button"
          >
            Back
          </button>
        </div>
      </div>
    </div>
    
  );
}

export default GreetingPage;