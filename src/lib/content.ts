import fs from 'fs';
import path from 'path';

/**
 * Retrieves the markdown content for a specific chapter from the filesystem.
 * This replaces the hardcoded string map with a file-based approach.
 */
export function getChapterContent(courseSlug: string, chapterSlug: string): string {
   try {
      const filePath = path.join(process.cwd(), 'src', 'content', courseSlug, `${chapterSlug}.md`);

      if (fs.existsSync(filePath)) {
         return fs.readFileSync(filePath, 'utf-8');
      }

      return getComingSoonContent();
   } catch (error) {
      console.error(`Error reading chapter content for ${courseSlug}/${chapterSlug}:`, error);
      return getComingSoonContent();
   }
}

function getComingSoonContent(): string {
   return `
# Coming Soon

This chapter is currently being written. Check back soon for the full content!

In the meantime, explore our other available chapters to continue your learning journey.
`;
}
