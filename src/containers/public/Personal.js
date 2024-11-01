import { useState, useEffect } from 'react';
import { Section } from '../../components';
import { useSelector } from 'react-redux';

const Personal = () => {
    const { friday, chill, top100, albumHot, weekChart } = useSelector(
        (state) => state.app,
    );
    return (
        <div>
            <Section data={friday} />
        </div>
    );
};

export default Personal;
