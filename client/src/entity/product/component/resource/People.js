import { Divider, Grid, Typography } from '@material-ui/core'
import React from 'react'

export default function People ({ people }) {
    return (
        <>
            <Grid item xs={12} >
                <Typography component="h1" variant="h6" color="inherit" noWrap>
                    {people.name}
                </Typography>
            </Grid>
            <Grid item xs={12} >
                <Typography variant="subtitle2" gutterBottom>
                    Birth Year : {people.birth_year}
                </Typography>
            </Grid>
            <Divider variant="middle" />
            <Grid container spacing={3}>
                <Grid item xs >
                    <Typography variant="body1" gutterBottom>
                        Height : {people.height}
                    </Typography>
                </Grid>
                <Grid item xs >
                    <Typography variant="body1" gutterBottom>
                        Mass : {people.mass}
                    </Typography>
                </Grid>
                <Grid item xs >
                    <Typography variant="body1" gutterBottom>
                        Gender : {people.gender}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs >
                    <Typography variant="body1" gutterBottom>
                        Hair : {people.hair_color}
                    </Typography>
                </Grid>
                <Grid item xs >
                    <Typography variant="body1" gutterBottom>
                        Skin : {people.skin_color}
                    </Typography>
                </Grid>
                <Grid item xs >
                    <Typography variant="body1" gutterBottom>
                        Eyes : {people.eye_color}
                    </Typography>
                </Grid>
            </Grid>

        </>
    )
}
