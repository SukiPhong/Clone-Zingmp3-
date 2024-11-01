import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SongItem } from '../components';
const NewRelease = () => {
    const [isActive, setIsActive] = useState(0);
    const { newRelease } = useSelector((state) => state.app);
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        setSongs(isActive === 0 ? newRelease?.items?.vPop : newRelease?.items?.others);
    }, [isActive, newRelease]);

    return (
        <div className="mt-12 px-[59px]  flex  flex-col gap-5">
            <div className=" flex items-center justify-between">
                <h3 className="text-[20px] font-bold">{newRelease?.title}</h3>
                <span>tat ca</span>
            </div>
            <div className="flex items-center gap-5">
                <button
                    type="button"
                    onClick={() => setIsActive(0)}
                    className={`py-1 px-4 rounded-l-full rounded-r-full border border-gray-400 bg-transparent text-xs ${
                        isActive === 0 ? '!bg-main-500 text-white' : ''
                    }`}
                >
                    Việt Nam
                </button>
                <button
                    type="button"
                    onClick={() => setIsActive(1)}
                    className={`py-1 px-4 rounded-l-full rounded-r-full border border-gray-400 bg-transparent text-xs ${
                        isActive === 1 ? '!bg-main-500 text-white' : ''
                    }`}
                >
                    Quốc Tế
                </button>
            </div>

            <div className=" flex flex-wrap w-full gap-2 ">
                {songs
                    ?.filter((e, index) => index <= 11)
                    ?.map((e) => (
                        <div
                            key={e.encodeId}
                            className="w-[45%] mr-6  min-[1024px]:w-[30%]"
                        >
                            <SongItem
                                thumbnail={e.thumbnail}
                                title={e.title}
                                artistsNames={e.artistsNames}
                                releaseDate={e.releaseDate}
                                sid={e.encodeId}
                            />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default NewRelease;
