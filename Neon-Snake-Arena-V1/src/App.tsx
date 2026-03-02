import { useState, useEffect, useRef } from 'react';
import {
  Play,
  RotateCcw,
  Zap,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Github,
  Linkedin,
  Globe,
  Heart
} from 'lucide-react';
import Confetti from './components/Confetti';
import './index.css';

type Difficulty = 'easy' | 'medium' | 'hard';
type GameState = 'menu' | 'playing' | 'gameOver';
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

interface SnakeSegment {
  x: number;
  y: number;
}

const GRID_SIZE = 20;

const INITIAL_SPEED: Record<Difficulty, number> = {
  easy: 200,
  medium: 150,
  hard: 100,
};

function App() {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [snake, setSnake] = useState<SnakeSegment[]>([
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ]);
  const [food, setFood] = useState<SnakeSegment>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [nextDirection, setNextDirection] = useState<Direction>('RIGHT');

  const gameLoopRef = useRef<NodeJS.Timeout>();

  const generateFood = (snakeBody: SnakeSegment[]) => {
    let newFood: SnakeSegment;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (
      snakeBody.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      )
    );
    return newFood;
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();

      if (key === 'ARROWUP' || key === 'W') {
        e.preventDefault();
        setNextDirection(prev => (prev !== 'DOWN' ? 'UP' : prev));
      } else if (key === 'ARROWDOWN' || key === 'S') {
        e.preventDefault();
        setNextDirection(prev => (prev !== 'UP' ? 'DOWN' : prev));
      } else if (key === 'ARROWLEFT' || key === 'A') {
        e.preventDefault();
        setNextDirection(prev => (prev !== 'RIGHT' ? 'LEFT' : prev));
      } else if (key === 'ARROWRIGHT' || key === 'D') {
        e.preventDefault();
        setNextDirection(prev => (prev !== 'LEFT' ? 'RIGHT' : prev));
      }
    };

    if (gameState === 'playing') {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [gameState]);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const speed = INITIAL_SPEED[difficulty];

    gameLoopRef.current = setInterval(() => {
      setDirection(nextDirection);

      setSnake(prevSnake => {
        const head = prevSnake[0];
        let newHead: SnakeSegment = { ...head };

        switch (nextDirection) {
          case 'UP':
            newHead.y = (head.y - 1 + GRID_SIZE) % GRID_SIZE;
            break;
          case 'DOWN':
            newHead.y = (head.y + 1) % GRID_SIZE;
            break;
          case 'LEFT':
            newHead.x = (head.x - 1 + GRID_SIZE) % GRID_SIZE;
            break;
          case 'RIGHT':
            newHead.x = (head.x + 1) % GRID_SIZE;
            break;
        }

        if (
          prevSnake.some(
            segment => segment.x === newHead.x && segment.y === newHead.y
          )
        ) {
          setGameState('gameOver');
          setHighScore(prev => Math.max(prev, score));
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(s => s + 10);
          setFood(generateFood(newSnake));
          return newSnake;
        }

        return newSnake.slice(0, -1);
      });
    }, speed);

    return () => clearInterval(gameLoopRef.current);
  }, [gameState, nextDirection, food, difficulty, score]);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setSnake([
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ]);
    setDirection('RIGHT');
    setNextDirection('RIGHT');
    setFood(generateFood([{ x: 10, y: 10 }]));
  };

  const resetGame = () => {
    setGameState('menu');
    setScore(0);
  };

  const handleDirectionButton = (dir: Direction) => {
    if (dir === 'UP' && direction !== 'DOWN') setNextDirection('UP');
    if (dir === 'DOWN' && direction !== 'UP') setNextDirection('DOWN');
    if (dir === 'LEFT' && direction !== 'RIGHT') setNextDirection('LEFT');
    if (dir === 'RIGHT' && direction !== 'LEFT') setNextDirection('RIGHT');
  };

  return (
    <div className="app">

      <div className="container">

        <header className="header">
          <h1 className="title">
            <Zap className="title-icon" />
            Neon Snake Arena
          </h1>
          <p className="subtitle">
            Eat the food, avoid yourself!
          </p>
        </header>

        {gameState === 'menu' && (
          <div className="menu">
            <div className="difficulty-selector">
              <h2>Choose Difficulty</h2>
              <div className="difficulty-buttons">
                <button
                  className={`difficulty-btn ${difficulty === 'easy' ? 'active' : ''}`}
                  onClick={() => setDifficulty('easy')}
                >
                  Easy
                </button>
                <button
                  className={`difficulty-btn ${difficulty === 'medium' ? 'active' : ''}`}
                  onClick={() => setDifficulty('medium')}
                >
                  Medium
                </button>
                <button
                  className={`difficulty-btn ${difficulty === 'hard' ? 'active' : ''}`}
                  onClick={() => setDifficulty('hard')}
                >
                  Hard
                </button>
              </div>
            </div>

            <button className="start-btn" onClick={startGame}>
              <Play size={24} />
              Start Game
            </button>
          </div>
        )}

        {gameState === 'playing' && (
          <>
            <div className="game-stats">
              <div>Score: {score}</div>
              <div>High: {highScore}</div>
              <button className="reset-btn" onClick={resetGame}>
                <RotateCcw size={20} />
              </button>
            </div>

            <div className="game-board snake-board">
              {Array.from({ length: GRID_SIZE }).map((_, y) =>
                Array.from({ length: GRID_SIZE }).map((_, x) => {
                  const isSnake = snake.some(s => s.x === x && s.y === y);
                  const isHead = snake[0].x === x && snake[0].y === y;
                  const isFood = food.x === x && food.y === y;

                  return (
                    <div
                      key={`${x}-${y}`}
                      className={`snake-cell ${isHead ? 'head' : isSnake ? 'body' : ''} ${isFood ? 'food' : ''}`}
                    />
                  );
                })
              )}
            </div>

            <div className="mobile-controls">
              <button onClick={() => handleDirectionButton('UP')}>
                <ChevronUp size={24} />
              </button>
              <div>
                <button onClick={() => handleDirectionButton('LEFT')}>
                  <ChevronLeft size={24} />
                </button>
                <button onClick={() => handleDirectionButton('DOWN')}>
                  <ChevronDown size={24} />
                </button>
                <button onClick={() => handleDirectionButton('RIGHT')}>
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          </>
        )}

        {gameState === 'gameOver' && (
          <>
            <Confetti />
            <div className="gameover-overlay">
              <div className="gameover-card">
                <h2 className="gameover-title">Game Over</h2>
                <div className="score-section">
                  <div className="score-box">
                    <span className="score-label">Final Score</span>
                    <span className="score-value">{score}</span>
                  </div>
                  <div className="score-box">
                    <span className="score-label">High Score</span>
                    <span className="score-value">{highScore}</span>
                  </div>
                </div>
                <button className="play-again-btn" onClick={resetGame}>
                  <Play size={20} />
                  Play Again
                </button>
              </div>
            </div>
          </>
        )}

      </div>

      {/* AWESOME FOOTER */}
      <footer className="awesome-footer">
        <div className="footer-content">
          <h3 className="footer-brand">
            <Zap size={22} /> Neon Snake Arena
          </h3>

          <p className="footer-tagline">
            Made with <Heart size={18} style={{ color: "red", display: "inline" }} /> by me
          </p>

          <div className="footer-socials">
            <a href="https://github.com/vipunsanjana" target="_blank" rel="noopener noreferrer">
              <Github size={18} /> GitHub
            </a>
            <a href="https://linkedin.com/in/vipun" target="_blank" rel="noopener noreferrer">
              <Linkedin size={18} /> LinkedIn
            </a>
            <a href="https://www.vipunsanjana.dev" target="_blank" rel="noopener noreferrer">
              <Globe size={18} /> Portfolio
            </a>
          </div>

          <p className="footer-copy">
            © {new Date().getFullYear()} Vipun Sanjana. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}

export default App;