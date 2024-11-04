import React, { useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { Player, SidebarLeft, Header, SideBarRight, LoadingPage } from '../../components';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useSelector } from 'react-redux';

const Public = () => {
    const [isShowRightSidebar, setIsShowRightSidebar] = useState(false);
    const { isLoading } = useSelector((state) => state.app);
    const { curSongID } = useSelector((state) => state.music);
    const { singer } = useParams();
    return (
        <div className="w-full relative h-screen flex flex-col bg-main-300">
            <div className="w-full h-full flex flex-auto">
                <div className="w-[240px] h-full flex-none ">
                    <SidebarLeft />
                </div>
                <div className="flex-auto relative flex flex-col   ">
                    {isLoading && (
                        <div className="absolute inset-0 z-20 bg-main-200 flex items-center justify-center">
                            <LoadingPage />
                        </div>
                    )}

                    <div
                        className={`h-[70px] ${
                            singer ? 'bg-transparent' : 'bg-main-300'
                        } fixed top-0 left-[240px] right-0 px-[59px] flex items-center z-20 `}
                    >
                        <Header />
                    </div>
                    <div className="w-full  h-[70xp]"></div>
                    <div className=" flex-auto w-full">
                        <Scrollbars autoHide style={{ width: '100%', height: '100%' }}>
                            <Outlet />
                        </Scrollbars>
                    </div>
                </div>
                {isShowRightSidebar && (
                    <div className="w-[329px] z-30 h-screen absolute  flex flex-none border top-0 right-0 transition-transform duration-1000 animate-slide-left bg-main-300 ">
                        <SideBarRight />
                    </div>
                )}
            </div>
            {curSongID && (
                <div className="fixed z-50 bottom-0 left-0 right-0 h-[90px]">
                    <Player setIsShowRightSidebar={setIsShowRightSidebar} />
                </div>
            )}
        </div>
    );
};

export default Public;
