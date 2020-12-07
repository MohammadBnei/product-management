import React, { useCallback, useEffect } from 'react'
import { Container, debounce, Grid, MenuItem, TextField } from '@material-ui/core'
import { fetchOptions, setResource, setTerm } from './actions'
import { useDispatch, useSelector } from 'react-redux'

export default function SearchBar () {
    const { resourceList, resource } = useSelector(({ search }) => search)
    const dispatch = useDispatch()

    const searchDebounce = useCallback(
        debounce((_searchVal) => {
            dispatch(setTerm(_searchVal))
            // send the server request here
        }, 200),
        []
    )

    useEffect(() => {
        dispatch(fetchOptions())
    }, [])

    const handleResource = (e) => {
        dispatch(setResource(e.target.value))
    }

    const handleSearch = e => {
        searchDebounce(e.target.value)
    }

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={8} >
                    <TextField id="outlined-basic" label="Search" variant="outlined" fullWidth onChange={handleSearch} />
                </Grid>
                <Grid item xs={4} >
                    <TextField
                        id="filled-select-currency"
                        select
                        label="Resource"
                        value={resource || ''}
                        onChange={handleResource}
                        helperText="Please select your resource"
                        variant="outlined"
                    >
                        {resourceList.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Grid>
        </Container >
    )
}
