import { getProductById } from '@/lib/actions';
import { Product } from '@/types';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import React from 'react'
import Link from 'next/link';
import PriceInfoCard from '@/components/PriceInfoCard';
import Modal from '@/components/Modal';

type Props = {
  params: { id: string }
}

const ProductDetails = async ({ params: { id } }: Props) => {
  const product: Product = await getProductById(id);
  if(!product) redirect('/')

  return (
    <div className="product-container">
      <div className="flex gap-28 xl:flex-row flex-col">
        <div className="product-image">
          <Image
            src={product.image}
            alt={product.title}
            width={580}
            height={400}
            className="image-content"
          />
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
            <div className="flex flex-col gap-3">
              <p className="text-[24px] text-black font-semibold">
                {product.title}
              </p>

              <Link
                href={product.url}
                target="_blank"
                className="text-base text-black opacity-50"
              >
                Visit Product
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-white-200 rounded-10">
                <Image
                  src="/assets/icons/bookmark.svg"
                  alt="bookmark"
                  width={20}
                  height={20}
                />
              </div>

              <div className="p-2 bg-white-200 rounded-10">
                <Image
                  src="/assets/icons/share.svg"
                  alt="share"
                  width={20}
                  height={20}
                />
              </div>
            </div>
          </div>

          <div className="product-info">
            <div className="flex flex-col gap-2">
              <p className="text-[34px] text-black font-bold">
                {product.currency} {product.currentPrice}
              </p>
              {product.currentPrice !== product.originalPrice && (
                <p className="text-[21px] text-black opacity-50 line-through">
                  {product.currency} {product.originalPrice}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                {product.currentPrice !== product.originalPrice && (
                  <div className="product-discount">
                      <Image
                        src="/assets/icons/savings.svg"
                        alt="savings"
                        width={16}
                        height={16}
                      />
                      <p className="text-sm text-primary font-semibold">
                        -{product.discountRate}%
                      </p>
                  </div>
                )}

                <div className="product-rating">
                  <Image
                    src="/assets/icons/star.svg"
                    alt="rating"
                    width={16}
                    height={16}
                  />
                  <p className="text-sm text-secondary font-semibold pl-1">
                    {product.rating || "unknown"}
                  </p>
                </div>

                <div className="product-reviews">
                  <Image
                    src="/assets/icons/comment.svg"
                    alt="reviews"
                    width={16}
                    height={16}
                  />
                  <p className="text-sm text-black font-semibold">
                    {product.ratingsNum} ratings
                  </p>
                </div>
              </div>

              <p className="text-sm text-black opacity-50">
              <span className={product.fiveStarReviews >= 51 ? "text-primary-green font-semibold" : "text-primary font-semibold"}>
                {product.fiveStarReviews}%
              </span> of the reviews are five-star ratings
              </p>
            </div>
          </div>

          <div className='my-7 flex flex-col gap-5'>
            <div className='flex gap-5 flex-wrap'>
            <PriceInfoCard
                title="Current Price"
                iconSrc="/assets/icons/price-tag.svg"
                value={`${product.currency} ${product.currentPrice}`}
              />
              <PriceInfoCard
                title="Average Price"
                iconSrc="/assets/icons/chart.svg"
                value={`${product.currency} ${product.averagePrice}`}
              />
              <PriceInfoCard
                title="Highest Price"
                iconSrc="/assets/icons/arrow-up.svg"
                value={`${product.currency} ${product.highestPrice}`}
              />
              <PriceInfoCard
                title="Lowest Price"
                iconSrc="/assets/icons/arrow-down.svg"
                value={`${product.currency} ${product.lowestPrice}`}
              />
            </div>
          </div>
          <Modal productId={id}/>
        </div>
      </div>

      <div className="flex">

      </div>
    </div>
  )
}

export default ProductDetails
