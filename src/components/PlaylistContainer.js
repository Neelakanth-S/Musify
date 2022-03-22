import React from 'react'
import { Box, Toolbar, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import SongTableRow from './SongTableRow';

const PlaylistContainer = () => {
  const playlist = useSelector((state) => state.playlist);
  console.log(playlist);

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, m: 3}}>
        <Toolbar />
        <Typography variant='h3'>Playing Queue:</Typography>

        <TableContainer component={Paper} sx={{mt: 6}}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell><Typography variant='h5'>#</Typography></TableCell>
                        <TableCell><Typography variant='h5'>Name</Typography></TableCell>
                        <TableCell><Typography variant='h5'>Artist</Typography></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                
                <TableBody>
                    {playlist.map((single_song, idx) => {
                        return <SongTableRow data={single_song} key={idx} index={idx} owner="favourite"  />
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    </Box>
  )
}

export default PlaylistContainer;