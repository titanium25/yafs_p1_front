import React, {useEffect, useState} from "react";
import MembersDAL from "../adapters/MembersDAL";
import {Grid} from "@material-ui/core";
import MemberComp from "../components/Members/MemberComp";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import MemberAdd from "../components/Members/MemberAdd";
import {makeStyles} from "@material-ui/core/styles";
import UserAdd from "../components/Users/User/UserAdd";

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
    const [members, setMembers] = useState([])
    const [toggleRerender, setToggleRerender] = useState(false)

    useEffect(async () => {
        // const response = await MembersDAL.getAllMembers()
        // setMembers(response.data)
    }, [toggleRerender])

    const handleAdd = async (obj) => {
        await MembersDAL.addMember(obj)
        setToggleRerender(!toggleRerender)
    }

    const handleEdit = async (obj) => {
        await MembersDAL.editMember(obj.id, obj)
        setToggleRerender(!toggleRerender)
    }

    const handleDelete = async (id) => {
        console.log(id)
        await MembersDAL.deleteMember(id)
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

            {/*<Grid*/}
            {/*    container*/}
            {/*    spacing={2}*/}
            {/*    direction="row"*/}
            {/*    justifyContent="flex-start"*/}
            {/*    alignItems="flex-start"*/}
            {/*>*/}
            {/*    {*/}
            {/*        members.map((member, index) => {*/}
            {/*            return (*/}
            {/*                <Grid item xs={12} sm={6} md={3} key={index}>*/}
            {/*                    <MemberComp*/}
            {/*                        key={index}*/}
            {/*                        member={member}*/}
            {/*                        rerenderParentCallback={() => setToggleRerender(!toggleRerender)}*/}
            {/*                        callBackEdit={(obj) => handleEdit(obj)}*/}
            {/*                        callBackDelete={(id) => handleDelete(id)}*/}
            {/*                    />*/}
            {/*                </Grid>)*/}
            {/*        })*/}
            {/*    }*/}
            {/*</Grid>*/}
        </div>
    );
}
