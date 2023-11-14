"use server"

import Product from "../models/product.model";
import { connectToDB } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper";

export async function scrapeAndStoreProduct(productUrl:string) {
  if(!productUrl) {
    console.log("No productUrl in scrapeAndStoreProduct");
    return;
  }
  console.log("scrapeAndStoreProduct before try block");
  try {
    connectToDB();
    const scrapedProduct = await scrapeAmazonProduct(productUrl);
    if (!scrapedProduct) return;
    let product = scrapedProduct;
    const existingProduct= await Product.findOne({url: product.url})

    console.log("scrapedProduct from try block:", scrapedProduct);
  } catch (error: any) {
    throw new Error(`Failed to create/update product: ${error.message}`)
  }
}
