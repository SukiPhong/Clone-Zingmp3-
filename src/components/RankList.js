import React, { memo, useEffect, useState } from 'react';
import List from './List';
import { useNavigate } from 'react-router-dom';

const RankList = ({ data, isHideAlbum, number, link }) => {
    const [isShowFull, setIsShowFull] = useState(false);
    const [listSong, setListSong] = useState(null);
    useEffect(() => {
        if (!isShowFull) setListSong(data?.filter((i, index) => index < 10));
        else setListSong(data);
    }, [isShowFull, data]);
    const navigate = useNavigate();
    return (
        <div className="w-full ">
            <div>
                {!number
                    ? listSong?.map((e, index) => (
                          <List
                              SongData={e}
                              key={e.encodeId}
                              order={index + 1}
                              isHideNode
                          />
                      ))
                    : listSong
                          ?.slice((0, number))
                          ?.map((e, index) => (
                              <List
                                  SongData={e}
                                  key={e.encodeId}
                                  order={index + 1}
                                  isHideNode
                              />
                          ))}
            </div>

            <div className="flex w-full justify-center items-center  ">
                <button
                    type="button"
                    className=" px-6 my-4 py-2 border  border-main-500 rounded-l-full rounded-r-full text-main-500 text-sm "
                    onClick={() => {
                        link
                            ? navigate(link.split('.')[0])
                            : setIsShowFull((prev) => !prev);
                    }}
                >
                    {isShowFull ? 'Ẩn bớt' : 'Xem tất cả'}
                </button>
            </div>
        </div>
    );
};

export default memo(RankList);
