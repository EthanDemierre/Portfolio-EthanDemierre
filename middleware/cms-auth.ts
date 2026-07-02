export default defineRouteMiddleware((to, from) => {
  if (process.server) return;

  const auth = localStorage.getItem('cmsAuth');
  
  if (!auth) {
    return navigateTo('/cms-login');
  }

  try {
    const authData = JSON.parse(auth);
    if (!authData.authenticated) {
      return navigateTo('/cms-login');
    }
  } catch {
    return navigateTo('/cms-login');
  }
});
