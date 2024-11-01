import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGetArtist } from '../../apis';
const Singer = () => {
    const { singer } = useParams();
    const [artistData, setArtistData] = useState();
    useEffect(() => {
        const fetchArtistData = async () => {
            const response = await apiGetArtist(singer);
            if (response.data.err === 0) {
                setArtistData(response.data.data);
            }
        };
        singer && fetchArtistData();
    }, [singer]);
    return (
        <div className="flex  flex-col  w-full relative ">
            <img src={artistData?.cover} alt="ArtistBG" className="absolute" />
        </div>
    );
};

export default Singer;
