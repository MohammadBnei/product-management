import React, { useState, useEffect, useCallback } from 'react'
import { Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { useSelector } from 'react-redux'

export default function Utils () {
    // eslint-disable-next-line max-len
    const { errors } = useSelector(({ meta }) => ({ errors: meta.errors }))
    const [snackbars, setSnackbars] = useState([])

    useEffect(() => {
        setSnackbars((s) => [...s, true])
    }, [errors])

    const handleClose = useCallback((id) => (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        const array = [...snackbars]
        array[id] = false
        setSnackbars(array)
    }, [snackbars])

    return (
        <>
            {errors.map((message, index) => (
                <Snackbar
                    key={index}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={snackbars[index]}
                    autoHideDuration={5000}
                    onClose={handleClose(index)}
                >
                    <Alert onClose={handleClose(index)} severity="error">
                        {message}
                    </Alert>
                </Snackbar>
            ))}
        </>
    )
}
