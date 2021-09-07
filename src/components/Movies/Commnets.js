import React, {useEffect, useState} from "react";

import {Avatar, Grid, Paper} from "@material-ui/core";
import axios from "axios";

const imgLink =
    "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

function Comments() {

    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState({});

    useEffect(async () => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/')
        setPosts(response.data)
        setPost(posts[Math.floor(Math.random()*posts.length)])
    },[])

    return (
        <div>
            <h3>Comments</h3><br/>
            <Paper style={{padding: "40px 20px"}}>
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                        <Avatar alt="Remy Sharp" src={imgLink}/>
                    </Grid>
                    <Grid justifyContent="left" item xs zeroMinWidth>
                        <h4 style={{margin: 0, textAlign: "left"}}>Michel Michel</h4>

                                <p style={{textAlign: "left"}}>
                                    {console.log(post)}
                                </p>


                        <p style={{textAlign: "left", color: "gray"}}>
                            posted 1 minute ago
                        </p>
                    </Grid>
                </Grid>
            </Paper>


        </div>
    );
}

export default Comments;