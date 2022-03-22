import React from 'react'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

const ArtistCard = (props) => {
    const navigate = useNavigate();
    const image_url = `https://api.napster.com/imageserver/v2/artists/${props.data?.id}/images/200x200.jpg`;
    
    const navigate_fn = () => {
        navigate(`/artists/${props.data?.id}`);
    }

    return (
        <Grid item xs={2} onClick={navigate_fn}>
            <Paper elevation={3} sx={[{pb: 1, height: "100%"}, {'&:hover': { backgroundColor: 'grey' }}]}>
                <Stack>
                <Paper elevation={2} sx={{m: 2, p:8, backgroundImage: `url('${image_url}');`, backgroundSize: "cover" }}>
                    <h1>&nbsp;</h1>
                </Paper>
                
                <Typography sx={{ textAlign: "center" }}>{props.data?.name}</Typography>
                </Stack>
            </Paper>
        </Grid>
    )
}

export default ArtistCard;