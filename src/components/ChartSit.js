import React, { memo, useEffect, useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';
import { useSelector } from 'react-redux';
import SongItem from './SongItem';
import path from '../utils/path';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { BsFillPlayFill } from 'react-icons/bs';
const ChartSit = () => {
    const [data, setData] = useState(null);
    const { chart, rank } = useSelector((state) => state.app);
    const chartRef = useRef();
    const [tooltipState, setTooltipState] = useState({
        opacity: 0,
        left: 0,
        top: 0,
        // body: [],
    });
    const [selected, setSelected] = useState(null);

    const options = {
        responsive: true,
        pointRadius: 0,
        maintainAspectRatio: false,
        scales: {
            y: {
                ticks: { display: false },
                grid: { color: 'rgba(255,255,255,0.1)', drawTicks: false },
                min: chart?.minScore,
                max: chart?.maxScore,
                border: { dash: [3, 4] },
            },
            x: {
                ticks: { color: '#88a1b0' },
                grid: { color: 'transparent' },
            },
        },
        plugins: {
            legend: false,
            tooltip: {
                enabled: false,
                external: ({ tooltip }) => {
                    if (!chartRef || !chartRef.current) return;
                    if (tooltip.opacity === 0) {
                        if (tooltipState.opacity !== 0)
                            setTooltipState((prev) => ({ ...prev, opacity: 0 }));
                        return;
                    }
                    const counters = [];
                    for (let i = 0; i < 3; i++) {
                        counters.push({
                            data: chart?.items[Object.keys(chart?.items)[i]]
                                ?.filter((item) => +item.hour % 2 === 0)
                                ?.map((item) => item.counter),
                            encodeId: Object.keys(chart?.items)[i],
                        });
                    }
                    const rs = counters?.find((i) =>
                        i.data?.some(
                            (n) => n === +tooltip.body[0]?.lines[0]?.replace('.', ''),
                        ),
                    );

                    setSelected(rs.encodeId);
                    const newTooltipData = {
                        opacity: 1,
                        left: tooltip.caretX,
                        top: tooltip.caretY,
                    };
                    if (!_.isEqual(tooltipState, newTooltipData))
                        setTooltipState(newTooltipData);
                },
            },
        },
        hover: {
            mode: 'dataset',
            intersect: false,
        },
    };
    console.log(typeof chart, typeof chart?.times);
    useEffect(() => {
        const labels = chart?.times
            ?.filter((item) => +item.hour % 2 === 0)
            ?.map((item) => `${item.hour}:00`);
        const datasets = [];
        if (chart?.items) {
            for (let i = 0; i < 3; i++) {
                datasets.push({
                    data: chart?.items[Object.keys(chart?.items)[i]]
                        ?.filter((item) => +item.hour % 2 === 0)
                        ?.map((item) => item.counter),
                    borderColor: i === 0 ? '#4a90e2' : i === 1 ? '#50e3c2' : '#e35050',
                    tension: 0.2,
                    borderWidth: 2,
                    pointBackgroundColor: 'white',
                    pointHoverRadius: 4,
                    pointBorderColor:
                        i === 0 ? '#4a90e2' : i === 1 ? '#50e3c2' : '#e35050',
                    pointHoverBorderWidth: 4,
                });
            }
            setData({ labels, datasets });
        }
    }, [chart]);
    return (
        <div className="px-[44px] mt-12   gap-[28px] rounded-md">
            <div className="relative h-[400px]">
                <img
                    src="/bg-chart.fd766403.jpg"
                    alt="bg-chart"
                    className="object-cover rounded-md w-full h-full"
                />
                <div className="absolute inset-0 bg-[rgba(77,34,104,0.9)] -z-70"></div>
                <div className="absolute inset-0 flex flex-col -z-60">
                    <Link
                        to={path.ZING_CHART}
                        className="flex gap-2 items-center text-white hover:text-green-800 "
                    >
                        <h3 className="text-2xl  font-bold ">#zingChart</h3>
                        <span className=" p-1 rounded-full bg-white">
                            <BsFillPlayFill size={18} color="green" />
                        </span>
                    </Link>
                    <div className="gap-1 p-2 rounded-md grid grid-cols-10 h-full">
                        <div className="col-span-3 mt-4 flex flex-col items-center justify-center h-full">
                            {rank
                                ?.filter((i, index) => index < 3)
                                ?.map((item, index) => (
                                    <SongItem
                                        key={item.encodeId}
                                        thumbnail={item.thumbnail}
                                        title={item.title}
                                        artists={item.artistsNames}
                                        sid={item.encodeId}
                                        order={index + 1}
                                        percent={Math.round(
                                            (+item.score * 100) / +chart?.totalScore,
                                        )}
                                        className="w-full"
                                        // eslint-disable-next-line react/style-prop-object
                                        style="text-white bg-[hsla(0,0%,100%,0,7)] hover:bg-[#945EA7]"
                                    />
                                ))}
                            <Link
                                to={path.ZING_CHART}
                                className="text-white  px-4 py-2 m-auto  rounded rounded-l-full rounded-r-full border border-white w-fit"
                            >
                                Xem thêm
                            </Link>
                        </div>
                        <div className="col-span-7 h-full relative">
                            {data && (
                                <Line data={data} ref={chartRef} options={options} />
                            )}
                            <div
                                className="tooltip"
                                style={{
                                    top: tooltipState.top,
                                    left: tooltipState.left,
                                    opacity: tooltipState.opacity,
                                    position: 'absolute',
                                }}
                            >
                                <SongItem
                                    key={
                                        rank?.find((i) => i.encodeId === selected)
                                            ?.encodeId
                                    }
                                    thumbnail={
                                        rank?.find((i) => i.encodeId === selected)
                                            ?.thumbnail
                                    }
                                    title={
                                        rank?.find((i) => i.encodeId === selected)?.title
                                    }
                                    artists={
                                        rank?.find((i) => i.encodeId === selected)
                                            ?.artistsNames
                                    }
                                    sid={
                                        rank?.find((i) => i.encodeId === selected)
                                            ?.encodeId
                                    }
                                    style="bg-white"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(ChartSit);
