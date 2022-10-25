import Button from "../shared/test/Button"
import Header from "../shared/test/Header"
import Title from "../shared/test/Title"


export default function WelcomeTest() {
    return (
        <div className="container-wrapper">
            <Header />
            <div className="col s8 container">   
                <div className="center-align">
                    <Button text="Registrera" icon={<i className="large material-icons right">group_add</i>}/>
                </div>
                <div className="center-align">
                    <Button text="Logga in" icon={<i className="large material-icons right">person</i>}/>
                </div>
                <div className="center-align">
                    <Button text="Starta direkt" icon={<i className="large material-icons right">arrow_forward</i>}/>
                </div>
                
                
            </div>
        </div>

        



    )
}