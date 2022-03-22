import React from 'react'
import { FavoriteBorder, PlayArrow, Favorite, PlaylistAdd } from '@mui/icons-material';
import { TableRow, TableCell, IconButton, Typography, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { makeFavourite, removeFavourite, setPlayNow, addToPlaylist } from '../actions';
import { Link } from 'react-router-dom';

const SongTableRow = (props) => {
    const dispatch    = useDispatch();
    const isFavourite = useSelector((state) => state.favourite_list[props.data.id] !== undefined );
    const isPlaying   = useSelector((state) => state.currently_playing.id === props.data.id);
    const image_url   = `https://api.napster.com/imageserver/v2/albums/${props.data?.albumId}/images/150x150.jpg`;

    const playSong = () => {
        dispatch(setPlayNow(props.data));    
    }
    const toggleFavourite = () => {
        if(isFavourite) {
            dispatch(removeFavourite(props.data.id));
        } else {
            dispatch(makeFavourite(props.data));
        }
    }

    const addToPlay = () => {
        dispatch(addToPlaylist(props.data));
    }

    return (
        <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }} selected={isPlaying}>
            <TableCell component="th" scope="row">{props.index + 1}.</TableCell>
            <TableCell>
            <Stack direction="row" alignItems="center" spacing={2}>
                {(props.owner !== "album") ? (
                    <img style={{width: "3rem", height: "3rem"}} src={image_url} alt="Album Cover" />
                ) : false }
                <Typography variant="h6">{props.data?.name}</Typography>
            </Stack>
            </TableCell>
            <TableCell>
                {(props.owner === "artist") ? (
                    <Link to={`/albums/${props.data?.albumId}`} >
                        <Typography variant="h6">
                            {props.data?.albumName}
                        </Typography>
                    </Link>
                ) : (
                    <Link to={`/artists/${props.data?.artistId}`} >
                        <Typography variant="h6">
                            {props.data?.artistName}
                        </Typography>
                    </Link>
                )}
                
            </TableCell>
            <TableCell>
                <IconButton aria-label="delete" size="large" onClick={playSong}>
                    <PlayArrow fontSize="large" />
                </IconButton>
                <IconButton aria-label="delete" size="large" onClick={toggleFavourite}>
                    {isFavourite ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
                <IconButton aria-label="delete" size="large" onClick={addToPlay}>
                   <PlaylistAdd />
                </IconButton>
            </TableCell>
        </TableRow>
    )
};

export default SongTableRow;