import React, { memo } from 'react';
import SectionItem from './SectionItem';

const SingerSection = ({ data, sm }) => {
    console.log(data?.title);
    return (
        <div className="px-[60px] mt-5 ư">
            <span className="font-bold text-xl  capitalize">{data?.title}</span>
            <div className={`flex  `}>
                {data &&
                    data?.items
                        ?.filter((item, index) => index <= 4)
                        ?.map((item) => (
                            <SectionItem
                                key={item?.encodeId}
                                title={item.title}
                                thumbnail={item.thumbnail}
                                link={item.link}
                                sortDescription={item.sortDescription}
                                time={item.releaseDateText}
                            />
                        ))}
            </div>
        </div>
    );
};

export default memo(SingerSection);
