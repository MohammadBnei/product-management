import { Divider, Grid, Typography } from '@material-ui/core'
import React from 'react'

export default function Planet ({ planet }) {
    return (
        <>
            <Grid item xs={12} >
                <Typography component="h1" variant="h6" color="inherit" noWrap>
                    {planet.name}
                </Typography>
            </Grid>
            <Grid item xs={12} >
                <Typography variant="subtitle2" gutterBottom>
                    Population : {planet.population}
                </Typography>
            </Grid>
            <Divider variant="middle" />
            <Grid container spacing={3}>
                <Grid item xs >
                    <Typography variant="body1" gutterBottom>
                        Rotation Period : {planet.rotation_period}
                    </Typography>
                </Grid>
                <Grid item xs >
                    <Typography variant="body1" gutterBottom>
                        Orbital Period : {planet.orbital_period}
                    </Typography>
                </Grid>
                <Grid item xs >
                    <Typography variant="body1" gutterBottom>
                        Diameter : {planet.diameter}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs >
                    <Typography variant="body1" gutterBottom>
                        Gravity : {planet.gravity}
                    </Typography>
                </Grid>
                <Grid item xs >
                    <Typography variant="body1" gutterBottom>
                        Climate : {planet.climate}
                    </Typography>
                </Grid>
                <Grid item xs >
                    <Typography variant="body1" gutterBottom>
                        Terrain : {planet.terrain}
                    </Typography>
                </Grid>
            </Grid>

        </>
    )
}
