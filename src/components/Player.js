import React, { useEffect, useState, useRef } from 'react';
import * as apis from '../apis';
import icons from '../utils/icons';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions';
import { Loading } from '../components';
import moment from 'moment';
import { SLVolumeOff } from 'react-icons/sl';
const Tooltip =
    'absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity text-sm  bg-slate-700 text-white py-1 px-2 rounded whitespace-nowrap';

const {
    AiOutlineHeart,
    AiFillHeart,
    BsThreeDots,
    MdSkipNext,
    MdSkipPrevious,
    CiRepeat,
    BsPauseFill,
    BsFillPlayFill,
    CiShuffle,
    TbRepeatOnce,
    BsMusicNoteList,
    SlVolumeOff,
    SlVolume1,
    SlVolume2,
} = icons;

var intervalId;
const Player = ({ setIsShowRightSidebar }) => {
    const dispatch = useDispatch();
    const [SongInfo, setSongInfo] = useState(null);
    const { curSongID, isPlaying, Songs } = useSelector((state) => state.music);
    const [audio, setAudio] = useState(new Audio());
    const [curSecond, setCurSecond] = useState(0);
    const [isShuffle, setIsShuffle] = useState(false);
    const [repeatMode, setRepeatMode] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [volume, setVolume] = useState(100);
    const [isShowVolumd, setIsShowVolumd] = useState(false);
    const thumbRef = useRef();
    const trackRef = useRef();
    const volumeRef = useRef();
    useEffect(() => {
        const fetchDetailSong = async () => {
            setIsLoading(false);
            const [rs1, rs2] = await Promise.all([
                apis.apiGetDetailSong(curSongID),
                apis.apiGetSong(curSongID),
            ]);
            setIsLoading(true);
            if (rs1.data.err === 0) {
                setSongInfo(rs1.data.data);
                dispatch(actions.setCurrentSongData(rs1.data.data));
            }
            if (rs2.data.err === 0) {
                audio.pause();
                setAudio(new Audio(rs2.data.data['128']));
            } else {
                audio.pause();
                setAudio(new Audio());
                dispatch(actions.play(false));
                toast.warn(rs2.data.msg);
                setCurSecond(0);
                thumbRef.current.style.cssText = `right: 100%`;
            }
        };

        fetchDetailSong();
    }, [curSongID]);
    const play = async () => {
        await audio.play();
    };

    useEffect(() => {
        const HandleEnded = () => {
            if (isShuffle) {
                handlerShuffle();
            } else if (repeatMode) {
                repeatMode === 1 ? handleRepeatOne() : handlerNextSong();
            } else {
                // audio.pause()
                // dispatch(actions.play(false))
                handlerNextSong();
            }
        };
        audio.addEventListener('ended', HandleEnded);
        return () => {
            audio.removeEventListener('ended', HandleEnded);
        };
    }, [audio, isShuffle, repeatMode]);

    useEffect(() => {
        intervalId && clearInterval(intervalId);
        audio.pause();
        audio.load();
        if (isPlaying && thumbRef.current) {
            play();
            intervalId = setInterval(() => {
                let percent =
                    Math.round((audio.currentTime * 10000) / SongInfo.duration) / 100;
                thumbRef.current.style.cssText = `right: ${100 - percent}%`;

                setCurSecond(
                    Math.round(audio.currentTime),

                    200,
                );
            });
        }
    }, [audio]);
    const handlerNextSong = () => {
        if (Songs && Songs.length > 1) {
            let currentSongIndex;
            Songs?.forEach((item, index) => {
                if (item.encodeId === SongInfo?.encodeId) {
                    currentSongIndex = index;
                }
            });
            dispatch(actions.setCurrentSongId(Songs[currentSongIndex + 1]?.encodeId));
            dispatch(actions.play(true));
        }
    };
    const handlerPevSong = () => {
        if (Songs && Songs.length > 1) {
            let currentSongIndex;
            Songs?.forEach((item, index) => {
                if (item.encodeId === SongInfo?.encodeId) {
                    currentSongIndex = index;
                }
            });
            dispatch(actions.setCurrentSongId(Songs[currentSongIndex - 1]?.encodeId));
            dispatch(actions.play(true));
        }
    };
    const handleTogglePlayMusic = async () => {
        if (isPlaying) {
            audio.pause();
            dispatch(actions.play(false));
        } else {
            audio.play();
            dispatch(actions.play(true));
        }
    };
    const handlerShuffle = () => {
        const randomIndex = Math.round(Math.random() * Songs?.length) - 1;
        dispatch(actions.setCurrentSongId(Songs[randomIndex].encodeId));
        dispatch(actions.play(true));
    };
    const updateTimeSong = async (e) => {
        const track = trackRef.current.getBoundingClientRect();
        const percent =
            Math.round(((e.clientX - track.left) * 10000) / track.width) / 100;
        audio.currentTime = (percent * SongInfo.duration) / 100;

        setCurSecond(Math.round((percent * SongInfo.duration) / 100));
        thumbRef.current.style.cssText = `right: ${100 - percent}%`;
    };
    const handleRepeatOne = () => {
        play();
    };
    useEffect(() => {
        audio.volume = volume / 100;
    }, [audio, volume]);
    if (volumeRef.current) {
        volumeRef.current.style.cssText = `right:${100 - volume}%`;
    }
    useEffect(() => {}, [volume]);
    return (
        <div className="flex bg-main-400 px-5 h-full ">
            <div className="w-1/3 flex-auto   flex gap-3 items-center ">
                <img
                    src={SongInfo?.thumbnail}
                    alt="thumbnail"
                    className="w-16 h-16 object-cover rounded-md  "
                />
                <div className="flex flex-col ">
                    <span className="font-semibold text-gray-600 text-sm ">
                        {SongInfo?.title}
                    </span>
                    <span className="text-xs">{SongInfo?.artistsNames}</span>
                </div>
                <div className="flex gap-4 pl-2">
                    <div className="relative group">
                        <AiOutlineHeart
                            size={16}
                            className="cursor-pointer hover:text-main-500 rounded-full "
                        />
                        <span className={Tooltip}>Yêu thích</span>
                    </div>
                    <div className="relative group">
                        <BsThreeDots
                            size={16}
                            className="cursor-pointer hover:text-main-500 rounded-full"
                        />
                        <span className={Tooltip}>Xem thêm</span>
                    </div>
                </div>
            </div>
            <div className="w-2/5 flex-auto gap-4  flex  flex-col items-center justify-center py-2 ">
                <div className="flex gap-8 justify-center items-center">
                    <div className="relative group">
                        <CiShuffle
                            size={24}
                            className={`cursor-pointer ${
                                isShuffle ? 'text-purple-600' : ''
                            }`}
                            onClick={() => setIsShuffle((prev) => !prev)}
                        />
                        <span className={Tooltip}>Bật phát ngẫu nhiên</span>
                    </div>
                    <div className="relative group">
                        <MdSkipPrevious
                            size={24}
                            className={`${
                                !Songs || Songs.length <= 1
                                    ? 'text-gray-500'
                                    : 'cursor-pointer hover:text-main-500'
                            }`}
                            onClick={handlerPevSong}
                        />
                        <span className={Tooltip}>Bài Trước</span>
                    </div>

                    <span
                        className="p-1 border border-gray-700 rounded-full"
                        onClick={handleTogglePlayMusic}
                    >
                        {!isLoading ? (
                            <Loading />
                        ) : isPlaying ? (
                            <BsPauseFill size={30} />
                        ) : (
                            <BsFillPlayFill size={30} />
                        )}
                    </span>
                    <div className="relative group">
                        <MdSkipNext
                            size={24}
                            className={`${
                                !Songs || Songs.length <= 1
                                    ? 'text-gray-500'
                                    : 'cursor-pointer hover:text-main-500'
                            }`}
                            onClick={handlerNextSong}
                        />
                        <span className={Tooltip}>Bài Sau</span>
                    </div>
                    <div className="relative group">
                        <span
                            className={` cursor-pointer ${
                                repeatMode && 'text-purple-600'
                            }`}
                            onClick={() =>
                                setRepeatMode((prev) => (prev === 2 ? 0 : prev + 1))
                            }
                        >
                            {repeatMode === 1 ? (
                                <TbRepeatOnce size={24} />
                            ) : (
                                <CiRepeat size={24} />
                            )}
                        </span>
                        <span className={Tooltip}>
                            {repeatMode === 1
                                ? ' Bật phát lại  một bài '
                                : ' Bật phát lại tất cả'}
                        </span>
                    </div>
                </div>

                <div className="w-full flex items-center justify-center gap-3 text-xs">
                    <span>{moment.utc(curSecond * 1000).format('mm:ss')}</span>
                    <div
                        className=" w-3/4 h-[3px] hover:h-[6px] bg-[rgba(0,0,0,0.1)] rounded-l-full rounded-r-full   cursor-pointer relative "
                        onClick={updateTimeSong}
                        ref={trackRef}
                    >
                        <div
                            ref={thumbRef}
                            className="absolute top-0 left-0 bottom-0   bg-[#0e8080] rounded-l-full  rounded-r-full"
                        ></div>
                    </div>
                    <span> {moment.utc(SongInfo?.duration * 1000).format('mm:ss')}</span>
                </div>
            </div>
            <div className="w-1/3 flex-auto  flex  items-center justify-end gap-3 ">
                <div
                    className="flex gap-2 items-center"
                    onMouseEnter={(e) => {
                        setIsShowVolumd(true);
                    }}
                    onMouseLeave={() => {
                        setIsShowVolumd(false);
                    }}
                >
                    <div
                        className={`w-[130px] h-[5px] bg-white rounded-r-full  rounded-l-full ${
                            isShowVolumd ? 'hidden' : 'relative'
                        }`}
                    >
                        <div
                            ref={volumeRef}
                            className="absolute left-0 right-1/2 bottom-0 top-0 bg-main-500 rounded-r-full rounded-l-full"
                        ></div>
                    </div>

                    <input
                        type="range"
                        step={1}
                        min={0}
                        max={100}
                        value={volume}
                        onChange={(e) => {
                            setVolume(e.target.value);
                        }}
                        className={`w-[130px]  ${isShowVolumd ? 'inline' : 'hidden'}`}
                    />
                </div>
                <span
                    className="p-1 rounded-sm cursor-pointer bg-main-500 opacity-90 
                    hover:opacity-100"
                    onClick={() => setIsShowRightSidebar((prev) => !prev)}
                >
                    <BsMusicNoteList />
                </span>
            </div>
        </div>
    );
};

export default Player;
