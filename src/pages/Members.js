import React, {useEffect, useState} from "react";
import MembersDAL from "../adapters/MembersDAL";

import {Grid} from "@material-ui/core";
import MemberComp from "../components/MemberComp";

function randomColor() {
    let hex = Math.floor(Math.random() * 0xFFFFFF);
    let color = "#" + hex.toString(16);

    return color;
}

function Members() {

    const [members, setMembers] = useState([])


    useEffect(async () => {

        let response = await MembersDAL.getAllMembers()
        setMembers(response.data)
    }, [])

    return (
        <div>
            <h1>Members</h1>
            <br/>
            <Grid
                container
                spacing={2}
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
            >
                {
                    members.map((member, index) => {
                        return (<Grid item xs={12} sm={6} md={6} key={index}>
                            <MemberComp key={index} color={randomColor()} member={member}/>
                        </Grid>)
                    })
                }
            </Grid>
        </div>
    );
}

export default Members;
