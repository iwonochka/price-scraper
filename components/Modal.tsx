"use client"
import React, { FormEvent, Fragment, useState, useEffect} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image';
import { addUserEmailToProduct } from '@/lib/actions';

interface Props {
  productId: string;
}

const Modal = ({ productId }: Props) => {
  let [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false)
    setTimeout(() => {
      setMessage('');
    }, 200);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await addUserEmailToProduct(productId, email);
    if (result === true) {
      setMessage(`Yaay! You're tracking this product now. Check your mailbox (including spam folder) for more info.`);
    } else {
      setMessage(result);
    }
    setIsSubmitting(false)
    setEmail('')
  }

  return (
    <>
    <button type="button" className="btn rounded-[10px]" onClick={openModal}>
      Track item
    </button>
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" onClose={closeModal} className="dialog-container">
      <div className="min-h-screen px-4 text-center">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0" />
        </Transition.Child>

        {/* Span for centering the modal vertically */}
        <span
          className="inline-block h-screen align-middle"
          aria-hidden="true"
        />

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="dialog-content">
            <div className="flex flex-col">
              <div className="flex justify-between">
                <div className='flex justify-start gap-2'>
                  <div className="p-3 border border-gray-200 rounded-10">
                    <Image
                      src="/assets/icons/logo.svg"
                      alt="logo"
                      width={28}
                      height={28}
                    />
                  </div>
                  <h4 className="dialog-head_text">
                    {message ? '' : 'Set product pricing alert!'}
                  </h4>
                </div>

                <Image
                  src="/assets/icons/x-close.svg"
                  alt="close"
                  width={24}
                  height={24}
                  className="cursor-pointer"
                  onClick={closeModal}
                />
              </div>

              <p className="text-sm text-gray-600 mt-4">
                {message ?? `We'll notify you when the price of your item drops.`}
              </p>
            </div>
            {!message &&
            <form className="flex flex-col mt-5" onSubmit={handleSubmit}>
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="dialog-input_container">
                <Image
                  src="/assets/icons/mail.svg"
                  alt='mail'
                  width={18}
                  height={18}
                />

                <input
                  required
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className='dialog-input'
                />
              </div>

              <button type="submit"
                className="dialog-btn"
              >
                {isSubmitting ? 'Submitting...' : 'Track item'}
              </button>
            </form>
            }
          </div>
        </Transition.Child>
      </div>
      </Dialog>
    </Transition>
    </>
  )
}

export default Modal
