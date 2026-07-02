import { readFileSync } from 'fs';
import { join } from 'path';

export default defineEventHandler(async (event) => {
  try {
    const filePath = join(process.cwd(), 'server/api/projects.json');
    const fileContent = readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);
    return data.projects;
  } catch (error) {
    console.error('Error reading projects:', error);
    return [];
  }
});
