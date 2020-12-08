import React, { useEffect, useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Grid, makeStyles, Typography } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import axios, { EVENTS_API_URI, PRODUCT_API_URI } from '../../conf'
import { useDispatch, useSelector } from 'react-redux'
import is from 'is_js'
import ProductDetail from './ProductDetail'
import { DONE_LOADING, LOADING } from '../../redux/constants'
import { getProducts, modifyProduct } from './actions'
import { setProducts } from './actions'

const useStyles = makeStyles((theme) => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        textTransform: 'capitalize',
        textAlign: 'center'
    }
}))

let sse = null

export default function ListProduct() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const products = useSelector(({ product }) => product.products)
    const [expanded, setExpanded] = useState(false)

    useEffect(() => {
        dispatch(getProducts())
        initSSE(dispatch)

        return () => sse?.readyState < 2 && sse.close()
    }, [])

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };


    return is.not.empty(products) ? products.map((product) =>
        <Accordion key={product.updatedAt} expanded={expanded === product.name} onChange={handleChange(product.name)}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id={'panel1a-header' + product.name}
            >
                <Grid container spacing={6}>
                    <Grid item xs={12} >
                        <Typography className={classes.heading} >{product.name}</Typography>
                    </Grid>
                </Grid>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container spacing={1}>
                    <ProductDetail product={product} updateProduct={modifyProduct} />
                </Grid>
            </AccordionDetails>
        </Accordion>
    ) : (
            <Grid container spacing={6}>
                <Grid item xs={12} >
                    <Typography className={classes.heading} >No products. Create one to start</Typography>
                </Grid>
            </Grid>
        )
}


const initSSE = (dispatch) => {
    sse = new EventSource(EVENTS_API_URI)

    sse.onerror = (e) => {
        if (sse.readyState == 2) {
            setTimeout(initSSE, 5000);
        }
    };

    sse.onmessage = (message) => {
        try {
            const data = JSON.parse(message.data)
            if (data.end === true) {
                console.log('Stream Ended')
                sse.close()
                return
            }

            dispatch(setProducts(data))

        } catch (error) {
            console.log(error)
        }
    }
}
