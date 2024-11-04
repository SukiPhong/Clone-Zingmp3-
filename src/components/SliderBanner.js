import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from '../store/actions';
import { useNavigate } from 'react-router-dom';
import { getArrSlider } from '../utils/fn';
import Button from './Button';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { set } from 'lodash';
var intervalId;
const SliderBanner = () => {
    const { banner } = useSelector((state) => state.app);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(2);
    const [isaudio, setIsAudio] = useState(true);

    // ainimation for banner
    useEffect(() => {
        if (isaudio) {
            intervalId = setInterval(() => {
                handlerAnimationBanner(1);
            }, 15000);
        }
        return () => {
            intervalId && clearInterval(intervalId);
        };
    }, [min, max, isaudio]);
    const handlerAnimationBanner = (step) => {
        const sliderEls = document.getElementsByClassName('slider-item');
        const list = getArrSlider(min, max, sliderEls.length - 1);

        for (let i = 0; i < sliderEls.length; i++) {
            // Delete classnames (css)
            sliderEls[i]?.classList?.remove('animate-slide-right', 'order-last', 'z-20');
            sliderEls[i]?.classList?.remove('animate-slide-left', 'order-first', 'z-10');
            sliderEls[i]?.classList?.remove('animate-slide-left2', 'order-2', 'z-10');

            // Hide or Show images
            if (list.some((item) => item === i)) {
                sliderEls[i].style.cssText = `display: block`;
            } else {
                sliderEls[i].style.cssText = `display: none`;
            }
        }
        // Add animation by adding classnames
        list.forEach((item) => {
            if (item === max) {
                sliderEls[item]?.classList?.add(
                    'animate-slide-right',
                    'order-last',
                    'z-20',
                );
            } else if (item === min) {
                sliderEls[item]?.classList?.add(
                    'animate-slide-left',
                    'order-first',
                    'z-10',
                );
            } else {
                sliderEls[item]?.classList?.add('animate-slide-left2', 'order-2', 'z-10');
            }
        });

        if (step === 1) {
            setMin((prev) => (prev === sliderEls.length - 1 ? 0 : min + step));
            setMax((prev) => (prev === sliderEls.length - 1 ? 0 : max + step));
        }
        if (step === -1) {
            setMin((prev) => (prev === 0 ? sliderEls.length - 1 : min + step));
            setMax((prev) => (prev === 0 ? sliderEls.length - 1 : max + step));
        }
    };
    const handleClick = (item) => {
        if (item?.type === 1) {
            dispatch(actions.setCurrentSongId(item.encodeId));
            dispatch(actions.play(true));
            dispatch(actions.Album(false));
        } else if (item?.type === 4) {
            const albumPath = item?.link?.split('.')[0];
            navigate(albumPath);
        } else {
            dispatch(actions.Album(false));
        }
    };
    const handleBack = useCallback(
        (step) => {
            intervalId && clearInterval(intervalId);
            setIsAudio(false);
            handlerAnimationBanner(step);
        },
        [min, max],
    );
    return (
        <div className="w-full max-h-[380px] overflow-hidden px-[59px] relative">
            <Button
                text={<MdArrowBackIosNew size={30} />}
                style="absolute top-1/2 left-[30px] bg-[rgba(255,255,255,0.3)] z-99 text-white p-2 rounded-full"
                handleClick={() => {
                    handleBack(1);
                }}
            />
            <Button
                text={<MdArrowForwardIos size={30} />}
                style="absolute top-1/2 right-[30px] bg-[rgba(255,255,255,0.3)] z-99 text-white p-2 rounded-full"
                handleClick={() => {
                    handleBack(-1);
                }}
            />
            <div
                className="flex w-full gap-8 pt-8"
                onMouseLeave={(e) => {
                    setIsAudio(true);
                }}
            >
                {banner?.map((item, index) => (
                    <img
                        key={item.encodeId}
                        src={item.banner}
                        alt="banner"
                        onClick={() => handleClick(item)}
                        className={`slider-item flex-1 object-contain w-[30%] rounded-lg ${
                            index <= 2 ? 'block' : 'hidden'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default SliderBanner;
