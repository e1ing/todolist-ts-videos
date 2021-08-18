import React, {useCallback} from 'react'
import './App.css'
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import LinearProgress from '@material-ui/core/LinearProgress';
import ErrorSnackbar from "../components/ErrorSnackbar/ErrorSnackbar";
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from "./store";
import {initializeAppTC, RequestStatusType} from './app-reducer'
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {Login} from "../features/Login/Login";
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import {useEffect} from 'react'
import {logoutTC} from "../features/Login/auth-reducer";

type AppPropsType = {
    demo?: boolean
}

function App({demo = false}: AppPropsType) {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const initialized = useSelector<AppRootStateType, boolean>(state => state.app.initialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    })

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, []);

    if (!initialized) {
        return <div style={{position: "fixed", top: '30%', left: "50%", width: "100%"}}>
            <CircularProgress/>
        </div>
    }

    return (
        <BrowserRouter>
            <div className="App">
                <ErrorSnackbar/>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">
                            News
                        </Typography>
                        {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}

                    </Toolbar>
                    {status === "loading" && <LinearProgress/>}
                </AppBar>
                <Container fixed>
                    <Switch>
                        <Route exact path={"/"} render={() => <TodolistsList demo={demo}/>}/>
                        <Route path={"/login"} render={() => <Login/>}/>
                        <Route path={"/404"}
                               render={() => <h1 style={{fontSize: "50px", textAlign: "center"}}>
                                   404: page not found</h1>}/>
                        <Redirect from={"*"} to={"/404"}/>
                    </Switch>
                </Container>
            </div>
        </BrowserRouter>
    )

}

export default App;


