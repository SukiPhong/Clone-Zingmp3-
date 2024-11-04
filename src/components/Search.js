import React, { useEffect, useState } from 'react';
import icons from '../utils/icons';
import { createSearchParams, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../store/actions';
import path from '../utils/path';
import { create } from 'lodash';
import { GrClose } from 'react-icons/gr';
const { FiSearch } = icons;
const Search = () => {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { singer } = useParams();
    useEffect(() => {
        window.addEventListener('keyup', handlerSearch);
        return () => {
            window.removeEventListener('keyup', handlerSearch);
        };
    });

    const handlerSearch = async (e) => {
        if (e.keyCode === 13) {
            dispatch(actions.search(keyword));
            navigate({
                pathname: `/${path.SEARCH}/${path.ALL}`,
                search: createSearchParams({
                    q: keyword,
                }).toString(),
                page: 1,
                type: path.ALL,
                order: path.NEWEST,
                genre: '',
            });
            setKeyword(e.target.value);
        }
    };

    return (
        <div className="w-full flex  relative items-center ">
            {keyword && (
                <span
                    onClick={() => {
                        setKeyword('');
                    }}
                    className="absolute right-[16px]  cursor-pointer "
                >
                    <GrClose size={14} />
                </span>
            )}
            <span
                className={`h-10  pl-4 rounded-l-[20px] ${
                    singer ? 'bg-[rgba(0,0,0,0.3)]' : 'bg-[#DDE4E4]'
                } flex items-center justify-center text-gray-500`}
            >
                <FiSearch size={20} />
            </span>
            <input
                type="text"
                className={`outline-none ${
                    singer
                        ? 'bg-[rgba(0,0,0,0.3)] placeholder:text-white'
                        : 'bg-[#DDE4E4]'
                } py-2 px-4 w-full rounded-r-[20px] h-10 text-gray-500`}
                placeholder="Tìm kiếm bài hát nghệ sĩ, lời bài hát..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyUp={handlerSearch}
            />
        </div>
    );
};

export default Search;
