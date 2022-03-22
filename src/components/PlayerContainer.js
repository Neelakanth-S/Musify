import React, { useRef, useState, useEffect } from 'react';
import { Paper, Stack, Box, Slider, Fab, IconButton } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { makeFavourite, removeFavourite, playNextSong, playPreviousSong } from '../actions';

import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PauseIcon from '@mui/icons-material/Pause';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RepeatIcon from '@mui/icons-material/Repeat';
import RepeatOnIcon from '@mui/icons-material/RepeatOn';
import FavoriteIcon from '@mui/icons-material/Favorite';

const PlayerContainer = () => {
    const [volume, setVolume] = useState(50);
    const [playTime, setPlayTime] = useState(0);
    const [isPlaying, setPlaying] = useState(false);
    const audioPlayer = useRef(null);
    const [isRepeat, setRepeat] = useState(false);
    const dispatch = useDispatch();

    const appState = useSelector((state) => state);
    
    let image_url = "";
    if(appState?.currently_playing?.albumId !== undefined) {
      image_url = `https://api.napster.com/imageserver/v2/albums/${appState?.currently_playing.albumId}/images/200x200.jpg`;
    }
    

    useEffect(() => {
      audioPlayer.current.volume = (volume / 100);
    }, [volume]);

    useEffect(() => {
      if(audioPlayer.current.src !== "") {
        setPlayTime(0);
        audioPlayer.current.play();
        setPlaying(true);
      }
    }, [appState.currently_playing]);

    const changeVolume = (_, volume) => {
        setVolume(volume);
    };

    const changePlayTime = (_, playTime) => {
        audioPlayer.current.currentTime = playTime;
        setPlayTime(playTime);
    }

    const updatePlayTimeAudioPlayer = (e) => {
      setPlayTime(e.target.currentTime);
    }

    const stopPlaying = () => {
      setPlaying(false);
      setPlayTime(0);
      playNext();
    }

    const playNext = () => {
      dispatch(playNextSong());
    }

    const playPrevious = () => {
      dispatch(playPreviousSong());
    }

    const togglePlayPause = () => {
      setPlaying((currentState) => {
        const newState = !currentState;
        
        if(newState) {
          audioPlayer.current.play();
        } else {
          audioPlayer.current.pause();
        }
        return newState;
      })
    }

    const toggleRepeat = () => {
      setRepeat((currentState) => {
        const newState = !currentState;
        audioPlayer.current.loop = newState;
        return newState;
      });
    }

    const toggleFavourite = () => {
      if(appState.favourite_list[appState.currently_playing.id] === undefined) {
        dispatch(makeFavourite(appState.currently_playing));
      } else {
        dispatch(removeFavourite(appState.currently_playing.id));
      }
    }

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, width: "100vw", zIndex: 1300 }} elevation={12}>
      <audio ref={audioPlayer} src={appState?.currently_playing?.previewURL} onTimeUpdate={updatePlayTimeAudioPlayer} onEnded={stopPlaying} />
        <Slider
          aria-label="time-indicator"
          size="small"
          value={playTime}
          min={0}
          max={30}
          onChange={changePlayTime}
          sx={{
            mt: -4,
            color: "light" === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
            height: 4,
            '& .MuiSlider-thumb': {
              width: 8,
              height: 8,
              '&:before': {
                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
              },
              '&:hover, &.Mui-focusVisible': {
                boxShadow: `0px 0px 0px 8px ${
                  "light" === 'dark'
                    ? 'rgb(255 255 255 / 16%)'
                    : 'rgb(0 0 0 / 16%)'
                }`,
              },
              '&.Mui-active': {
                width: 20,
                height: 20,
              },
            },
            '& .MuiSlider-rail': {
              opacity: 0.28,
            },
          }}
        />
        <Stack direction="row" sx={{pb: 2, pl: 2, pr: 4}} spacing={2} justifyContent="space-between" alignItems="center">
            <img height="75"  src={image_url} alt="" />
  
            <Box sx={{pl: 18}}>
              <Stack direction="row" spacing={2} alignItems="center">

                <IconButton aria-label="delete" onClick={toggleFavourite}>
                  {appState.favourite_list[appState.currently_playing.id] === undefined ? 
                    <FavoriteBorderIcon />
                  :
                    <FavoriteIcon /> 
                  }
                </IconButton>
                
                <IconButton aria-label="delete" onClick={playPrevious}>
                  <SkipPreviousIcon fontSize="large" />
                </IconButton>
                
                <Fab color="primary" aria-label="add" onClick={togglePlayPause}>
                  {isPlaying ? <PauseIcon fontSize='large' /> : <PlayArrowIcon fontSize='large' /> }
                </Fab>
                
                <IconButton aria-label="delete" onClick={playNext}>
                  <SkipNextIcon fontSize='large' />
                </IconButton>

                <IconButton aria-label="delete" onClick={toggleRepeat}>
                  {isRepeat? <RepeatOnIcon /> : <RepeatIcon /> }
                </IconButton>
                
              </Stack>
            </Box>
  
            <Box sx={{width: "200px"}}>
                <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                    <VolumeDown />
                    <Slider aria-label="Volume" value={volume} onChange={changeVolume} />
                    <VolumeUp />
                </Stack>
            </Box>
        </Stack>
    </Paper>
  )
}

export default PlayerContainer