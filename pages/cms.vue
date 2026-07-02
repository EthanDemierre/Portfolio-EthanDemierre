<template>
  <div class="cms-page">
    <header class="cms-header">
      <h1 class="cms-title">Gestion des Projets</h1>
      <div class="header-actions">
        <button @click="logout" class="logout-btn">Déconnexion</button>
        <button @click="goHome" class="back-btn">← Retour</button>
      </div>
    </header>

    <main class="cms-main">
      <button @click="addProject" class="btn-add-project">+ Ajouter un projet</button>

      <div v-if="projects.length === 0" class="empty-state">
        <p>Aucun projet. Cliquez sur "Ajouter un projet" pour commencer.</p>
      </div>

      <div class="projects-list">
        <div v-for="(project, index) in projects" :key="project.id" class="project-card">
          <div class="project-header">
            <div class="project-header-content">
              <h3 class="project-title">{{ project.title }}</h3>
              <div class="project-meta">{{ project.date }} • {{ project.medium }}</div>
            </div>
            <button @click="removeProject(index)" class="btn-delete" title="Supprimer">🗑️</button>
          </div>

          <div class="form-fields-grid">
            <div class="form-group">
              <label class="form-label">Titre</label>
              <input v-model="project.title" type="text" class="form-input">
            </div>

            <div class="form-group">
              <label class="form-label">Date</label>
              <input v-model="project.date" type="text" class="form-input" placeholder="2024">
            </div>

            <div class="form-group">
              <label class="form-label">Catégorie</label>
              <input v-model="project.medium" type="text" class="form-input" placeholder="Design / Web">
            </div>

            <div class="form-group">
              <label class="form-label">URL image</label>
              <input v-model="project.image" type="text" class="form-input" placeholder="/img/projet/proj1.png">
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Description</label>
            <textarea v-model="project.description" class="form-textarea" placeholder="Courte description..." rows="2"></textarea>
          </div>

          <div v-if="project.image" class="image-preview-compact">
            <img :src="project.image" :alt="project.title">
          </div>
        </div>
      </div>

      <div class="cms-actions">
        <button @click="saveProjects" class="btn-save">✓ Sauvegarder les changements</button>
        <button @click="resetProjects" class="btn-cancel">✕ Annuler</button>
      </div>

      <div v-if="message" :class="['message', message.type]">
        {{ message.text }}
      </div>
    </main>
  </div>
</template>

<script>
export default {
  middleware: 'cms-auth',
  async setup() {
    const { data: fetchedProjects } = await useFetch('/api/projects');
    return { fetchedProjects };
  },
  data() {
    return {
      projects: [],
      originalProjects: [],
      message: null
    };
  },
  watch: {
    fetchedProjects: {
      immediate: true,
      handler(newProjects) {
        if (newProjects) {
          this.projects = JSON.parse(JSON.stringify(newProjects));
          this.originalProjects = JSON.parse(JSON.stringify(newProjects));
        }
      }
    }
  },
  methods: {
    addProject() {
      const newId = Math.max(...this.projects.map(p => p.id), 0) + 1;
      this.projects.push({
        id: newId,
        title: 'Nouveau Projet',
        image: '',
        date: new Date().getFullYear().toString(),
        description: '',
        medium: ''
      });
    },
    removeProject(index) {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
        this.projects.splice(index, 1);
      }
    },
    async saveProjects() {
      try {
        const response = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.projects)
        });
        const result = await response.json();
        if (result.success) {
          this.originalProjects = JSON.parse(JSON.stringify(this.projects));
          this.showMessage('Projets sauvegardés avec succès !', 'success');
        } else {
          this.showMessage('Erreur lors de la sauvegarde', 'error');
        }
      } catch (error) {
        console.error('Erreur:', error);
        this.showMessage('Erreur lors de la sauvegarde', 'error');
      }
    },
    resetProjects() {
      if (confirm('Annuler tous les changements ?')) {
        this.projects = JSON.parse(JSON.stringify(this.originalProjects));
      }
    },
    showMessage(text, type) {
      this.message = { text, type };
      setTimeout(() => { this.message = null; }, 3000);
    },
    goHome() {
      this.$router.push('/');
    },
    logout() {
      localStorage.removeItem('cmsAuth');
      this.$router.push('/cms-login');
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.cms-page {
  min-height: 100vh;
  background-color: white;
  padding: 1.25rem;
  font-family: 'DM Mono', monospace;
}

.cms-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--blue);
  gap: 1rem;
  flex-wrap: wrap;
}

.header-actions {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.cms-title {
  font-size: 1.5rem;
  color: var(--black);
  margin: 0;
  font-weight: 600;
}

.back-btn,
.logout-btn {
  background: none;
  border: 2px solid var(--blue);
  color: var(--blue);
  padding: 0.5rem 1rem;
  border-radius: 3px;
  cursor: pointer;
  font-family: 'DM Mono', monospace;
  font-size: 0.85rem;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.back-btn:hover,
.logout-btn:hover {
  background-color: var(--blue);
  color: white;
}

.cms-main {
  max-width: 1000px;
  margin: 0 auto;
}

.btn-add-project {
  display: block;
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  background-color: var(--blue);
  color: white;
  border: none;
  border-radius: 3px;
  font-size: 0.95rem;
  font-family: 'DM Mono', monospace;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-add-project:hover {
  background-color: #0066cc;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: #999;
  font-size: 1rem;
}

.projects-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.project-card {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 1rem;
  background-color: #fafafa;
  transition: all 0.3s ease;
}

.project-card:hover {
  border-color: var(--blue);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
  gap: 0.75rem;
}

.project-header-content {
  flex: 1;
  min-width: 0;
}

.project-title {
  margin: 0;
  color: var(--black);
  font-size: 1rem;
  font-weight: 600;
  word-break: break-word;
}

.project-meta {
  font-size: 0.8rem;
  color: #999;
  margin-top: 0.25rem;
}

.btn-delete {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.2s ease;
  padding: 0.5rem;
}

.btn-delete:hover {
  transform: scale(1.2);
}

.form-fields-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.form-group {
  margin-bottom: 0;
}

.form-label {
  display: block;
  margin-bottom: 0.25rem;
  font-weight: 600;
  color: var(--black);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 3px;
  font-family: 'DM Mono', monospace;
  font-size: 0.85rem;
  transition: all 0.3s ease;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--blue);
  box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.1);
}

.form-textarea {
  resize: vertical;
  grid-column: 1 / -1;
}

.image-preview-compact {
  margin-top: 0.75rem;
  height: 80px;
  overflow: hidden;
  border-radius: 3px;
  background: white;
  border: 1px solid #ddd;
}

.image-preview-compact img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cms-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 2px solid var(--blue);
}

.btn-save,
.btn-cancel {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 3px;
  font-family: 'DM Mono', monospace;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-save {
  background-color: var(--blue);
  color: white;
}

.btn-save:hover {
  background-color: #0066cc;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}

.btn-cancel {
  background-color: #f0f0f0;
  color: #666;
  border: 1px solid #ddd;
}

.btn-cancel:hover {
  background-color: #e0e0e0;
}

.message {
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 4px;
  text-align: center;
  font-weight: 600;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.message.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

@media (max-width: 768px) {
  .cms-page {
    padding: 1rem;
  }

  .cms-header {
    flex-direction: row;
    gap: 1rem;
    align-items: center;
  }

  .cms-title {
    font-size: 1.25rem;
    flex: 1;
  }

  .back-btn {
    white-space: nowrap;
  }

  .project-card {
    padding: 0.75rem;
  }

  .form-fields-grid {
    grid-template-columns: 1fr;
  }

  .cms-actions {
    flex-direction: row;
    gap: 0.5rem;
  }
}

@media (max-width: 480px) {
  .cms-page {
    padding: 0.75rem;
  }

  .cms-header {
    flex-direction: column;
    gap: 0.75rem;
    align-items: stretch;
  }

  .back-btn {
    width: 100%;
  }

  .project-card {
    padding: 0.6rem;
  }

  .btn-add-project {
    padding: 0.6rem;
    font-size: 0.85rem;
  }

  .form-label {
    font-size: 0.7rem;
  }

  .form-input,
  .form-textarea {
    font-size: 0.75rem;
    padding: 0.4rem;
  }

  .cms-actions {
    flex-direction: column;
  }
}
</style>
