import * as React from 'react';
import { Drawer, Toolbar, List, Divider, ListItem, Box } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import AlbumIcon from '@mui/icons-material/Album';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import FavoriteIcon from '@mui/icons-material/Favorite';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import {Link} from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

const drawerWidth = 240;

export default function ClippedDrawer() {
  return (
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
        <List>
            <Link to="/" style={{textDecoration: "none"}}>
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </Link>
            <Link to="/top/artists" style={{textDecoration: "none"}}>
              <ListItem button>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Top Artists" />
              </ListItem>
            </Link>
            <Link to="/top/albums" style={{textDecoration: "none"}}>
              <ListItem button>
                <ListItemIcon>
                  <AlbumIcon />
                </ListItemIcon>
                <ListItemText primary="Top Albums" />
              </ListItem>
            </Link>
            <Link to="/top/songs" style={{textDecoration: "none"}}>
              <ListItem button>
                <ListItemIcon>
                  <LibraryMusicIcon />
                </ListItemIcon>
                <ListItemText primary="Top Songs" />
              </ListItem>
            </Link>
          </List>
          <Divider />
          <List>
            <Link to="/favourites" style={{textDecoration: "none"}}>
              <ListItem button>
                <ListItemIcon>
                  <FavoriteIcon />
                </ListItemIcon>
                <ListItemText primary="My Favourites" />
              </ListItem>
            </Link>
            <Link to="/playlist" style={{textDecoration: "none"}}>
              <ListItem button>
                <ListItemIcon>
                  <QueueMusicIcon />
                </ListItemIcon>
                <ListItemText primary="My Playlist" />
              </ListItem>
            </Link>
          </List>
        </Box>
      </Drawer>
  );
}