import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from 'react-router-dom'

import VpnKeyIcon from '@material-ui/icons/VpnKey'
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom'
import SearchBar from '../entity/search/SearchBar'
import SearchResult from '../entity/search/SearchResult'
import Choosen from '../entity/choosen/Choosen'
import { CircularProgress } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { LOGOUT } from '../redux/actionTypes'
// import Deposits from './Deposits';
// import Orders from './Orders';

function Copyright () {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
        Star Wars Rebels Alliance
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    menuButton: {
        marginRight: 36
    },
    menuButtonHidden: {
        display: 'none'
    },
    title: {
        flexGrow: 1
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto'
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column'
    },
    fixedHeight: {
        height: 640
    },
    searchBar: {
        height: 120
    }
}))

export default function Home () {
    const classes = useStyles()
    const { loader, authenticated } = useSelector(({ meta, auth }) => ({ loader: meta.loading, authenticated: auth.authenticated }))
    const dispatch = useDispatch()
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    {authenticated ? (<IconButton
                        edge="start"
                        color="inherit"
                        onClick={() => dispatch({ type: LOGOUT })}
                        className={clsx(classes.menuButton)}
                    >
                        <MeetingRoomIcon />
                    </IconButton>) : (<IconButton
                        edge="start"
                        color="inherit"
                        component={RouterLink} to="/signin"
                        className={clsx(classes.menuButton)}
                    >
                        <VpnKeyIcon />
                    </IconButton>)
                    }
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Search System {authenticated && ' (Connected)'}
                    </Typography>
                    <IconButton color="inherit">
                        {loader !== 0 && <CircularProgress color="inherit" />}
                    </IconButton>
                </Toolbar>
            </AppBar>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} >
                            <Paper className={classes.searchBar}>
                                <SearchBar />
                            </Paper>
                        </Grid>
                        {/* Recent Deposits */}
                        <Grid item xs={6} >
                            <Paper className={fixedHeightPaper}>
                                <SearchResult />
                            </Paper>
                        </Grid>
                        {/* Recent Orders */}
                        <Grid item xs={6} >
                            <Paper className={fixedHeightPaper}>
                                <Choosen />
                            </Paper>
                        </Grid>
                    </Grid>
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </main>
        </div>
    )
}
