import React, {FC} from 'react';
import {Menu} from "@mui/icons-material";
import {useActions} from "common/hooks";
import {authThunks} from "features/auth/auth.slice";
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography,
} from "@mui/material";
import {useSelector} from "react-redux";
import {selectAppStatus} from "app/app.selectors";

type Props = {
    isLoggedIn: boolean
}
export const AppBarComponent :FC<Props> = ({isLoggedIn}) => {
    const status = useSelector(selectAppStatus);
    const { logout } = useActions(authThunks);

    const logoutHandler = () => logout();

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <Menu />
                </IconButton>
                <Typography variant="h6">News</Typography>
                {isLoggedIn && (
                    <Button color="inherit" onClick={logoutHandler}>
                        Log out
                    </Button>
                )}
            </Toolbar>
            {status === "loading" && <LinearProgress />}
        </AppBar>
    );
};
