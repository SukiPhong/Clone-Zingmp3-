import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGetArtist } from '../../apis';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { BsFillPlayFill } from 'react-icons/bs';
import { Artist, List, SectionItem, SingerSection } from '../../components';
const Singer = () => {
    const { singer } = useParams();
    const [artistData, setArtistData] = useState();
    useEffect(() => {
        const fetchArtistData = async () => {
            const response = await apiGetArtist(singer);
            if (response.data.err === 0) {
                setArtistData(response.data.data);
            }
        };
        singer && fetchArtistData();
    }, [singer]);
    console.log({ artistData });
    return (
        <div className="flex  flex-col  w-full  ">
            <div className="relative">
                <img
                    src={artistData?.cover}
                    alt="ArtistBG"
                    className="object-cover w-full h-[350px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)]  text-white to-transparent">
                    <div className="absolute bottom-0 pb-6 px-[60px]">
                        <div className="flex gap-8 items-center">
                            <h1 className="text-[60px] font-bold">{artistData?.name}</h1>
                            <span className="p-2 rounded-full bg-white text-main-500 hover:bg-main-500 cursor-pointer hover:text-gray-100">
                                <BsFillPlayFill size={24} />
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-300">
                                {`${Number(
                                    artistData?.totalFollow.toFixed(1),
                                ).toLocaleString()} người quan tâm`}{' '}
                            </span>
                            <button
                                type="button"
                                className="bg-main-500 px-4 py-1 text-white rounded-r-full rounded-l-full flex items-center justify-center gap-1"
                            >
                                <span>
                                    <AiOutlineUserAdd />
                                </span>
                                <span className="text-xs opacity-90"> Quan tâm</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-[30px] px-[60px]  w-full ">
                <div>
                    <h2 className=" font-bold text-xl mb-5 capitalize">
                        {artistData?.sections[0]?.title}
                    </h2>
                </div>
                <div className="flex justify-between flex-wrap w-full ">
                    {artistData?.sections[0]?.items
                        ?.filter((e, idx) => idx < 6)
                        ?.map((i, idx) => (
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
            </div>
            <SingerSection data={artistData?.sections[1]} />
            <SingerSection data={artistData?.sections[5]} />
            <SingerSection data={artistData?.sections[4]} />
            <SingerSection data={artistData?.sections[2]} />
            <div className="mt-[30px] px-[60px]  w-full ">
                <div>
                    <h2 className=" font-bold text-xl mb-5 capitalize">
                        {artistData?.sections[6]?.title}
                    </h2>
                </div>
                <div className="flex justify-between  gap-14 w-full ">
                    {artistData?.sections[6].items
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
            <div className="w-full h-[500px] px-[64px] mt-12">
                <h3>{`Về ${artistData?.name}`} </h3>

                <div className="grid grid-cols-10 gap-8">
                    <img
                        src={artistData?.thumbnailM}
                        alt="thumbnailM"
                        className="col-span-3 flex-none h-[370px] object-contain rounded-md"
                    />
                    <div className="col-span-3 flex flex-col gap-8 text-sm">
                        <p
                            dangerouslySetInnerHTML={{
                                __html: artistData?.biography,
                            }}
                        ></p>
                        <div className=" flex  flex-col">
                            <span className="text-[20px] font-bold">
                                {Number(
                                    artistData?.totalFollow?.toFixed(1),
                                ).toLocaleString()}
                            </span>
                            <span>người quan tâm</span>
                        </div>
                    </div>
                    <div className="flex col-span-4"></div>
                </div>
            </div>
            <div className="w-full h-[500px]"></div>
        </div>
    );
};

export default Singer;
