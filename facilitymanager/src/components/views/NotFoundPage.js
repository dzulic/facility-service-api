import React, {Component} from 'react';
import Box from "@mui/material/Box";

class NotFoundPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(1, 1fr)',
                    gap: 3,
                    gridTemplateRows: 'auto'
                }}>
                <form name="uy">Not found</form>
            </Box>)
    }
}

export default NotFoundPage