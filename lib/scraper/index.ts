import axios from "axios";
import * as cheerio from 'cheerio';
import ScrapingAntClient from '@scrapingant/scrapingant-client';

export async function scrapeAmazonProduct(url: string) {
  if (!url) {
    console.log("No url in scrapeAmazonProduct")
    return;
  }
  console.log("Before try block in scrapeAmazonProduct");
  const client = new ScrapingAntClient({ apiKey: process.env.SCRAPING_ANT_KEY});

  try {
    //Scraping logic
  } catch (error: any) {
    throw new Error(`Failed to scrape product: ${error.message}`)
  }
}
