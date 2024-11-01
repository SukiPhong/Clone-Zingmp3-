import React, { memo } from 'react';
import List from './List';
import moment from 'moment';
import icons from '../utils/icons';
import { useSelector } from 'react-redux';
const { BsDot } = icons;
const Playlist = (props) => {
    const { totalsDuration, isHideTime } = props;
    const { Songs } = useSelector((state) => state.music);

    return (
        <div className="w-full flex flex-col text-xs text-gray-600">
            <div className=" flex justify-between items-center p-[10px] font-semibold">
                <span className={isHideTime && 'font-bold text-lg'}>BÀI HÁT</span>
                {!isHideTime && <span>ALBUM</span>}
                {!isHideTime && <span>THỜI GIAN</span>}
            </div>
            <div className="flex flex-col">
                {Songs?.map((item) => (
                    <List key={item.encodeId} isHideNode SongData={item} />
                ))}
            </div>
            {totalsDuration && (
                <span className="flex items-center gap-1 py-[10px] border-t border-[rgba(0,0,0,0.05)]">
                    <span>{`${Songs?.length} bài hát`}</span>
                    <BsDot size={24} />
                    {<span>{moment.utc(totalsDuration * 1000).format('HH:mm:ss')}</span>}
                </span>
            )}
        </div>
    );
};

export default memo(Playlist);
