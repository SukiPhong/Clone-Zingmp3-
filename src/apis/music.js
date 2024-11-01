import axios from '../axios';
// export const apiGetSong = async (sid) => {
//     try {
//         const rs = await axios({
//             url: '/song',
//             method: 'get',
//             params: { id: sid }
//         })
//         return rs
//     } catch (error) {
//         throw error;
//     }
// }
// export const  apiGetDetailSong =async (sid)=>{
//     try {
//         const response = await axios({
//             url: '/infosong',
//             method: 'get',
//             params: { id: sid}
//         })
//         return response
//     } catch (error) {
//         throw error;
//     }
// }
export const apiGetSong = (sid) =>
    axios({
        url: '/song',
        method: 'get',
        params: { id: sid },
    });
export const apiGetDetailSong = (sid) =>
    axios({
        url: '/infosong',
        method: 'get',
        params: { id: sid },
    });
export const apiGetDetailPlaylist = (pid) =>
    axios({
        url: '/detailplaylist',
        method: 'get',
        params: { id: pid },
    });
export const apiSearch = (keyword) =>
    axios({
        url: '/search',
        method: 'get',
        params: { keyword },
    });
export const apiGetArtistSongs = (singerId) =>
    axios({
        url: '/artistsong',
        method: 'get',
        param: {
            id: singerId,
            page: 1,
            count: 50,
        },
    });
export const apiGetArtist = (alias) =>
    axios({
        url: '/artist',
        method: 'get',
        params: { name: alias },
    });
