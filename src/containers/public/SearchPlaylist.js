import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { apiGetArtist, apiGetArtistSongs } from '../../apis';
import { Section, SectionItem } from '../../components';

const SearchPlaylist = () => {
    const { searchData } = useSelector((state) => state.music);
    const [playlist, setPlaylist] = useState([]);
    useEffect(() => {
        const fetch = async () => {
            const response = await apiGetArtist(searchData?.top?.alias);
            if (response.data.err === 0) setPlaylist(response.data.data.sections[1]);
        };
        fetch();
    }, [searchData]);

    return (
        <div className="w-full flex-col gap-8 flex px-[44px]">
            <h3>Playlist/Album</h3>
            <div className="flex items-start  flex-wrap  justify-between   ">
                {playlist?.items?.map((item) => (
                    <SectionItem
                        key={item?.encodeId}
                        title={item.title}
                        thumbnail={item.thumbnail}
                        link={item.link}
                        sortDescription={item.sortDescription}
                    />
                ))}
            </div>
        </div>
    );
};

export default SearchPlaylist;
