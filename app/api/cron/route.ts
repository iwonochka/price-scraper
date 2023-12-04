import Product from "@/lib/models/product.model";
import { connectToDB } from "@/lib/mongoose"
import { scrapeAmazonProduct } from "@/lib/scraper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "@/lib/utils";

export async function GET() {
  try {
    connectToDB();
    const products = await Product.find({});
    if (!products || products.length === 0) throw new Error("No products found.")

    const updatedProducts = await Promise.all(
      products.map(async (currentProduct) => {
        //We're scraping each product and updating price history and all the price types:
        const scrapedProduct = await scrapeAmazonProduct(currentProduct.url);

        if (!scrapedProduct) return;

        const updatedPriceHistory = [
          ...currentProduct.priceHistory,
          {
            price: scrapedProduct.currentPrice,
          },
        ];

        const product = {
          ...scrapedProduct,
          priceHistory: updatedPriceHistory,
          lowestPrice: getLowestPrice(updatedPriceHistory),
          highestPrice: getHighestPrice(updatedPriceHistory),
          averagePrice: getAveragePrice(updatedPriceHistory),
        };

        const updatedProduct = await Product.findOneAndUpdate(
          {
            url: product.url,
          },
          product
        );
      })
    );


  } catch (error) {
    throw new Error(`Error in cron GET route: ${error}`)
  }
}
