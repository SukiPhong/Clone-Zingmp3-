import React, { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../store/actions';
import moment from 'moment';
const SongItem = ({
    thumbnail,
    title,
    artistsNames,
    releaseDate,
    sid,
    order,
    percent,
    style,
    size,
}) => {
    const dispatch = useDispatch();
    return (
        // <div>min-[1024px]:w-[30%]</div>
        <div
            onClick={() => {
                dispatch(actions.setCurrentSongId(sid));
                dispatch(actions.play(true));
                dispatch(actions.Album(false));
                dispatch(
                    actions.setRecentSongs({
                        thumbnail: thumbnail,
                        title: title,
                        artistsNames: artistsNames,
                        sid: sid,
                    }),
                );
            }}
            className={`w-full flex p-[10px] gap-[10px]  items-center rounded-md cursor-pointer ${
                style || 'text-black hover:bg-main-200'
            }`}
        >
            {order && (
                <span
                    className={` ${
                        order === 1
                            ? 'text-shadow-no1'
                            : order === 2
                            ? 'text-shadow-no2'
                            : 'text-shadow-no3'
                    } text-[rgba(77,34,104,0.9)] text-[32px] mr-4`}
                >
                    {order}
                </span>
            )}
            <img
                src={thumbnail}
                alt="thumbnail"
                className={`${size || 'w-[60px] h-[60px]'} object-cover rounded-md`}
            />
            <div className={` flex flex-col`}>
                <span className="text-sm font-semibold">
                    {title?.length > 30 ? `${title?.slice(0, 30)}...` : title}
                </span>
                <span className="text-xs text-gray-700">{artistsNames}</span>
                {releaseDate && (
                    <span className={`text-xs opacity-70`}>
                        {moment(releaseDate * 1000).fromNow()}
                    </span>
                )}
            </div>
            {percent && <span className="font-bold">{`${percent}%`}</span>}
        </div>
    );
};

export default memo(SongItem);
