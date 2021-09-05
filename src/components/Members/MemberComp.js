import * as React from 'react';
import {useEffect, useState} from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import {makeStyles} from "@material-ui/core/styles";
import SubsDAL from "../../adapters/SubsDAL";
import AddSub from './Member/AddSub'
import MovieList from './Member/MovieList'
import {CardActions} from "@material-ui/core";
import MemberDelete from "./Member/MemberDelete";
import MemberEdit from "./Member/MemberEdit";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 300,
    },
    button: {
        margin: theme.spacing(1),
    },
}));

const getInitials = (nameString) => {
    const fullName = nameString.split(' ');
    const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
    return initials.toUpperCase();
}

export default function MemberComp(props) {
    const classes = useStyles();
    const [subs, setSubs] = useState([])
    const [toggleRerender, setToggleRerender] = useState(false)

    useEffect(async () => {
        const respSubs = await SubsDAL.getSubs(props.member._id)
        setSubs(respSubs.data)
    }, [toggleRerender])

    const handleAddMovie = (obj) => {
        props.callBackAddMovie(obj)
        setToggleRerender(!toggleRerender)
    }

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="member"
                            style={{
                                backgroundColor: props.member.color
                            }}>
                        {getInitials(props.member.name)}
                    </Avatar>
                }
                title={props.member.name}
                subheader={props.member.email}

            />
            <CardContent>
                <AddSub
                    id={props.member._id}
                    rerenderParentCallback={() => setToggleRerender(!toggleRerender)}
                    callBackAddMovie={handleAddMovie}
                />
                <br/>
                {
                    subs.movies &&
                    subs.movies.map((movie, i) => {
                        return <MovieList
                            key={i}
                            movie={movie}
                            rerenderParentCallback={() => setToggleRerender(!toggleRerender)}
                            callBackDeleteMovie={(id) => props.callBackDeleteMovie({movieId: id, subsId: subs._id})}
                        />
                    })
                }
            </CardContent>
            <CardActions>
                <MemberEdit
                    member={props.member}
                    callBack={(obj) => props.callBackEdit(obj)}
                />
                <MemberDelete
                    member={props.member}
                    callBack={(id) => props.callBackDelete(id)}
                />
            </CardActions>

        </Card>
    );
}
