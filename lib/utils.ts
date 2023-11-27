import { Cheerio } from "cheerio";
import { PriceHistoryItem } from "@/types";

export function extractPrice(...elements: any) {
  for (const element of elements) {
    const priceText = element.text().trim();

    if(priceText) {
      const cleanPrice = priceText.replace(/[^\d.]/g, '');

      let firstPrice;

      if (cleanPrice) {
        firstPrice = cleanPrice.match(/\d+\.\d{2}/)?.[0];
      }
      return firstPrice || cleanPrice;
    }
  }

  return '';
}

export function extractCurrency(element: any) {
  const currencyText = element.text().trim().slice(0, 1);
  return currencyText ? currencyText : "";
}

export function getLowestPrice(priceList: PriceHistoryItem[]) {
  let lowestPrice = priceList[0];

  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price < lowestPrice.price) {
      lowestPrice = priceList[i];
    }
  }
  return lowestPrice.price;
}

export function getHighestPrice(priceList: PriceHistoryItem[]) {
  let highestPrice = priceList[0];

  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price > highestPrice.price) {
      highestPrice = priceList[i];
    }
  }
  return highestPrice.price;
}

export function getAveragePrice(priceList: PriceHistoryItem[]) {
  const sumOfPrices = priceList.reduce((acc, curr) => acc + curr.price, 0);
  const averagePrice = sumOfPrices / priceList.length || 0;
  return averagePrice;
}

export function removeDuplicateValues(str: string) {
  const values = str.split(/\s+/);
  return values[0];
}

export function combinePrice (whole: any, fraction: any) {
  let wholeNum = whole || "";
  if (wholeNum.includes('.')) {
    wholeNum = wholeNum.split('.')[0];
  }
  const fractionNum = fraction.text().trim().substring(0, 2) || 0;
  return parseFloat(`${wholeNum}.${fractionNum}`);
}

export function calculateDiscountPercentage(originalPrice: number, currentPrice: number) {
  const discount = ((originalPrice - currentPrice) / originalPrice) * 100;
  return Math.round(discount);
}
