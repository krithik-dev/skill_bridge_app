// src/utils/mitScraper.ts
import axios from 'axios';
import * as cheerio from 'cheerio';

export interface CourseItem {
  title: string;
  link: string;
}

export const fetchMitCourses = async (query: string): Promise<CourseItem[]> => {
  try {
    const url = `https://ocw.mit.edu/search/?q=${encodeURIComponent(query)}`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const courses: CourseItem[] = [];

    // Primary selector: Look for course search results
    $('.result-item__title a, .SearchResult a').each((i, el) => {
      if (i < 10) {
        const $el = $(el);
        const title = $el.text().trim();
        const href = $el.attr('href');
        if (title && href) {
          const link = href.startsWith('http') ? href : 'https://ocw.mit.edu' + href;
          courses.push({ title, link });
        }
      }
    });

    return courses;
  } catch (error) {
    console.error('Failed to scrape MIT OCW:', error);
    return [];
  }
};
