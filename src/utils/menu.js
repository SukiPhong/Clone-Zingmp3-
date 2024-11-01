import icons from './icons';
const { MdOutlineLibraryMusic, TbChartArcs, MdOutlineFeed, HiOutlineChartPie } = icons;

export const sidebarMenu = [
    {
        path: 'mymusic',
        text: 'cá nhân',
        icons: <MdOutlineLibraryMusic size={24} />,
    },

    {
        path: '',
        text: 'khám phá',
        end: true,
        icons: <TbChartArcs size={24} />,
    },

    {
        path: 'zing-chart',
        text: '#zing-chart',
        icons: <HiOutlineChartPie size={24} />,
    },
    {
        path: 'follow',
        text: 'Theo dõi',
        icons: <MdOutlineFeed size={24} />,
    },
];
export const SearchMenu = [
    {
        path: 'all',
        text: 'TẤT CẢ',
    },

    {
        path: 'bai-hat',
        text: 'BÀI HÁT',
        end: true,
    },

    {
        path: 'playlist',
        text: 'PLAYLIST',
        icons: <HiOutlineChartPie size={24} />,
    },
];
