import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
const navbar = ({ accounts }) => {
    return (
        <div>
            <AppBar position="static" color="inherit">
                <Toolbar>

                    <Typography variant="h6" >
                        Election Dapp
    </Typography>
                    <ul>
                        <li>
                            <Typography variant="h6" color="secondary" >
                                {accounts}
                            </Typography>
                        </li>
                    </ul>


                </Toolbar>
            </AppBar>
        </div>
    )
}

export default navbar
