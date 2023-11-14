"use server"

import { scrapeAmazonProduct } from "../scraper";

export async function scrapeAndStoreProduct(productUrl:string) {
  if(!productUrl) {
    console.log("No productUrl in scrapeAndStoreProduct");
    return;
  }
  console.log("scrapeAndStoreProduct before ty block");
  try {
    const scrapedProduct = await scrapeAmazonProduct(productUrl);
    if (!scrapedProduct) return;
    
    console.log("scrapedProduct from try block:", scrapedProduct);
  } catch (error: any) {
    throw new Error(`Failed to create/update product: ${error.message}`)
  }
}
