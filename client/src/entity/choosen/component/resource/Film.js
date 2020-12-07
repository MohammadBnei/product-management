import { Divider, Grid, Typography } from '@material-ui/core'
import React from 'react'

export default function Film ({ film }) {
    return (
        <>
            <Grid item xs={12} >
                <Typography component="h1" variant="h6" color="inherit" noWrap>
                    {film.title} (Episode {film.episode_id})
                </Typography>
            </Grid>
            <Divider variant="middle" />
            <Grid item xs={12} >
                <Typography variant="body1" gutterBottom>
                    {film.opening_crawl}
                </Typography>
            </Grid>
            <Grid item xs={12} >
                <Typography variant="subtitle1" gutterBottom>
                    Director : {film.director}
                </Typography>
            </Grid>
            <Grid item xs={12} >
                <Typography variant="subtitle2" gutterBottom>
                Producer : {film.producer}
                </Typography>
            </Grid>
            <Grid item xs={12} >
                <Typography variant="subtitle2" gutterBottom>
                    Released : {film.release_date}
                </Typography>
            </Grid>
        </>
    )
}
