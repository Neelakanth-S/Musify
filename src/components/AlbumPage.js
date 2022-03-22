import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Box, Toolbar, Paper, Stack, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Chip, Fab } from '@mui/material';
import { NAPSTER_API_KEY } from '../constants';
import SongTableRow from './SongTableRow';
import { PlayArrow } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { replacePlaylist } from '../actions';


const AlbumPage = () => {
    const { album_id } = useParams();
    const [albumDetails, setAlbumDetails] = useState({});
    const [songList, setSongList] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            const response = await fetch(`https://api.napster.com/v2.2/albums/${album_id}?apikey=${NAPSTER_API_KEY}`);
            const data = await response.json();
            if(data.albums.length > 0) {
                setAlbumDetails(data.albums[0]); 
            }
            const song_response = await fetch(`https://api.napster.com/v2.2/albums/${album_id}/tracks?apikey=${NAPSTER_API_KEY}`);
            const song_data = await song_response.json();
            setSongList(song_data.tracks);
        })();
    }, [album_id]);

    const changePlaylist = () => {
        dispatch(replacePlaylist(songList));
    }

    const image_url = `https://api.napster.com/imageserver/v2/albums/${album_id}/images/500x500.jpg`;
  
    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3}}>
            <Toolbar />
            <Stack direction="row" spacing={10}>
                <Paper elevation={12} style={{width: "20vw", height: "20vw", backgroundImage: `url('${image_url}')`, backgroundSize: "cover"}}>
                <Fab color="primary" aria-label="add" sx={{top: "calc(20vw - 2rem)", left: "calc(20vw - 2rem)"}} onClick={changePlaylist}>
                    <PlayArrow fontSize="large" />
                </Fab>
                </Paper>
                <Stack direction="column" spacing={4}>
                    <Typography variant='h2' sx={{pt: 4}}>{albumDetails?.name}</Typography>
                    <Typography variant='h3'>
                        {(albumDetails?.contributingArtists?.primaryArtist === "art.0") ? (
                            albumDetails?.artistName
                        ) : ( 
                            <Link to={`/artists/${albumDetails?.contributingArtists?.primaryArtist}`} style={{textDecoration: "none"}}>
                                {albumDetails?.artistName}
                            </Link>
                        )}
                    </Typography>
                    <Typography>{albumDetails?.copyright}</Typography>
                    <Stack direction="row">
                        {albumDetails?.tags?.map((single_tag, idx) => {
                            return(
                                <Chip label={single_tag} key={idx} variant="outlined" />
                            );
                        })}
                    </Stack>
                </Stack>
            </Stack>
            

            <TableContainer component={Paper} sx={{mt: 12}}>
                <Table size='small' sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Artist</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    
                    <TableBody>
                        {songList.map((single_song, idx) => (
                            <SongTableRow data={single_song} key={idx} index={idx} owner="album" />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
      )
}

export default AlbumPage;