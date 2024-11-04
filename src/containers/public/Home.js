import React from 'react';
import {
    Section,
    SliderBanner,
    NewRelease,
    ChartSit,
    Livestream,
} from '../../components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

const Home = () => {
    const { friday, chill, top100, albumHot, weekChart, livestream } = useSelector(
        (state) => state.app,
    );

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 7,
    };

    const allDataAvailable =
        friday && chill && top100 && albumHot && weekChart && livestream;

    return (
        <div className="overflow-y-auto w-full">
            {allDataAvailable ? (
                <>
                    <div className="w-full h-[70px]"></div>
                    <SliderBanner />
                    <Section data={friday} />
                    <NewRelease />
                    <Section data={chill} />
                    <ChartSit />
                    <div className="flex items-center px-[43px] w-full mt-12">
                        {weekChart?.map((e) => (
                            <Link
                                to={e?.link?.split('.')[0]}
                                key={e.link}
                                className="flex-1 px-4"
                            >
                                <img
                                    src={e.cover}
                                    alt="cover"
                                    className="w-full object-cover rounded-md"
                                />
                            </Link>
                        ))}
                    </div>
                    <Section data={top100} />
                    <Section data={albumHot} />
                    {livestream && (
                        <div className="px-[43px] w-full mt-6">
                            <Slider {...settings}>
                                {livestream.map((item) => (
                                    <div key={item.id} className="justify-center px-4">
                                        <Livestream
                                            activeUsers={item.activeUsers}
                                            img={item.thumbnailM}
                                            link={item.link}
                                            title={item.host.name}
                                        />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    )}
                    <div className="w-full h-[500px]"></div>
                </>
            ) : (
                <div className="text-center text-lg text-gray-500">hide</div>
            )}
        </div>
    );
};

export default Home;
