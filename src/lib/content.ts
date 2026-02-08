import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface ChapterContent {
   content: string;
   data: {
      title?: string;
      description?: string;
      tags?: Array<{ label: string; icon?: string }>;
      difficulty?: "easy" | "medium" | "hard";
      companies?: Array<{ name: string; fallback: string; imageSrc?: string }>;
      author?: string;
      publishedDate?: string;
      [key: string]: any;
   };
}

/**
 * Retrieves the markdown content for a specific chapter from the filesystem.
 * Parses frontmatter metadata using gray-matter.
 */
export function getChapterContent(courseSlug: string, chapterSlug: string): ChapterContent {
   try {
      const filePath = path.join(process.cwd(), 'src', 'content', courseSlug, `${chapterSlug}.md`);

      if (fs.existsSync(filePath)) {
         const fileContent = fs.readFileSync(filePath, 'utf-8');
         const { content, data } = matter(fileContent);
         return { content, data };
      }

      return getComingSoonContent();
   } catch (error) {
      console.error(`Error reading chapter content for ${courseSlug}/${chapterSlug}:`, error);
      return getComingSoonContent();
   }
}

function getComingSoonContent(): ChapterContent {
   const content = `
# Coming Soon

This chapter is currently being written. Check back soon for the full content!

In the meantime, explore our other available chapters to continue your learning journey.
`;
   return { content, data: { title: "Coming Soon" } };
}
