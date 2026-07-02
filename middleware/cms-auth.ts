export default defineRouteMiddleware((to, from) => {
  if (process.server) return;

  const auth = localStorage.getItem('cmsAuth');

  if (!auth) {
    return navigateTo('/cms-login');
  }

  try {
    const authData = JSON.parse(auth);
    if (!authData.authenticated) {
      localStorage.removeItem('cmsAuth');
      return navigateTo('/cms-login');
    }
  } catch (e) {
    localStorage.removeItem('cmsAuth');
    return navigateTo('/cms-login');
  }
});
