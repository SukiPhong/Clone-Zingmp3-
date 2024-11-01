import React from 'react';
import { useSelector } from 'react-redux';
import { handleCalculator } from '../../utils/fn';
import { Artist, List, SectionItem, SongItem } from '../../components';

const SearchAll = () => {
    const { searchData } = useSelector((state) => state.music);
    return (
        <div className="w-full flex  flex-col px-[60px] gap-[60px]">
            <div className="flex flex-col">
                <h3 className="text-lg font-bold mb-5"> Nổi bật</h3>
                <div className="flex gap-8 ">
                    {searchData?.top && (
                        <div className="p-[10px] cursor-pointer flex flex-1 bg-main-200 rounded-md gap-8 items-center">
                            <img
                                src={searchData?.top?.thumbnail}
                                alt="avatar"
                                className={`w-[84px] h-[84px] object-cover ${
                                    searchData?.top?.objectType === 'artist' &&
                                    'rounded-full'
                                }`}
                            />
                            <div className="flex flex-col text-xs">
                                <span className="mb-[6px]">
                                    {searchData?.top?.objectType === 'artist'
                                        ? 'Nghệ sĩ'
                                        : ''}
                                </span>
                                <span className="text-sm font-semibold">
                                    {searchData?.top?.title || searchData?.top?.name}
                                </span>
                                {searchData?.top?.objectType === 'artist' && (
                                    <span>
                                        {handleCalculator(
                                            searchData?.artists[0]?.totalFollow,
                                        ) + 'quan tâm'}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                    {searchData?.songs
                        ?.filter((e, idx) => [...Array(2).keys()]?.some((i) => i === idx))
                        ?.map((e) => (
                            <div keys={e.encodeId} className="flex-1">
                                <SongItem
                                    key={e?.encodeId}
                                    thumbnail={e?.thumbnail}
                                    title={e?.title}
                                    artistsNames={e?.artistsNames}
                                    sid={e?.encodeId}
                                    size="w-[84px] h-[84px]"
                                    style="bg-main-200"
                                />
                            </div>
                        ))}
                </div>
            </div>
            <div className="flex flex-col  w-full">
                <h3 className="text-lg font-bold mb-5">Bài hát </h3>
                <div className="flex justify-between flex-wrap w-full ">
                    {searchData?.songs?.map((i, idx) => (
                        <div
                            key={i.encodeId}
                            className={`flex-auto w-[40%]  ${
                                idx % 2 !== 0 ? 'pr-4 ' : 'pl-4'
                            }`}
                        >
                            <List SongData={i} isHideNode={true} />
                        </div>
                    ))}
                </div>
            </div>{' '}
            <div className="flex flex-col  w-full">
                <h3 className="text-lg font-bold mb-5">PlaylistAlbum </h3>
                <div className="flex items-start justify-between gap-[28px] ">
                    {searchData?.playlists
                        ?.filter((item, index) => index <= 4)
                        .map((item) => (
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
            <div className="flex flex-col  w-full">
                <h3 className="text-lg font-bold mb-5">Nghệ sĩ </h3>
                <div className="flex  gap-[28px] ">
                    {searchData?.artists
                        ?.filter((item, index) => index <= 4)
                        .map((item) => (
                            <Artist
                                key={item.id}
                                title={item.name}
                                follower={item.totalFollow}
                                img={item.thumbnailM}
                                link={item.link}
                            />
                        ))}
                </div>
            </div>
            <div className="w-full h-[120px]"></div>
        </div>
    );
};

export default SearchAll;
