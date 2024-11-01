import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { NavLink, useSearchParams } from 'react-router-dom';
import { SearchMenu } from '../../utils/menu';
import { useSelector } from 'react-redux';
const notActiveStyle = 'px-4 hover:text-main-500 font-semibold cursor-pointer';
const ActiveStyle =
    'px-4 hover:text-main-500 font-semibold cursor-pointer hover:border-b-2 border-green-900  h-[54px] flex items-center';
const SearchPublic = () => {
    const { keyword } = useSelector((state) => state.music);

    return (
        <div className="w-full">
            <div className="w-auto h-[70px]"></div>
            <div className="flex  h-[50px] mb-7 items-center text-sm border-b border-gray-400 pl-[67px] pb-1">
                <span className="text-[24px] font-bold pr-6 border-r flex border-gray-400">
                    Kết quả tìm kiếm
                </span>
                <div className="flex items-center">
                    {SearchMenu.map((e) => (
                        <NavLink
                            key={e.path}
                            to={`${e.path}?q=${keyword}`}
                            className={(isActive) =>
                                isActive ? ActiveStyle : notActiveStyle + ''
                            }
                        >
                            {e.text}
                        </NavLink>
                    ))}
                </div>
            </div>
            <div className="w-full">
                <Outlet />
            </div>
            <div className="w-full h-[90px]"></div>
        </div>
    );
};

export default SearchPublic;
