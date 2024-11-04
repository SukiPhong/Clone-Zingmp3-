import React, { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsFillPlayFill, BsThreeDots } from 'react-icons/bs';
const SectionItem = ({
    link,
    title,
    thumbnail,
    artistNames,
    sortDescription,
    data,
    time,
}) => {
    const navigate = useNavigate();
    const [isShow, setIsShow] = useState(false);
    return (
        <div className="flex flex-col gap-3 w-[20%] text-sm pr-4 pb-2">
            <div
                className="relative group overflow-hidden rounded-lg"
                onClick={() =>
                    navigate(link?.split('.')[0], { state: { playAlbum: false } })
                }
                onMouseEnter={() => {
                    setIsShow(true);
                }}
                onMouseLeave={() => {
                    setIsShow(false);
                }}
            >
                <img
                    src={thumbnail}
                    alt={title}
                    className="w-full  rounded-lg cursor-pointer group-hover:animate-scale-up-center  "
                />
                <div className="absolute  inset-0 group-hover:bg-gradient-to-t from-black/60    to-transparent flex items-center justify-center ">
                    {isShow && (
                        <p className=" w-full  h-auto flex  text-white items-center justify-evenly">
                            {' '}
                            <span>
                                <AiOutlineHeart size={20} />
                            </span>
                            <span
                                className="p-1 border border-white rounded-full"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(link?.split('.')[0], {
                                        state: { playAlbum: true },
                                    });
                                }}
                            >
                                <BsFillPlayFill size={30} />
                            </span>
                            <span>
                                <BsThreeDots size={20} />
                            </span>
                        </p>
                    )}
                </div>
            </div>
            <span className=" flex flex-col">
                <span className="font-semibold">
                    {title.length > 30 ? title?.slice(0, 30) + '...' : title}
                </span>
                {data?.sectionId === 'h100' ? (
                    <span>{artistNames}</span>
                ) : time ? (
                    <span>{time}</span>
                ) : (
                    <span>
                        {sortDescription.length >= 40
                            ? `${sortDescription.slice(0, 40)}...`
                            : ''}
                    </span>
                )}
            </span>
        </div>
    );
};

export default memo(SectionItem);
