import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import { NAPSTER_API_KEY } from '../constants';
import SongCard from './SongCard';

const MainContainer = () => {
    const [songsList, setSongsList] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await fetch(`https://api.napster.com/v2.2/tracks/top?apikey=${NAPSTER_API_KEY}`);
            const data = await response.json();
            setSongsList(data.tracks);
        })();
    }, []);

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3}}>
        <Toolbar />
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems="stretch">
            {songsList.map((single_song, idx) => {
                return (
                    <SongCard data={single_song} key={idx} />
                )
            })}
        </Grid>
    </Box>
  )
}

export default MainContainer