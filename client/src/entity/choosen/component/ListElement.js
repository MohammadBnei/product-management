import React, { } from 'react'
import { Button, CircularProgress, Grid, makeStyles, Paper } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { setElement as setElementAction } from '../actions'
import is from 'is_js'
import { extractParamsFromUrl } from '../../../conf'
import { routerActions } from 'connected-react-router'

const useStyles = makeStyles(() => ({
    button: {
        width: '100%'
    }
}))

export default function ListElement ({ val }) {
    const classes = useStyles()
    const dispatch = useDispatch()

    const handleClick = () => {
        if (is.url(val)) {
            const [resource, id] = extractParamsFromUrl(val)
            dispatch(routerActions.push({
                pathname: '/',
                search: `?resource=${resource}&id=${id}`
            }))
        } else {
            dispatch(setElementAction(val))
        }
    }

    return (
        <Grid item xs={12}>
            <Paper>
                <Button className={classes.button} variant="outlined" color="primary" onClick={handleClick}>
                    {is.url(val) ? (
                        <>
                            <CircularProgress color="inherit" size={20} />
                            {val}
                        </>) : val.name || val.title}
                </Button>
            </Paper>
        </Grid>
    )
}
