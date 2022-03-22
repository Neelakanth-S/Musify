import React, { useState } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import TopNav from './components/TopNav';
import PlayerContainer from './components/PlayerContainer';
import MainContainer from './components/MainContainer';
import SideNav from './components/SideNav';
import TopArtistContainer from './components/TopArtistContainer';
import {Routes, Route} from 'react-router-dom';
import ArtistPage from './components/ArtistPage';
import TopSongsContainer from './components/TopSongsContainer';
import TopAlbumsContainer from './components/TopAlbumsContainer';
import AlbumPage from './components/AlbumPage';
import SearchContainer from './components/SearchContainer';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import FavouriteListContainer from './components/FavouriteListContainer';
import PlaylistContainer from './components/PlaylistContainer';

const App = () => {

  const [theme, setTheme] = useState(createTheme({
    palette: {
      mode: 'light',
    },
  }));

  const updateTheme = (isDark) => {
    if(isDark) {
      const theme = createTheme({
        palette: {
          mode: 'light',
        },
      });
      setTheme(theme);
    } else {
      const theme = createTheme({
        palette: {
          mode: 'dark',
        },
      });
      setTheme(theme);
    }
  }


  return (
    <>
    <ThemeProvider theme={theme}>
      <Box sx={{pb: 7}}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <TopNav updateTheme={updateTheme} />
        <SideNav />
        <Box sx={{mb: 8, width: 1}}>
          <Routes>
            <Route path="/" element={<MainContainer />} />
            <Route path="/top/artists" element={<TopArtistContainer />} />
            <Route path="/artists/:artist_id" element={<ArtistPage />} />
            <Route path="/top/albums" element={<TopAlbumsContainer />} />
            <Route path="/albums/:album_id" element={<AlbumPage />} />
            <Route path="/top/songs" element={<TopSongsContainer />} />
            <Route path="/search/:query" element={<SearchContainer />} />
            <Route path="/favourites" element={<FavouriteListContainer />} />
            <Route path="/playlist" element={<PlaylistContainer />} />
          </Routes>
        </Box>
        
      </Box>
          <PlayerContainer />
      </Box>
    </ThemeProvider>
    </>
  );
}

export default App;