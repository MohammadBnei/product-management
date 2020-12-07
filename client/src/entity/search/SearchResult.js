import React, { useEffect } from 'react'
import { Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import { doTheSearch } from './actions'
import { useDispatch, useSelector } from 'react-redux'
import { setElement } from '../choosen/actions'

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 275,
        height: 250
    },
    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 12
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        justifyContent: 'space-between'
    }
}))

export default function SearchResult () {
    const classes = useStyles()
    const { term, resource, results } = useSelector(({ search }) => search)
    const dispatch = useDispatch()

    useEffect(() => {
        if (term) { dispatch(doTheSearch({ term, resource })) }
    }, [term, resource])

    const handleSelect = (url) => () => {
        dispatch(setElement(url))
    }

    return (
        <Grid container spacing={3}>
            {results.map(r => (
                <Grid item key={r.url} xs={12}>
                    <Paper className={classes.paper}>
                        <Typography variant="h5" component="h2" gutterBottom >
                            {r.name || r.title}
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={handleSelect(r.url)}
                        >{'>'}</Button>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    )
}
