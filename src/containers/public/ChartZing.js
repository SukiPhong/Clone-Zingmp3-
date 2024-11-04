import React, { useEffect, useRef, useState } from 'react';
import { apiGetChartHome } from '../../apis';
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';
import _ from 'lodash';
import SongItem from '../../components/SongItem';
import { List, RankList } from '../../components/index';
import WeekChart from './WeekChart';
const ChartZing = () => {
    const [dataChart, setDataChart] = useState(null);
    const [data, setData] = useState(null);
    const chartRef = useRef();
    const [tooltipState, setTooltipState] = useState({
        opacity: 0,
        left: 0,
        top: 0,
    });
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        const fetchDataChart = async () => {
            const response = await apiGetChartHome();
            if (response.status === 200) {
                setDataChart(response.data.data);
            }
        };
        fetchDataChart();
    }, []);

    useEffect(() => {
        if (!dataChart) return; // Early return if dataChart is null
        const labels = dataChart?.RTChart?.chart?.times
            ?.filter((item) => +item.hour % 2 === 0)
            ?.map((item) => `${item.hour}:00`);

        const datasets = [];
        const items = dataChart?.RTChart?.chart?.items;

        if (items) {
            for (let i = 0; i < 3; i++) {
                datasets.push({
                    data: items[Object.keys(items)[i]]
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
    }, [dataChart]);

    const options = {
        responsive: true,
        pointRadius: 0,
        maintainAspectRatio: false,
        scales: {
            y: {
                ticks: { display: false },
                grid: { color: 'rgba(0,0,0,0.3)', drawTicks: false },
                min: dataChart?.RTChart?.chart?.minScore,
                max: dataChart?.RTChart?.chart?.maxScore,
                border: { dash: [3, 4] },
            },
            x: {
                ticks: { color: 'gray' },
                grid: { color: 'transparent' },
            },
        },
        plugins: {
            legend: false,
            tooltip: {
                enabled: false,
                external: ({ tooltip }) => {
                    if (!chartRef.current) return;
                    if (tooltip.opacity === 0) {
                        if (tooltipState.opacity !== 0) {
                            setTooltipState((prev) => ({ ...prev, opacity: 0 }));
                        }
                        return;
                    }

                    const counters = Object.keys(
                        dataChart?.RTChart?.chart?.items || {},
                    ).map((key, i) => ({
                        data: dataChart?.RTChart?.chart?.items[key]
                            ?.filter((item) => +item.hour % 2 === 0)
                            ?.map((item) => item.counter),
                        encodeId: key,
                    }));

                    const found = counters.find((i) =>
                        i.data?.some(
                            (n) => n === +tooltip.body[0]?.lines[0]?.replace('.', ''),
                        ),
                    );

                    if (found) setSelected(found.encodeId);
                    setTooltipState({
                        opacity: 1,
                        left: tooltip.caretX,
                        top: tooltip.caretY,
                    });
                },
            },
        },
        hover: {
            mode: 'dataset',
            intersect: false,
        },
    };

    return (
        <div>
            <div className="flex flex-col">
                <div className="relative">
                    <img
                        src="/bg-chart.fd766403.jpg"
                        alt="bg-chart"
                        className="w-full h-[500px] object-cover grayscale"
                    />
                    <div className="absolute inset-0 bg-[rgba(206,217,217,0.9)]"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#CED9D9] to-transparent"></div>
                    <div className="absolute inset-0 bottom-1/2 flex items-center px-[60px]">
                        <h3 className="font-bold text-[40px] text-main-500">
                            #zingChart
                        </h3>
                    </div>
                    <div className="absolute inset-0 top-[30%]">
                        {data && <Line data={data} ref={chartRef} options={options} />}
                        <div
                            className="tooltip"
                            style={{
                                top: tooltipState.top,
                                left: tooltipState.left,
                                opacity: tooltipState.opacity,
                                position: 'absolute',
                            }}
                        >
                            {selected && (
                                <SongItem
                                    key={selected}
                                    thumbnail={
                                        dataChart?.RTChart?.items?.find(
                                            (i) => i.encodeId === selected,
                                        )?.thumbnail
                                    }
                                    title={
                                        dataChart?.RTChart?.items?.find(
                                            (i) => i.encodeId === selected,
                                        )?.title
                                    }
                                    artists={
                                        dataChart?.RTChart?.items?.find(
                                            (i) => i.encodeId === selected,
                                        )?.artistsNames
                                    }
                                    sid={selected}
                                    style="bg-white"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-[60px] mt-12">
                <RankList data={dataChart?.RTChart?.items} />
            </div>
            <div className="relative">
                <img
                    src="/bg-chart.fd766403.jpg"
                    alt="bg-chart"
                    className="w-full  object-cover grayscale"
                />
                <div className="absolute inset-0 bg-[rgba(206,217,217,0.9)]"></div>
                <div className="absolute inset-0 bottom-1/2 flex flex-col mt-8 gap-4 i px-[60px]">
                    <h3 className="font-bold text-[40px] text-main-500">
                        Bảng Xếp Hạng Tuần
                    </h3>
                    <div className="flex gap-4 h-fit">
                        {dataChart?.weekChart &&
                            Object?.entries(dataChart?.weekChart)?.map((e, idx) => (
                                <div
                                    className="flex-1 bg-gray-200 rounded-md px-[10px] py-5 "
                                    key={idx}
                                >
                                    <h3 className="text-[24px] text-main-500 font-bold">
                                        {e[0] === 'vn'
                                            ? 'Việt Nam'
                                            : e[0] === 'us'
                                            ? 'US-UK'
                                            : e[0] === 'korea'
                                            ? 'K-POP'
                                            : ''}
                                    </h3>
                                    <div className="mt-4 h-fit">
                                        <RankList
                                            data={e[1]?.items}
                                            isHideAlbum={true}
                                            number={5}
                                            link={e[1]?.link}
                                        />
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            <div className="w-full h-[500px]"></div>
        </div>
    );
};

export default ChartZing;
