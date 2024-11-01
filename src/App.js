import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';
import {
    Home,
    Login,
    Public,
    Personal,
    Album,
    WeekChart,
    ChartZing,
    SearchSongs,
    SearchAll,
    SearchPublic,
    Singer,
    SearchPlaylist,
} from './containers/public/index';
import path from './utils/path';
import { useDispatch } from 'react-redux';
import * as actions from './store/actions';

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.getHome());
    }, []);
    return (
        <>
            <div className="">
                <Routes>
                    <Route path={path.PUBLIC} element={<Public />}>
                        <Route path={path.HOME} element={<Home />} />
                        <Route path={path.LOGIN} element={<Login />} />
                        <Route path={path.MY_MUSIC} element={<Personal />} />
                        <Route path={path.ALBUM__TITLE__PID} element={<Album />} />
                        <Route path={path.PLAYLIST__TITLE__PID} element={<Album />} />
                        <Route
                            path={path.WeekChart__TITLE__PID}
                            element={<WeekChart />}
                        />
                        <Route path={path.HOME_SINGER} element={<Singer />} />
                        <Route path={path.ZING_CHART} element={<ChartZing />} />
                        <Route path={path.SEARCH} element={<SearchPublic />}>
                            <Route path={path.ALL} element={<SearchAll />} />
                            <Route path={path.SONG} element={<SearchSongs />} />
                            <Route
                                path={path.SEARCH_PLAYLIST}
                                element={<SearchPlaylist />}
                            />
                        </Route>
                        <Route path={path.STAR} element={<Home />} />
                    </Route>
                </Routes>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}

export default App;
