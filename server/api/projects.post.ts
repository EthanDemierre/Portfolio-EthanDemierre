import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

export default defineEventHandler(async (event) => {
  try {
    const projects = await readBody(event);
    const filePath = join(process.cwd(), 'server/api/projects.json');
    const data = { projects };
    writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return { success: true, message: 'Projets sauvegardés avec succès' };
  } catch (error) {
    console.error('Error saving projects:', error);
    return { success: false, message: 'Erreur lors de la sauvegarde' };
  }
});
