import React from "react";

import {Avatar, Box, Grid, Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {Rating} from "@material-ui/lab";

function Review(props) {

    return (
        <div>
            <Paper style={{padding: "20px 20px", backgroundColor: "#f3f3f3"}}>
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                        <Avatar alt="Avatar" src={props.comments.image}/>
                    </Grid>

                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography component={'span'} gutterBottom variant="h6">
                                    {props.comments.author}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {props.comments.body}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item>
                                <Rating name="read-only" value={props.comments.score}  readOnly/>
                        </Grid>
                    </Grid>

                </Grid>
            </Paper>
            <br/>
        </div>
    );
}

export default Review;