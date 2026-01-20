import React, { useEffect, useRef } from "react";
import jsimg from "../assets/jsimg.png";

const ModalPractice = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="absolute shadow shadow-gray-200 w-100 h-auto max-h-49 overflow-y-auto overflow-x-hidden custom-scrollbar bg-white mt-1.5 rounded-2xl py-4 px-5"
    >
      <div className="flex flex-wrap gap-5  ">
        <div className="bg-[#fffd6a75] flex flex-wrap items-center justify-between w-42.5 h-17.5 py-1.5  px-4 rounded-lg">
          <img className="w-8.25 rounded-sm" src={jsimg} alt="" />
          <div>
            <p className="text-[13px] font-medium text-red-500 ">
              JavaScript test
            </p>
            <p className="text-[13px] font-normal w-20 text-red-500">
              Write essays with a clear..
            </p>
          </div>
        </div>

        <div className="bg-[#fffd6a75] flex items-center justify-between w-42.5 h-17.5 py-1.5  px-4 rounded-lg">
          <img className="w-8.25 rounded-sm" src={jsimg} alt="" />
          <div>
            <p className="text-[13px] font-medium text-red-500 ">
              JavaScript test
            </p>
            <p className="text-[13px] font-normal w-20 text-red-500">
              Write essays with a clear..
            </p>
          </div>
        </div>

        <div className="bg-[#fffd6a75] flex items-center justify-between w-42.5 h-17.5 py-1.5  px-4 rounded-lg">
          <img className="w-8.25 rounded-sm" src={jsimg} alt="" />
          <div>
            <p className="text-[13px] font-medium text-red-500 ">
              JavaScript test
            </p>
            <p className="text-[13px] font-normal w-20 text-red-500">
              Write essays with a clear..
            </p>
          </div>
        </div>

        <div className="bg-[#fffd6a75] flex items-center justify-between w-42.5 h-17.5 py-1.5  px-4 rounded-lg">
          <img className="w-8.25 rounded-sm" src={jsimg} alt="" />
          <div>
            <p className="text-[13px] font-medium text-red-500 ">
              JavaScript test
            </p>
            <p className="text-[13px] font-normal w-20 text-red-500">
              Write essays with a clear..
            </p>
          </div>
        </div>

        <div className="bg-[#fffd6a75] flex items-center justify-between w-42.5 h-17.5 py-1.5  px-4 rounded-lg">
          <img className="w-8.25 rounded-sm" src={jsimg} alt="" />
          <div>
            <p className="text-[13px] font-medium text-red-500 ">
              JavaScript test
            </p>
            <p className="text-[13px] font-normal w-20 text-red-500">
              Write essays with a clear..
            </p>
          </div>
        </div>

        <div className="bg-[#fffd6a75] flex items-center justify-between w-42.5 h-17.5 py-1.5  px-4 rounded-lg">
          <img className="w-8.25 rounded-sm" src={jsimg} alt="" />
          <div>
            <p className="text-[13px] font-medium text-red-500 ">
              JavaScript test
            </p>
            <p className="text-[13px] font-normal w-20 text-red-500">
              Write essays with a clear..
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPractice;
