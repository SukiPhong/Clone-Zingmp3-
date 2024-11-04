import React, { memo, useState } from 'react';
import SectionItem from './SectionItem';
const Section = ({ data }) => {
    return (
        <div className="mt-12 px-[46px] flex-col gap-[28px]">
            <div className=" flex items-center justify-between">
                <h3 className="text-[20px] font-bold">{data?.title}</h3>
                <span>Tất Cả</span>
            </div>
            <div className="flex  gap-[28px] ">
                {data?.items
                    ?.filter((item, index) => index <= 4)
                    .map((item) => (
                        <SectionItem
                            key={item?.encodeId}
                            data={data}
                            title={item.title}
                            thumbnail={item.thumbnail}
                            link={item.link}
                            sortDescription={item.sortDescription}
                            artistNames={item.artistNames}
                        />
                    ))}
            </div>
        </div>
    );
};

export default memo(Section);
