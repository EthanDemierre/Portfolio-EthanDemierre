<template>
  <nav class="nav-menu">
    <ul class="nav-list">
      <li><a href="/">Home</a></li>
      <li><a href="/about">À propos</a></li>
      <li><a href="/projects">Projets</a></li>
      <li><a href="/contact">Contact</a></li>
      <li><a href="/cms">CMS</a></li>
    </ul>
  </nav>
</template>

<style scoped>
.nav-menu {
  width: 100%;
  height: 100%;
}

.nav-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  list-style: none;
  height: 100%;
  padding: 0;
  margin: 0;
}

.nav-list li {
  text-align: center;
  padding: 1.5rem;
}

@media (max-width: 768px) {
  .nav-list li {
    padding: 1.25rem;
  }
}

@media (max-width: 480px) {
  .nav-list li {
    padding: 1rem;
  }
}

.nav-list a {
  text-decoration: none;
  color: white;
  font-size: 2rem;
  transition: opacity 0.3s ease;
}

@media (max-width: 768px) {
  .nav-list a {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .nav-list a {
    font-size: 1.25rem;
  }
}

.nav-list a:hover {
  opacity: 0.8;
}
</style>
