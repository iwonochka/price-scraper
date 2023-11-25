import axios from "axios";
import * as cheerio from 'cheerio';
import ScrapingAntClient from '@scrapingant/scrapingant-client';
import { extractCurrency, extractPrice, removeDuplicateValues } from "../utils";

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
    const ratingsNum = removeDuplicateValues($('#acrCustomerReviewText').text().trim());
    const rating = removeDuplicateValues($('#acrPopover .a-size-base.a-color-base').text().trim());
    const fiveStarReviews = $('#histogramTable [aria-label*="5 stars"]').text().replace(/[-%]/g, "");

    const data = {
      url,
      currency: currency || '€',
      image: imageUrls[0],
      title,
      currentPrice: Number(currentPrice) || Number(originalPrice),
      originalPrice: Number(originalPrice) || Number(currentPrice),
      priceHistory: [],
      highestPrice: Number(originalPrice) || Number(currentPrice),
      lowestPrice: Number(currentPrice) || Number(originalPrice),
      average: Number(currentPrice) || Number(originalPrice),
      discountRate: Number(discountRate),
      isOutOfStock: outOfStock,
      rating,
      ratingsNum,
      fiveStarReviews: Number(fiveStarReviews) || "unknown"
    }

    return data;

  } catch (error: any) {
    throw new Error(`Failed to scrape product: ${error.message}`)
  }
}
