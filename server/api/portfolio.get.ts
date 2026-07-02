export default defineEventHandler((event) => {
  const pdfUrl = 'https://cdn.builder.io/api/v1/image/assets%2F08dd6309d008452ca33868c5e5cb97f5%2Fportfolio-pdf';
  
  return sendRedirect(event, pdfUrl, 301);
});
