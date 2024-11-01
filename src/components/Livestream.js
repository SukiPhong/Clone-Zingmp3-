import React, { memo } from 'react';
import { handleCalculator } from '../utils/fn';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { Link } from 'react-router-dom';
const Livestream = ({ img, title, activeUsers, link }) => {
    return (
        <div className=" w-full flex flex-col gap-[15px] p-1  ">
            <Link
                className="relative  group overflow-hidden rounded-full cursor-pointer p-2 bg-red-400 "
                to={link}
            >
                <img
                    src={img}
                    alt="singer"
                    className="w-full object-contain   rounded-full   overflow-hidden group-hover:animate-scale-up-center    "
                />
                <div className="absolute  p-1  inset-0 group-hover:bg-gradient-to-t from-black/60    to-transparent flex items-center justify-center rounded-full"></div>
                <div className="absolute left-0 right-0 bottom-0 flex items-center justify-center ">
                    <span className="text-white font-xs bg-red-600 flex w-[35px] justify-center rounded-l-md rounded-r-md">
                        Live
                    </span>
                </div>
            </Link>
            <div className=" flex  flex-col justify-center items-center gap-2">
                <div className="text-xl font-medium text-slate-700 ">{title}</div>
                <span className="text-ms font-medium flex ">{`${handleCalculator(
                    activeUsers,
                )} đang nghe`}</span>
            </div>
        </div>
    );
};

export default memo(Livestream);
