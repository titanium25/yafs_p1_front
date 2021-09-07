import React from "react";

import {Avatar, Grid, Paper} from "@material-ui/core";

const imgLink =
    "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

function Comments(props) {

    return (
        <div>
            <Paper style={{padding: "40px 20px", backgroundColor: "#f3f3f3"}}>
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                        {console.log(props.comments.image)}
                        <Avatar alt="Remy Sharp" src={props.comments.image}/>
                    </Grid>
                    <Grid justifyContent="left" item xs zeroMinWidth>
                        <h4 style={{margin: 0, textAlign: "left"}}>{props.comments.author}</h4>

                        <p style={{textAlign: "left"}}>
                            {props.comments.body}
                        </p>


                        <p style={{textAlign: "left", color: "gray"}}>
                            posted 1 minute ago
                        </p>
                    </Grid>
                </Grid>
            </Paper>
            <br/>
        </div>
    );
}

export default Comments;