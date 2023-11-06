"use client"

import { scrapeAndStoreProduct } from "@/lib/actions";
import { FormEvent, useState } from "react"

const isValidAmazonURL = (url:string) => {
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;
    if (hostname.includes('amazon')) {
      return true;
    }
  } catch (error) {
    return false;
  }
}

const Searchbar = () => {
  const [searchPrompt, setSearchPrompt] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValidLink = isValidAmazonURL(searchPrompt)
    if (!isValidLink) return alert('Please provide a valid Amazon link')

    try {
      setIsLoading(true);
      console.log("Searchbar before awaiting scrapeAndStoreProduct")
      const product = await scrapeAndStoreProduct(searchPrompt);
      console.log("Product from try block in searchbar:", product);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      className='flex flex-wrap gap-4 mt-12'
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Enter product link"
        className="searchbar-input"
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
      />
      <button
        type="submit"
        className="searchbar-btn"
        disabled={searchPrompt === ''}
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  )
}

export default Searchbar
