import React, { useState, useEffect, useCallback } from 'react'
import { Backdrop, CircularProgress, Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { useSelector } from 'react-redux'

export default function Utils() {
    // eslint-disable-next-line max-len
    const { messages } = useSelector(({ loading, messages, user }) => ({ messages, user }))
    const [snackbars, setSnackbars] = useState([])

    useEffect(() => {
        setSnackbars((s) => [...s, true])
    }, [messages])

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
            {messages.map((message, index) => (
                <Snackbar
                    key={message.id}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={snackbars[index]}
                    autoHideDuration={3000}
                    onClose={handleClose(index)}
                >
                    <Alert onClose={handleClose(index)} severity={message.type}>
                        {message.message}
                    </Alert>
                </Snackbar>
            ))}
        </>
    )
}
