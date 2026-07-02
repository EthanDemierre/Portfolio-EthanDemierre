<template>
  <page-nav />

  <main class="page-404">
    <section class="error-header">
      <h1>404</h1>
      <p>Page non trouvée</p>
    </section>

    <div class="game-container">
      <div class="game-section">
        <div class="game-wrapper">
          <canvas 
            id="gameCanvas" 
            width="300" 
            height="300"
            @keydown="handleKeyPress"
            tabindex="1"
          ></canvas>
          <div class="game-controls">
            <div class="score-display">
              <p>Score: <span>{{ score }}</span></p>
              <p>Best: <span>{{ bestScore }}</span></p>
            </div>
            <button @click="startGame" class="btn-start" :disabled="gameRunning">
              {{ gameRunning ? 'En cours...' : 'Démarrer' }}
            </button>
            <button @click="resetGame" class="btn-reset">Réinitialiser</button>
          </div>
        </div>
      </div>

      <div class="leaderboard-section">
        <h2>Classement</h2>
        
        <div class="player-input" v-if="!playerName">
          <input 
            v-model="newPlayerName" 
            type="text" 
            placeholder="Votre pseudo"
            @keyup.enter="setPlayerName"
            maxlength="20"
          >
          <button @click="setPlayerName" class="btn-set-name">Valider</button>
        </div>

        <div class="player-info" v-else>
          <p>Joueur: <strong>{{ playerName }}</strong></p>
          <button @click="changePlayer" class="btn-change">Changer</button>
        </div>

        <div class="leaderboard">
          <div class="leaderboard-header">
            <span class="rank">Rang</span>
            <span class="name">Pseudo</span>
            <span class="score">Score</span>
          </div>
          <div 
            v-for="(entry, index) in sortedScores" 
            :key="index"
            class="leaderboard-entry"
            :class="{ 'current-player': entry.name === playerName }"
          >
            <span class="rank">{{ index + 1 }}</span>
            <span class="name">{{ entry.name }}</span>
            <span class="score">{{ entry.score }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="back-home">
      <NuxtLink to="/">← Retour à l'accueil</NuxtLink>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      canvas: null,
      ctx: null,
      score: 0,
      bestScore: 0,
      gameRunning: false,
      playerName: '',
      newPlayerName: '',
      scores: [],
      // Snake
      snake: [{ x: 10, y: 10 }],
      food: { x: 15, y: 15 },
      direction: { x: 1, y: 0 },
      nextDirection: { x: 1, y: 0 },
      gridSize: 20,
      gameSpeed: 100
    };
  },
  computed: {
    sortedScores() {
      return this.scores.sort((a, b) => b.score - a.score).slice(0, 10);
    }
  },
  methods: {
    initGame() {
      this.$nextTick(() => {
        this.canvas = document.getElementById('gameCanvas');
        if (this.canvas) {
          this.ctx = this.canvas.getContext('2d');
          this.loadScores();
          this.loadPlayerName();
          this.draw();
        }
      });
    },
    startGame() {
      if (this.gameRunning) return;
      this.gameRunning = true;
      this.score = 0;
      this.snake = [{ x: 10, y: 10 }];
      this.direction = { x: 1, y: 0 };
      this.nextDirection = { x: 1, y: 0 };
      this.generateFood();
      this.gameLoop();
    },
    resetGame() {
      this.gameRunning = false;
      this.score = 0;
      this.snake = [{ x: 10, y: 10 }];
      this.direction = { x: 1, y: 0 };
      this.nextDirection = { x: 1, y: 0 };
      this.draw();
    },
    gameLoop() {
      if (!this.gameRunning) return;
      
      setTimeout(() => {
        this.update();
        this.draw();
        this.gameLoop();
      }, this.gameSpeed);
    },
    update() {
      this.direction = this.nextDirection;
      
      const head = { ...this.snake[0] };
      head.x += this.direction.x;
      head.y += this.direction.y;

      if (head.x < 0 || head.x >= 15 || head.y < 0 || head.y >= 15 || this.checkCollision(head)) {
        this.endGame();
        return;
      }

      this.snake.unshift(head);

      if (head.x === this.food.x && head.y === this.food.y) {
        this.score += 10;
        this.generateFood();
      } else {
        this.snake.pop();
      }
    },
    draw() {
      if (!this.ctx) return;
      
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      
      this.ctx.strokeStyle = '#ddd';
      this.ctx.lineWidth = 0.5;
      for (let i = 0; i <= 15; i++) {
        const pos = i * this.gridSize;
        this.ctx.beginPath();
        this.ctx.moveTo(pos, 0);
        this.ctx.lineTo(pos, this.canvas.height);
        this.ctx.stroke();
        
        this.ctx.beginPath();
        this.ctx.moveTo(0, pos);
        this.ctx.lineTo(this.canvas.width, pos);
        this.ctx.stroke();
      }

      this.ctx.fillStyle = '#2600FF';
      this.snake.forEach((segment, index) => {
        this.ctx.fillRect(
          segment.x * this.gridSize + 1,
          segment.y * this.gridSize + 1,
          this.gridSize - 2,
          this.gridSize - 2
        );
      });

      this.ctx.fillStyle = '#FF0000';
      this.ctx.beginPath();
      this.ctx.arc(
        this.food.x * this.gridSize + this.gridSize / 2,
        this.food.y * this.gridSize + this.gridSize / 2,
        this.gridSize / 2 - 2,
        0,
        Math.PI * 2
      );
      this.ctx.fill();
    },
    generateFood() {
      let newFood;
      do {
        newFood = {
          x: Math.floor(Math.random() * 15),
          y: Math.floor(Math.random() * 15)
        };
      } while (this.snake.some(s => s.x === newFood.x && s.y === newFood.y));
      this.food = newFood;
    },
    checkCollision(head) {
      return this.snake.some(segment => segment.x === head.x && segment.y === head.y);
    },
    handleKeyPress(event) {
      const key = event.key;
      if (key === 'ArrowUp' && this.direction.y === 0) {
        this.nextDirection = { x: 0, y: -1 };
        event.preventDefault();
      } else if (key === 'ArrowDown' && this.direction.y === 0) {
        this.nextDirection = { x: 0, y: 1 };
        event.preventDefault();
      } else if (key === 'ArrowLeft' && this.direction.x === 0) {
        this.nextDirection = { x: -1, y: 0 };
        event.preventDefault();
      } else if (key === 'ArrowRight' && this.direction.x === 0) {
        this.nextDirection = { x: 1, y: 0 };
        event.preventDefault();
      }
    },
    endGame() {
      this.gameRunning = false;
      if (this.score > this.bestScore) {
        this.bestScore = this.score;
      }
      if (this.playerName) {
        this.addScore(this.playerName, this.score);
      }
    },
    setPlayerName() {
      if (this.newPlayerName.trim()) {
        this.playerName = this.newPlayerName;
        localStorage.setItem('snakePlayerName', this.playerName);
        this.newPlayerName = '';
      }
    },
    changePlayer() {
      this.playerName = '';
      this.newPlayerName = '';
      localStorage.removeItem('snakePlayerName');
    },
    addScore(name, score) {
      const existingIndex = this.scores.findIndex(s => s.name === name);
      if (existingIndex > -1) {
        if (score > this.scores[existingIndex].score) {
          this.scores[existingIndex].score = score;
        }
      } else {
        this.scores.push({ name, score });
      }
      this.saveScores();
    },
    saveScores() {
      localStorage.setItem('snakeScores', JSON.stringify(this.scores));
    },
    loadScores() {
      const saved = localStorage.getItem('snakeScores');
      if (saved) {
        this.scores = JSON.parse(saved);
      }
    },
    loadPlayerName() {
      const saved = localStorage.getItem('snakePlayerName');
      if (saved) {
        this.playerName = saved;
      }
    }
  },
  mounted() {
    this.initGame();
    const canvas = document.getElementById('gameCanvas');
    if (canvas) {
      canvas.addEventListener('keydown', this.handleKeyPress);
      canvas.focus();
    }
    window.addEventListener('keydown', this.handleKeyPress);
  },
  beforeUnmount() {
    const canvas = document.getElementById('gameCanvas');
    if (canvas) {
      canvas.removeEventListener('keydown', this.handleKeyPress);
    }
    window.removeEventListener('keydown', this.handleKeyPress);
  }
};
</script>

<style scoped>
.page-404 {
  box-sizing: border-box;
  width: 100vw;
  min-height: 100vh;
  padding: 2rem;
  border: 1rem solid var(--blue);
  background-color: white;
  display: flex;
  flex-direction: column;
  font-family: 'DM Mono', monospace;
}

@media (max-width: 1024px) {
  .page-404 {
    padding: 1.5rem;
    border-width: 0.75rem;
  }
}

@media (max-width: 768px) {
  .page-404 {
    padding: 1rem;
    border-width: 0.5rem;
  }
}

@media (max-width: 480px) {
  .page-404 {
    padding: 0.75rem;
    border-width: 0.35rem;
  }
}

.error-header {
  text-align: center;
  margin-bottom: 2rem;
}

.error-header h1 {
  font-size: 4rem;
  color: var(--blue);
  margin: 0;
  font-weight: 700;
}

.error-header p {
  font-size: 1.5rem;
  color: var(--black);
  margin: 0.5rem 0 0;
}

@media (max-width: 768px) {
  .error-header h1 {
    font-size: 3rem;
  }

  .error-header p {
    font-size: 1.25rem;
  }
}

.game-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  flex: 1;
  margin-bottom: 2rem;
}

@media (max-width: 1024px) {
  .game-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

.game-section {
  display: flex;
  justify-content: center;
  align-items: center;
}

.game-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
}

#gameCanvas {
  border: 2px solid var(--black);
  background-color: white;
  cursor: pointer;
  outline: none;
}

@media (max-width: 768px) {
  #gameCanvas {
    width: 250px;
    height: 250px;
  }
}

.game-controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  align-items: center;
}

.score-display {
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  color: var(--black);
}

.score-display p {
  margin: 0.25rem 0;
}

.score-display span {
  color: var(--blue);
}

.btn-start,
.btn-reset,
.btn-set-name,
.btn-change {
  padding: 0.75rem 1.5rem;
  border: 2px solid var(--blue);
  background-color: var(--blue);
  color: white;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  font-family: 'DM Mono', monospace;
  transition: all 0.3s ease;
  font-size: 0.95rem;
}

.btn-start:hover:not(:disabled),
.btn-reset:hover,
.btn-set-name:hover,
.btn-change:hover {
  background-color: #0066cc;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(38, 0, 255, 0.2);
}

.btn-start:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-reset {
  background-color: transparent;
  color: var(--blue);
}

.btn-reset:hover {
  background-color: var(--blue);
  color: white;
}

.leaderboard-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.leaderboard-section h2 {
  margin: 0;
  font-size: 1.5rem;
  color: var(--black);
}

.player-input {
  display: flex;
  gap: 0.75rem;
}

.player-input input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid var(--black);
  border-radius: 4px;
  font-family: 'DM Mono', monospace;
  font-size: 0.95rem;
}

.player-input input:focus {
  outline: none;
  border-color: var(--blue);
  box-shadow: 0 0 0 2px rgba(38, 0, 255, 0.1);
}

.player-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.player-info p {
  margin: 0;
  font-size: 0.95rem;
}

.btn-change {
  padding: 0.6rem 1.2rem;
  font-size: 0.85rem;
  background-color: transparent;
  color: var(--blue);
  border: 2px solid var(--blue);
}

.btn-change:hover {
  background-color: var(--blue);
  color: white;
}

.leaderboard {
  border: 1px solid var(--black);
  border-radius: 4px;
  overflow: hidden;
}

.leaderboard-header {
  display: grid;
  grid-template-columns: 50px 1fr 80px;
  gap: 1rem;
  padding: 1rem;
  background-color: var(--blue);
  color: white;
  font-weight: 600;
  font-size: 0.95rem;
}

.leaderboard-entry {
  display: grid;
  grid-template-columns: 50px 1fr 80px;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border-top: 1px solid #eee;
  align-items: center;
  transition: background-color 0.3s ease;
}

.leaderboard-entry:hover {
  background-color: #f9f9f9;
}

.leaderboard-entry.current-player {
  background-color: #f0f0ff;
  font-weight: 600;
}

.rank {
  text-align: center;
  font-weight: 600;
}

.score {
  text-align: right;
  font-weight: 600;
  color: var(--blue);
}

.back-home {
  text-align: center;
  padding-top: 2rem;
  border-top: 2px solid var(--blue);
}

.back-home a {
  color: var(--blue);
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  padding: 0.75rem 1.5rem;
  border: 2px solid var(--blue);
  border-radius: 4px;
  display: inline-block;
}

.back-home a:hover {
  background-color: var(--blue);
  color: white;
}

@media (max-width: 768px) {
  .game-container {
    gap: 1rem;
  }

  .leaderboard-header,
  .leaderboard-entry {
    grid-template-columns: 40px 1fr 60px;
    gap: 0.75rem;
    padding: 0.75rem;
    font-size: 0.85rem;
  }

  .leaderboard-section h2 {
    font-size: 1.25rem;
  }
}

@media (max-width: 480px) {
  .error-header h1 {
    font-size: 2.5rem;
  }

  .game-container {
    grid-template-columns: 1fr;
  }

  .leaderboard-header,
  .leaderboard-entry {
    grid-template-columns: 35px 1fr 50px;
    gap: 0.5rem;
    padding: 0.6rem;
    font-size: 0.8rem;
  }

  .rank {
    padding: 0;
  }

  .player-input {
    flex-direction: column;
  }
}
</style>
