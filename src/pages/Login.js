import { Card, Tab, Tabs } from "@blueprintjs/core"
import { useState } from "react"
import Login from "../login/Login"
import Register from "../login/Register"

function LoginPage() {
    const [currentTab, setCurrentTab] = useState("login")

    return (
        <Card elevation="1" style={{'width': '400px'}}>
            <Tabs id="Tabs" onChange={setCurrentTab} selectedTabId={currentTab}>
                <Tab id="login" title="Login" panel={<Login />} />
                <Tab id="register" title="Register" panel={<Register />} />
                <Tabs.Expander />
            </Tabs>
        </Card>
    )
}

export default LoginPage