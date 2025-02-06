import React from 'react';

import { MdOutlineCancel } from 'react-icons/md';

import { useStateContext } from '@/contexts/ContextProvide';
import { avatar, userProfileData } from '@/data/dummy';

import { Button } from '.';

const UserProfile = () => {
  const { currentColor } = useStateContext();

  return (
    <div className="nav-item absolute top-16 right-1 w-96 rounded-lg bg-white p-8 dark:bg-[#42464D]">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold dark:text-gray-200">User Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="border-color mt-6 flex items-center gap-5 border-b-1 pb-6">
        <img className="h-24 w-24 rounded-full" src={avatar} alt="user-profile" />
        <div>
          <p className="text-xl font-semibold dark:text-gray-200"> Michael Roberts </p>
          <p className="text-sm text-gray-500 dark:text-gray-400"> Administrator </p>
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400"> info@shop.com </p>
        </div>
      </div>
      <div>
        {userProfileData.map((item, index) => (
          <div
            key={index}
            className="border-color hover:bg-light-gray flex cursor-pointer gap-5 border-b-1 p-4 dark:hover:bg-[#42464D]"
          >
            <button
              type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className="hover:bg-light-gray rounded-lg p-3 text-xl"
            >
              {item.icon}
            </button>

            <div>
              <p className="font-semibold dark:text-gray-200">{item.title}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400"> {item.desc} </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <Button
          color="white"
          bgColor={currentColor}
          text="Logout"
          borderRadius="10px"
          width="full"
        />
      </div>
    </div>
  );
};

export default UserProfile;
