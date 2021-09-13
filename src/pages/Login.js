import {Card, Tab, Tabs} from "@blueprintjs/core"
import {useState} from "react"
import Login from "../login/Login"
import Register from "../login/Register"


function LoginPage() {
    const [currentTab, setCurrentTab] = useState("login")

    return (
        <Card style={{
            'width': '400px',
            'margin': '0',
            'position': 'absolute',
            'top': '20%',
            'left': '50%',
            '-ms-transform': 'translate(-50%, -50%)',
            'transform': 'translate(-50%, 0%)',
        }}>
            <Tabs id="Tabs" onChange={setCurrentTab} selectedTabId={currentTab}>
                <Tab id="login" title="Login" panel={<Login/>}/>
                <Tab id="register" title="Register" panel={<Register/>}/>
                <Tabs.Expander/>
            </Tabs>
        </Card>
    )
}

export default LoginPage