import React from 'react';

import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { MdOutlineCancel } from 'react-icons/md';

import { useStateContext } from '@/contexts/ContextProvide';
import { cartData } from '@/data/dummy';

import { Button } from '.';

const Cart = () => {
  const { currentColor } = useStateContext();

  return (
    <div className="bg-half-transparent nav-item fixed top-0 right-0 w-full">
      <div className="float-right h-screen bg-white p-8 transition-all duration-1000 ease-in-out md:w-400 dark:bg-[#484B52] dark:text-gray-200">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Shopping Cart</p>
          <Button
            icon={<MdOutlineCancel />}
            color="rgb(153, 171, 180)"
            bgHoverColor="light-gray"
            size="2xl"
            borderRadius="50%"
          />
        </div>
        {cartData?.map((item, index) => (
          <div key={index}>
            <div>
              <div className="border-color flex items-center gap-5 border-b-1 p-4 leading-8 dark:border-gray-600">
                <img className="h-80 w-24 rounded-lg" src={item.image} alt="" />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                    {item.category}
                  </p>
                  <div className="mt-2 flex items-center gap-4">
                    <p className="text-lg font-semibold">{item.price}</p>
                    <div className="border-color flex items-center rounded border-1 border-r-0">
                      <p className="border-color border-r-1 p-2 text-red-600 dark:border-gray-600">
                        <AiOutlineMinus />
                      </p>
                      <p className="border-color border-r-1 p-2 text-green-600 dark:border-gray-600">
                        0
                      </p>
                      <p className="border-color border-r-1 p-2 text-green-600 dark:border-gray-600">
                        <AiOutlinePlus />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="mt-3 mb-3">
          <div className="flex items-center justify-between">
            <p className="text-gray-500 dark:text-gray-200">Sub Total</p>
            <p className="font-semibold">$890</p>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <p className="text-gray-500 dark:text-gray-200">Total</p>
            <p className="font-semibold">$890</p>
          </div>
        </div>
        <div className="mt-5">
          <Button
            color="white"
            bgColor={currentColor}
            text="Place Order"
            borderRadius="10px"
            width="full"
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
