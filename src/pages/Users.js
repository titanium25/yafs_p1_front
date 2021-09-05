import React, {useEffect, useState} from "react";
import UsersDAL from "../adapters/UsersDAL";
import {Grid} from "@material-ui/core";
import UserComp from "../components/Users/UserComp";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import UserAdd from "../components/Users/User/UserAdd";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        "& > *": {
            marginTop: theme.spacing(2),
            justifyContent: "center",
            display: 'flex'
        }
    }
}));

export default function Users() {
    const classes = useStyles();
    const [users, setUsers] = useState([])
    const [toggleRerender, setToggleRerender] = useState(false)

    useEffect(async () => {
        const response = await UsersDAL.getAllUsers()
        setUsers(response.data)
    }, [toggleRerender])

    const handleAdd = async (obj) => {
        await UsersDAL.addUser(obj)
        setToggleRerender(!toggleRerender)
    }

    const handleEdit = async (obj) => {
        await UsersDAL.editUser(obj.id, obj)
        setToggleRerender(!toggleRerender)
    }

    const handleDelete = async (id) => {
        await UsersDAL.deleteUser(id)
        setToggleRerender(!toggleRerender)
    }

    return (
        <div className={classes.root}>
            <Grid
                container
                align="center"
                justifyContent="center"
                spacing={3}
                alignItems="center"
                direction="row"
            >
                <Grid item xs={12}>
                    <Typography variant="h4">Users</Typography>
                </Grid>
            </Grid>

            <Divider/>
            <UserAdd
                callBack={(obj) => handleAdd(obj)}
            />
            <Divider/>

            <Grid
                container
                spacing={2}
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
            >
                {
                    users.map((user, index) => {
                        return (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <UserComp
                                    key={index}
                                    user={user}
                                    rerenderParentCallback={() => setToggleRerender(!toggleRerender)}
                                    callBackEdit={(obj) => handleEdit(obj)}
                                    callBackDelete={(id) => handleDelete(id)}
                                />
                            </Grid>)
                    })
                }
            </Grid>
        </div>
    );
}
