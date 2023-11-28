//Server functions
"use server"

import { revalidatePath } from "next/cache";
import Product from "../models/product.model";
import { connectToDB } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from '../utils';
import { User } from "@/types";

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
    const existingProduct= await Product.findOne({url: scrapedProduct.url});

    if (existingProduct) {
      const updatedPriceHistory: any = [
        ...existingProduct.priceHistory,
        { price: scrapedProduct.currentPrice }

      ]
       product = {
        ...scrapedProduct,
        priceHistory: updatedPriceHistory,
        lowestPrice: getLowestPrice(updatedPriceHistory),
        highestPrice: getHighestPrice(updatedPriceHistory),
        averagePrice: getAveragePrice(updatedPriceHistory),
      }
    }

    const newProduct = await Product.findOneAndUpdate(
      { url: scrapedProduct.url },
      product,
      { upsert: true, new: true }
    );

    revalidatePath(`/products/${newProduct._id}`);

  } catch (error: any) {
    throw new Error(`Failed to create/update product: ${error.message}`)
  }
}

export async function getProductById(productId: string) {
  try {
    connectToDB();
    const product = await Product.findOne({_id: productId});
    if(!product) return null;
    return product;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllProducts() {
  try {
    connectToDB();
    const products = await Product.find();
    console.log(products);
    return products;
  } catch (error) {
    console.log(error);
  }
}

export async function addUserEmailToProduct(productId: string, userEmail: string) {
  try {
    connectToDB();
    const product = await Product.findById(productId);
    if (!product) return;
    const userExists = product.users.some((user: User) => user.email === userEmail);
    if(!userExists) {
      product.users.push({email: userEmail})
      await product.save();
      //const emailContent = generateEmailBody();
    }

  } catch (error) {
    console.log(error);
  }

}
