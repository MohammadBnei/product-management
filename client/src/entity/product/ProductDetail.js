import React, { useState, useEffect } from 'react'
import is from 'is_js'
import { Button, Checkbox, Container, FormControlLabel, Grid, makeStyles, MenuItem, Slider, TextField, Typography } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { createProduct, deleteProduct } from './actions'
import { sendWarnMsg } from '../../redux/actions/message'

const useStyles = makeStyles(() => ({
    captialize: {
        textTransform: 'capitalize'
    }
}))

export default function ProductDetail({ product = {}, updateProduct = createProduct }) {
    const classes = useStyles()
    const [name, setName] = useState(product.name || '')
    const [price, setPrice] = useState(product.price || '')
    const [type, setType] = useState(product.type || 'phone')
    const [warranty, setWarranty] = useState(product.warranty || 2)
    const [avalaible, setAvalaible] = useState(product.avalaible || false)
    const dispatch = useDispatch()

    const handleChange = set => e => {
        set(e.target.value)
    }

    const handleClick = () => {
        const payload = { ...product, name, price, type, warranty, avalaible }
        if (is.empty(name) || is.empty(price)) {
            dispatch(sendWarnMsg('You must set the name AND the price'))
            return
        }
        dispatch(updateProduct(payload))
    }

    const handleDelete = () => {
        dispatch(deleteProduct(product._id))
    }

    return (
        <Container maxWidth={false}>
            <Grid container spacing={3} alignItems={'center'} justify={'space-around'}>
                <Grid item xs={3} >
                    <TextField
                        label="Product name"
                        variant="outlined"
                        value={name}
                        fullWidth
                        onChange={handleChange(setName)} />
                </Grid>
                <Grid item xs={2} >
                    <TextField
                        id="outlined-price"
                        label="Price"
                        variant="outlined"
                        value={price}
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                        onChange={handleChange(setPrice)} />
                </Grid>
                <Grid item xs={2} >
                    <TextField
                        select
                        fullWidth
                        label="Type"
                        value={type}
                        onChange={handleChange(setType)}
                        // helperText="Please select your type"
                        variant="outlined"
                    >
                        {['phone', 'computer'].map((option) => (
                            <MenuItem key={option} value={option} className={classes.captialize}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={2} >
                    <Typography id="discrete-slider-small-steps" gutterBottom>
                        Warranty (Years)
                    </Typography>
                    <Slider
                        value={warranty}
                        onChange={(e, val) => setWarranty(val)}
                        aria-labelledby="discrete-slider-small-steps"
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={0}
                        max={5}
                    />
                </Grid>
                <Grid item xs={2} >
                    <FormControlLabel
                        value="start"
                        control={<Checkbox
                            checked={avalaible}
                            color="primary"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                            onChange={(e) => setAvalaible(e.target.checked)}

                        />}
                        label="Avalaible"
                        labelPlacement="top"
                    />
                </Grid>
                <Grid item xs={1} >
                    {is.empty(product) ?
                        (<Button fullWidth variant="contained" color="primary" onClick={handleClick}>Create</Button>) :
                        (
                            <>
                                <Button fullWidth variant="contained" color="primary" onClick={handleClick}>Modify</Button>
                                <Button fullWidth variant="contained" color="secondary" onClick={handleDelete}>Delete</Button>
                            </>
                        )}
                </Grid>
            </Grid>
        </Container >
    )
}
