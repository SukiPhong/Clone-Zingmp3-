import React, { memo } from 'react';
import { handleCalculator } from '../utils/fn';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { Link } from 'react-router-dom';
const Artist = ({ img, title, follower, link }) => {
    return (
        <div className=" w-1/5 flex flex-col gap-[15px]">
            <Link
                className="relative  group overflow-hidden rounded-full cursor-pointer"
                to={link}
            >
                <img
                    src={img}
                    alt="singer"
                    className="w-full object-contain rounded-full   overflow-hidden group-hover:animate-scale-up-center   "
                />
                <div className="absolute  p-1 inset-0 group-hover:bg-gradient-to-t from-black/60    to-transparent flex items-center justify-center rounded-full"></div>
            </Link>
            <div className=" flex  flex-col justify-center items-center gap-2">
                <Link
                    to={link}
                    className="text-sm font-medium hover:underline hover:text-main-500 "
                >
                    {title}
                </Link>
                <span className="text-xs font-medium flex ">{`${handleCalculator(
                    follower,
                )} quan tâm`}</span>
                <button
                    type="button"
                    className="bg-main-500 px-4 py-1 text-white rounded-r-full rounded-l-full flex items-center justify-center gap-1"
                >
                    <span>
                        <AiOutlineUserAdd />
                    </span>
                    <span className="text-xs opacity-70"> Quan tâm</span>
                </button>
            </div>
        </div>
    );
};

export default memo(Artist);
