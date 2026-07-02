<template>
  <page-nav />

  <main class="login-container">
    <div class="login-box">
      <h1>CMS Login</h1>
      <p class="subtitle">Accès au gestionnaire de projets</p>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="username">Pseudo</label>
          <input
            id="username"
            v-model="username"
            type="text"
            placeholder="Ethan"
            autocomplete="username"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="••••••••"
            autocomplete="current-password"
            required
          />
        </div>

        <button type="submit" class="btn-login" :disabled="loading">
          {{ loading ? 'Connexion...' : 'Se connecter' }}
        </button>
      </form>

      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>

      <div class="back-home">
        <NuxtLink to="/">← Retour à l'accueil</NuxtLink>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      loading: false,
      errorMessage: ''
    };
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      this.errorMessage = '';

      await new Promise(resolve => setTimeout(resolve, 500));

      if (this.username === 'ethan' && this.password === 'Admin123!') {
        localStorage.setItem('cmsAuth', JSON.stringify({
          authenticated: true,
          username: this.username,
          timestamp: Date.now()
        }));
        this.$router.push('/cms');
      } else {
        this.errorMessage = 'Identifiants incorrects';
        this.password = '';
      }

      this.loading = false;
    }
  },
  mounted() {
    const auth = localStorage.getItem('cmsAuth');
    if (auth) {
      this.$router.push('/cms');
    }
  }
};
</script>

<style scoped>
.login-container {
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  padding: 2rem;
  border: 1rem solid var(--blue);
  background-color: white;
  font-family: 'DM Mono', monospace;
}

@media (max-width: 1024px) {
  .login-container {
    padding: 1.5rem;
    border-width: 0.75rem;
  }
}

@media (max-width: 768px) {
  .login-container {
    padding: 1rem;
    border-width: 0.5rem;
  }
}

@media (max-width: 480px) {
  .login-container {
    padding: 0.75rem;
    border-width: 0.35rem;
  }
}

.login-box {
  grid-column: 4 / span 6;
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 400px;
  margin: 0 auto;
}

@media (max-width: 1024px) {
  .login-box {
    grid-column: 3 / span 7;
  }
}

@media (max-width: 768px) {
  .login-box {
    grid-column: 2 / span 10;
  }
}

@media (max-width: 480px) {
  .login-box {
    grid-column: 1 / -1;
    padding: 1rem;
  }
}

h1 {
  font-size: 2.5rem;
  color: var(--blue);
  margin: 0 0 0.5rem;
  font-weight: 700;
  text-align: center;
}

.subtitle {
  font-size: 1rem;
  color: #666;
  text-align: center;
  margin: 0 0 2rem;
}

.login-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--black);
}

.form-group input {
  padding: 0.75rem;
  border: 1px solid var(--black);
  border-radius: 4px;
  font-family: 'DM Mono', monospace;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: var(--blue);
  box-shadow: 0 0 0 3px rgba(38, 0, 255, 0.1);
}

.btn-login {
  padding: 0.85rem;
  background-color: var(--blue);
  color: white;
  border: 2px solid var(--blue);
  border-radius: 4px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  font-family: 'DM Mono', monospace;
  transition: all 0.3s ease;
}

.btn-login:hover:not(:disabled) {
  background-color: #0066cc;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(38, 0, 255, 0.2);
}

.btn-login:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  color: #c41e3a;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  padding: 0.75rem;
  border-radius: 4px;
  text-align: center;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.back-home {
  text-align: center;
}

.back-home a {
  color: var(--blue);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
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

@media (max-width: 480px) {
  h1 {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
  }

  .login-form {
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .form-group input {
    padding: 0.65rem;
    font-size: 0.85rem;
  }

  .btn-login {
    padding: 0.7rem;
    font-size: 0.9rem;
  }

  .back-home a {
    padding: 0.6rem 1.2rem;
    font-size: 0.85rem;
  }
}
</style>
