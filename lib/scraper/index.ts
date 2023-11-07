import axios from "axios";
import * as cheerio from 'cheerio';
import ScrapingAntClient from '@scrapingant/scrapingant-client';
import { extractCurrency, extractDescription, extractPrice } from "../utils";

export async function scrapeAmazonProduct(url: string) {
  if (!url) {
    console.log("No url in scrapeAmazonProduct")
    return;
  }
  console.log("Before try block in scrapeAmazonProduct");
  const client = new ScrapingAntClient({ apiKey: process.env.SCRAPING_ANT_KEY});

  try {
    const response = await client.scrape(url);
    // console.log("--response content:", response.content);
    const $ = cheerio.load(response.content);
    // console.log("--$:", $);
    const title = $('#productTitle').text().trim();
    const currentPrice = extractPrice(
      $('.priceToPay span.a-price-whole'),
      $('.a.size.base.a-color-price'),
      $('.a-button-selected .a-color-base'),
      );
    const originalPrice = extractPrice(
      $('#priceblock_ourprice'),
      $('.a-price.a-text-price span.a-offscreen'),
      $('#listPrice'),
      $('#priceblock_dealprice'),
      $('.a-size-base.a-color-price')
    );
    const outOfStock = $('#availability span').text().trim().toLowerCase() === 'currently unavailable';
    const images =
      $('#imgBlkFront').attr('data-a-dynamic-image') ||
      $('#landingImage').attr('data-a-dynamic-image') ||
      '{}'

    const imageUrls = Object.keys(JSON.parse(images));

    const currency = extractCurrency($('.a-price-symbol'))
    const discountRate = $('.savingsPercentage').text().replace(/[-%]/g, "");
    const description = extractDescription($)

    console.log("--Result:");
    console.log("title", title);
    console.log("currentPrice", currentPrice);
    console.log("originalPrice", originalPrice);
    console.log("outOfStock", outOfStock);
    console.log("imageUrls", imageUrls);
    console.log("currency", currency);
    console.log("discountRate", discountRate);
    console.log("description", description);

    //Data object

  } catch (error: any) {
    throw new Error(`Failed to scrape product: ${error.message}`)
  }
}
