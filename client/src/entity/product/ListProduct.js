import React, { useEffect, useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Grid, makeStyles, Typography } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import axios, { EVENTS_API_URI, PRODUCT_API_URI } from '../../conf'
import { useDispatch, useSelector } from 'react-redux'
import is from 'is_js'
import ProductDetail from './ProductDetail'
import { DONE_LOADING, LOADING } from '../../redux/constants'
import { modifyProduct } from './actions'

const useStyles = makeStyles((theme) => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        textTransform: 'capitalize',
        textAlign: 'center'
    }
}))

export default function ListProduct() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const token = useSelector(({ user }) => user.token)
    const [products, setProducts] = useSSE(dispatch)
    const [expanded, setExpanded] = useState(false)

    useEffect(() => {
        if (!token) return

        (async () => {
            try {
                const data = (await axios.get(PRODUCT_API_URI)).data
                setProducts(data)
            } catch (error) { }
        })()
    }, [token])

    useEffect(() => { console.log({ products }) }, [products])

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


const useSSE = (dispatch) => {
    const [products, setProducts] = useState([])
    let sse
    const initSSE = () => {
        sse = new EventSource(EVENTS_API_URI)

        sse.onerror = (e) => {
            console.log(e);
            if (sse.readyState == 2) {
                setTimeout(initSSE, 5000);
            }
        };

        sse.onmessage = (message) => {
            dispatch({ type: LOADING })
            try {
                const data = JSON.parse(message.data)
                if (data.end === true) {
                    console.log('Stream Ended')
                    sse.close()
                    return
                }

                setProducts(currentState => {
                    let index = currentState.findIndex(p => p._id === data._id)

                    if (index === -1)
                        return [...currentState, data]


                    if (data.removed) {
                        currentState.splice(index, 1)
                    } else {
                        currentState.splice(index, 1, data)
                    }

                    return [...currentState]
                })


            } catch (error) {
                console.log(error)
            } finally {
                dispatch({ type: DONE_LOADING })
            }
        }
    }

    initSSE()

    return [products, setProducts]
}
