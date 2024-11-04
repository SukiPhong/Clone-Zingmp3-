import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import * as apis from '../../apis';
import { Playlist, Thumb } from '../../components/';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';

const Album = () => {
    const [playListData, setplayListData] = useState({});
    const { pid } = useParams();
    const location = useLocation();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.setCurAlbumId(pid));
        const fetchDetailSong = async () => {
            dispatch(actions.LoadingPage(true));
            const rs = await apis.apiGetDetailPlaylist(pid);
            dispatch(actions.LoadingPage(false));
            if (rs.data.err === 0) {
                setplayListData(rs?.data?.data);

                dispatch(actions.setPlayList(rs?.data.data?.song?.items));
            }
        };
        fetchDetailSong();
    }, [pid]);

    useEffect(() => {
        if (location.state?.playAlbum) {
            const randomSong =
                Math.round(Math.random() * playListData?.song?.items?.length) - 1;
            dispatch(
                actions.setCurrentSongId(playListData?.song?.items[randomSong]?.encodeId),
            );
            dispatch(actions.play(true));
        }
    }, [pid, playListData]);
    return (
        <div className="flex gap-8 w-full px-[59px]">
            <div className="flex-none w-1/4 border flex flex-col items-center gap-2">
                <Thumb
                    thumbnail={playListData?.thumbnailM}
                    title={playListData?.title}
                    contentLastUpdate={playListData?.contentLastUpdate}
                    artistsNames={playListData?.artistsNames}
                    likes={playListData?.like}
                />
            </div>
            <Scrollbars style={{ width: '100%', height: 'calc(100vh - 150px)' }}>
                <Playlist
                    totalsDuration={playListData?.song?.totalDuration}
                    sortDescription={playListData.sortDescription}
                />
            </Scrollbars>
        </div>
    );
};

export default Album;
