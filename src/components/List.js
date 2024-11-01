import React, { memo } from 'react';
import * as actions from '../store/actions'; // Adjust this path if necessary
import { useDispatch } from 'react-redux';
import icons from './../utils/icons';
import moment from 'moment';
const { BsMusicNoteBeamed } = icons;

const List = ({ SongData, isHideNode }) => {
    const dispatch = useDispatch();
    const handleSongClick = () => {
        dispatch(actions.setCurrentSongId(SongData?.encodeId));
        dispatch(actions.play(true));
        dispatch(actions.Album(true));
        dispatch(
            actions.setRecentSongs({
                thumbnail: SongData?.thumbnail,
                title: SongData?.title,
                artistsNames: SongData?.artistsNames,
                sid: SongData?.encodeId,
            }),
        );
    };

    return (
        <div
            onClick={handleSongClick}
            className="flex justify-between items-center p-[10px] border-t border-[rgba(0,0,0,0.05)] hover:bg-[#DDE4E4] cursor-pointer "
        >
            <div className="flex gap-3 items-center flex-1">
                {!isHideNode && (
                    <span>
                        <BsMusicNoteBeamed />
                    </span>
                )}
                <img
                    src={SongData?.thumbnail}
                    alt="thumbnailM"
                    className="w-10 h-10 object-cover rounded-md"
                />
                <div className="flex flex-col w-full">
                    <span className="text-sm font-semibold whitespace-nowrap">
                        {SongData?.title.length > 30
                            ? `${SongData?.title?.slice(0, 30)}...`
                            : SongData.title}
                    </span>
                    <span className="text-xs opacity-70">
                        {SongData?.artistsNames.length > 30
                            ? `${SongData?.artistsNames.slice(0, 30)}...`
                            : SongData.artistsNames}
                    </span>
                </div>
            </div>
            {!isHideNode && (
                <div className="flex-1 flex items-center justify-center">
                    {SongData?.album?.title?.length > 30
                        ? `${SongData?.album?.title?.slice(0, 30)}...`
                        : SongData?.album?.title}
                </div>
            )}
            <div className="flex-1 flex justify-end text-xs opacity-70 ">
                {moment.utc(SongData?.duration * 1000).format('mm:ss')}
            </div>
        </div>
    );
};

export default memo(List);
