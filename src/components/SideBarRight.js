import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SongItem from './SongItem';
import { apiGetDetailPlaylist } from '../apis';
import { BsTrash } from 'react-icons/bs';
import { Scrollbars } from 'react-custom-scrollbars-2';

const SideBarRight = () => {
    const [isRecent, setIsRecent] = useState(false);
    const { curSongData, curAlbumId, isPlaying, recentSongs, curSongID } = useSelector(
        (state) => state.music,
    );
    const [playlist, setPlaylist] = useState();
    const fetchDetailPlaylist = async () => {
        const response = await apiGetDetailPlaylist(curAlbumId);
        if (response?.data?.err === 0) {
            setPlaylist(response?.data?.data?.song?.items);
        }
    };
    useEffect(() => {
        curAlbumId && fetchDetailPlaylist();
    }, []);
    useEffect(() => {
        if (curAlbumId && isPlaying) fetchDetailPlaylist();
    }, [curAlbumId, isPlaying]);
    useEffect(() => {
        isPlaying && setIsRecent(false);
    }, [isPlaying, curSongID]);

    return (
        <div className="flex flex-col text-xs w-full h-full">
            <div className="h-[70px] w-full flex items-center justify-between py-[14px] px-2 gap-4">
                <div className="flex flex-auto justify-center bg-main-200 rounded-l-full rounded-r-full p-[6px] cursor-pointer">
                    <span
                        className={`py-[5px] ${
                            !isRecent && 'bg-main-100'
                        } flex-1 flex justify-center rounded-l-full rounded-r-full items-center`}
                        onClick={() => {
                            setIsRecent(false);
                        }}
                    >
                        Danh sách phát
                    </span>
                    <span
                        className={`py-[5px] ${
                            isRecent && 'bg-main-100'
                        } flex-1 flex justify-center rounded-r-full rounded-l-full items-center`}
                        onClick={() => {
                            setIsRecent(true);
                        }}
                    >
                        Nghe gần đây
                    </span>
                </div>
                <span className="p-2 rounded-full cursor-pointer hover:bg-main-100 flex-none">
                    <BsTrash size={14} />
                </span>
            </div>
            {isRecent ? (
                <div className="w-full flex-col flex flex-auto px-2">
                    {' '}
                    <Scrollbars autoHide style={{ width: '100%', height: '100%' }}>
                        {' '}
                        {recentSongs && (
                            <div className="flex flex-col flex-auto">
                                {recentSongs?.map((song) => (
                                    <SongItem
                                        key={song?.sid}
                                        thumbnail={song?.thumbnail}
                                        title={song?.title}
                                        artistsNames={song?.artistsNames}
                                        sid={song?.sid}
                                        size="w-[40px] h-[40px]"
                                    />
                                ))}
                            </div>
                        )}
                        <div className="w-full h-[100px]"></div>
                    </Scrollbars>
                </div>
            ) : (
                <div className="w-full flex-col flex flex-auto px-2">
                    <Scrollbars autoHide style={{ width: '100%', height: '100%' }}>
                        {curSongData && (
                            <SongItem
                                thumbnail={curSongData?.thumbnail}
                                title={curSongData?.title}
                                artistsNames={curSongData?.artistsNames}
                                sid={curSongData?.encodeId}
                                sm
                                style="bg-main-500 text-white"
                            />
                        )}
                        <div className="text-black flex flex-col pt-[15px] px-2 pb-[5px]">
                            <span className="text-sm font-bold">Tiếp Theo</span>
                            <span className="opacity-70 text-xs flex gap-1">
                                <span>Từ playlist</span>
                                <span className="font-semibold text-main-500">{`${curSongData?.album?.title}`}</span>
                            </span>
                        </div>
                        {playlist && (
                            <div className="flex flex-col flex-auto">
                                {playlist?.map((song) => (
                                    <SongItem
                                        key={song?.encodeId}
                                        thumbnail={song?.thumbnail}
                                        title={song?.title}
                                        artistsNames={song?.artistsNames}
                                        sid={song?.encodeId}
                                        size="w-[40px] h-[40px]"
                                    />
                                ))}
                            </div>
                        )}
                        <div className="w-full h-[100px]"></div>
                    </Scrollbars>
                </div>
            )}
        </div>
    );
};

export default SideBarRight;
