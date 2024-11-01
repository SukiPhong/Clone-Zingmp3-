import React, { useEffect } from 'react';
import { Playlist } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';
const SearchSongs = () => {
    const { searchData } = useSelector((state) => state.music);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.getSearchSongs(searchData?.top?.playlistId));
    }, [searchData]);
    return (
        <div className="w-full px-[60px]">
            <Playlist isHideTime />
            <div className="w-full h-[10px]"></div>
        </div>
    );
};

export default SearchSongs;
