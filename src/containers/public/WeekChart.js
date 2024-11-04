import React, { useEffect, useState } from 'react';
import { apiGetChartHome } from '../../apis';
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';
import { NavLink, useParams } from 'react-router-dom';
import { RankList } from '../../components';

const nonActiveStyle = 'text-[24px] text-black py-[12px] font-semibold';
const ActiveStyle =
    'text-[24px] text-main-500 py-[12px] font-semibold  border-b-2 border-[#0E8080]';
const WeekChart = ({ weekChart }) => {
    const { pid } = useParams();
    useEffect(() => {}, [pid]);

    return (
        <div>
            <div className="w-full h-[90px]"></div>
            <div className="relative">
                <img
                    src="/bg-chart.fd766403.jpg"
                    alt="bg-chart"
                    className="w-full h-[500px] object-cover grayscale"
                />
                <div className="absolute inset-0 bg-[rgba(206,217,217,0.8)]"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#CED9D9] to-transparent"></div>
                <div className="absolute inset-0 bottom-1/2 flex  px-[60px] gap-4 flex-col">
                    <h3 className="font-bold text-[40px] mt-[90px] text-main-500">
                        Bảng Xếp Hạng Tuần
                    </h3>
                    <div className="flex gap-8">
                        {weekChart?.map((e, index) => (
                            <NavLink
                                to={e.link.split('.')[0]}
                                className={({ isActive }) =>
                                    isActive ? ActiveStyle : nonActiveStyle
                                }
                                key={e.chartId}
                            >
                                {e.country === 'vn'
                                    ? 'Việt Nam'
                                    : e.country === 'us'
                                    ? 'US-UK'
                                    : e.country === 'korea'
                                    ? 'K-POP'
                                    : ''}
                            </NavLink>
                        ))}
                    </div>
                    <div className="pb-8 w-full">
                        {' '}
                        <RankList
                            data={weekChart?.find((e) => e?.link?.includes(pid))?.items}
                            isHideAlbum={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeekChart;
