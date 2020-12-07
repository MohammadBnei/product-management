import React, { useReducer } from 'react'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { useDispatch, useSelector } from 'react-redux'
import { Select, MenuItem, InputLabel } from '@material-ui/core'
import { updateUser } from '../../redux/actions/user'

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}))

const roles = ['agent', 'client', 'agency', 'leader']

const competences = ['design', 'tech', 'marketing', 'manager']

export default function UpdateUser () {
    const classes = useStyles()

    const dispatch = useDispatch()

    const authenticatedUser = useSelector(({ user }) => user)

    const [user, userDispatch] = useReducer((state, { type, payload }) => {
        switch (type) {
        case 'email':
            return { ...state, email: payload }
        case 'password':
            return { ...state, password: payload }
        case 'role':
            return {
                ...state,
                status: {
                    ...state.status,
                    role: payload
                }
            }
        case 'competences':
            return {
                ...state,
                status: {
                    ...state.status,
                    competences: payload
                }
            }
        case 'capacities':
            return {
                ...state,
                capacities: payload
            }
        case 'firstName':
            return {
                ...state,
                name: {
                    ...state.name,
                    firstName: payload
                }
            }
        case 'lastName':
            return {
                ...state,
                name: {
                    ...state.name,
                    lastName: payload
                }
            }
        default:
            return state
        }
    }, authenticatedUser)

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Update info
                </Typography>
                <div className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                value={user.name.firstName}
                                onChange={e => userDispatch({ type: 'firstName', payload: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                value={user.name.lastName}
                                onChange={e => userDispatch({ type: 'lastName', payload: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={user.email}
                                onChange={e => userDispatch({ type: 'email', payload: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={user.password}
                                onChange={e => userDispatch({ type: 'password', payload: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel id="roleSelect">Role</InputLabel>
                            <Select
                                labelId="roleSelect"
                                id="demo-controlled-open-select"
                                value={user.status.role}
                                onChange={e => userDispatch({ type: 'role', payload: e.target.value })}
                            >
                                {roles.map(r => (
                                    <MenuItem value={r} key={r}>{r}</MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel id="competenceSelect">Competences</InputLabel>
                            <Select
                                labelId="competenceSelect"
                                id="demo-controlled-open-select"
                                multiple
                                value={user.status.competences}
                                onChange={e => userDispatch({ type: 'competences', payload: e.target.value })}
                            >
                                {competences.map(c => (
                                    <MenuItem value={c} key={c}>{c}</MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => dispatch(updateUser(user))}
                    >
                         Update
                    </Button>
                </div>
            </div>
        </Container>
    )
}
