import React, { useState } from 'react'
import { Container, debounce, Grid, InputAdornment, MenuItem, TextField } from '@material-ui/core'
import { useDispatch } from 'react-redux'

export default function CreateProduct() {
    // const { resourceList, resource } = useSelector(({ search }) => search)
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [type, setType] = useState('');
    const dispatch = useDispatch()

    const handleChange = set => e => {
        set(e.target.value)
    }

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={3} >
                    <TextField id="outlined-basic" label="Product name" variant="outlined" value={name} fullWidth onChange={handleChange(setName)} />
                </Grid>
                <Grid item xs={3} >
                    <TextField id="outlined-basic" label="Price" variant="outlined" value={price} fullWidth onChange={handleChange(setPrice)} startAdornment={<InputAdornment position="start">$</InputAdornment>} />
                </Grid>
                <Grid item xs={3} >
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Select"
                        value={currency}
                        onChange={handleChange}
                        helperText="Please select your currency"
                        variant="outlined"
                    >
                        {['phone', 'computer'].map((option) => (
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
