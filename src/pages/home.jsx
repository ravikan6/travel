import { useState } from "react"
import { FormRow } from "../components/row"

export const HomePage = () => {
    const [type, setType] = useState()

    return (
        <div className="home">
            <div className="body-nav">
                <button className="nav" >
                    Return
                </button>
                <button className="nav" data-state="active">
                    One Way
                </button>
                <button className="nav" >
                    Multi City
                </button>
            </div>
            <FormRow />
        </div>
    )
}