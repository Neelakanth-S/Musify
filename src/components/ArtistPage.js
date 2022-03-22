import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Toolbar, Paper, Stack, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Skeleton } from '@mui/material';
import { NAPSTER_API_KEY } from '../constants';
import SongTableRow from './SongTableRow';


const ArtistPage = () => {
    const { artist_id } = useParams();
    const [artistDetails, setArtistDetails] = useState({});
    const [songList, setSongList] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await fetch(`https://api.napster.com/v2.2/artists/${artist_id}?apikey=${NAPSTER_API_KEY}`);
            const data = await response.json();
            if(data.artists.length > 0) {
                setArtistDetails(data.artists[0]); 
            }
            const song_response = await fetch(`https://api.napster.com/v2.2/artists/${artist_id}/tracks?apikey=${NAPSTER_API_KEY}&limit=20`);
            const song_data = await song_response.json();
            setSongList(song_data.tracks);
        })();
    }, [artist_id]);

    const image_url = `https://api.napster.com/imageserver/v2/artists/${artist_id}/images/633x422.jpg`;
  
    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3}}>
            <Toolbar />
            <Stack direction="row" spacing={10}>
                <Paper elevation={12} style={{width: "31vw", height: "20vw", backgroundImage: `url('${image_url}')`, backgroundSize: "cover"}} />
                <Typography variant='h2' sx={{pt: 4}}>{artistDetails?.name}</Typography>
            </Stack>
            

            <TableContainer component={Paper} sx={{mt: 12}}>
                <Table size="small" sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>
                                <Typography variant='h6'>Name</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h6">Album</Typography>
                            </TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    
                    <TableBody>
                        {songList.length > 0 ? (
                            songList.map((single_song, idx) => (
                                <SongTableRow data={single_song} key={idx} index={idx} owner="artist" />
                            ))
                        ) : (
                            (new Array(20)).fill(1).map((_, idx) => {
                                return(
                                    <TableRow key={idx}>
                                        <TableCell><Skeleton animation="wave" /></TableCell>
                                        <TableCell><Skeleton animation="wave" /></TableCell>
                                        <TableCell><Skeleton animation="wave" /></TableCell>
                                        <TableCell><Skeleton animation="wave" /></TableCell>
                                    </TableRow>
                                );
                            })
                            
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
      )
}

export default ArtistPage