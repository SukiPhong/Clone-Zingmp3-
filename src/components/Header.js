import React from 'react';
import icons from '../utils/icons';
import Search from './Search';
import { useNavigate, useParams } from 'react-router-dom';
const { HiArrowNarrowRight, HiArrowNarrowLeft } = icons;
const Header = () => {
    const navigate = useNavigate();
    const { singer } = useParams();
    return (
        <div className="flex justify-between w-full items-center">
            <div className="flex gap-6 w-full  items-center">
                <div className="flex gap-6 ">
                    <span
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        <HiArrowNarrowLeft size={24} color={singer ? 'gray' : 'black'} />
                    </span>
                    <span
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        <HiArrowNarrowRight size={24} color={singer ? 'gray' : 'black'} />
                    </span>
                </div>
                <div className="w-1/2">
                    <Search />
                </div>
            </div>
            <div>login</div>
        </div>
    );
};
export default Header;
