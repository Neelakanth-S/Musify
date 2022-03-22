import React, { useEffect, useState } from 'react';
import { Box, Toolbar, Grid, Typography } from '@mui/material';
import { NAPSTER_API_KEY } from '../constants';
import SongCard from './SongCard';
import { useParams } from 'react-router-dom';
import ArtistCard from './ArtistCard';
import AlbumCard from './AlbumCard';

const SearchContainer = () => {
    const { query } = useParams();
    const [albumList, setAlbumList]   = useState([]);
    const [songList, setSongsList]    = useState([]);
    const [artistList, setArtistList] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await fetch(`https://api.napster.com/v2.2/search?apikey=${NAPSTER_API_KEY}&per_type_limit=5&query=${query}`);
            const data = await response.json();
            const search_result = data.search.data;
            setAlbumList(search_result.albums);
            setSongsList(search_result.tracks);
            setArtistList(search_result.artists);
        })();
    }, [query])

    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3}}>
            <Toolbar />
            <Typography variant='h2' sx={{mt: 4}}>Search Results for {query} </Typography>
            <Typography variant='h4' sx={{mt: 4, mb: 2}}>Artists:</Typography>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems="stretch">
                {artistList.map((single_artist, idx) => {
                    return(
                        <ArtistCard data={single_artist} key={idx} />
                    );
                })}
            </Grid>
            <Typography variant='h4' sx={{mt: 8, mb: 2}}>Albums:</Typography>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems="stretch">
                {albumList.map((single_album, idx) => {
                    return(
                        <AlbumCard data={single_album} key={idx} />
                    );
                })}
            </Grid>
            <Typography variant='h4' sx={{mt: 8, mb: 2}}>Songs:</Typography>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems="stretch">
                {songList.map((single_song, idx) => {
                    return(
                        <SongCard data={single_song} key={idx} />
                    );
                })}
            </Grid>
        </Box>
    )
}

export default SearchContainer;