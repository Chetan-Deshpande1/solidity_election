import React, { useState } from 'react'



const Body = ({ candidate1, candidate2, voteCandidate }) => {
    const [candidate, setCandidate] = useState("")
    const onchange = (e) => {
        setCandidate(e.target.value)
    }
    const onsubmit = (e) => {
        e.preventDefault()
        if (candidate.id !== 0) {
            voteCandidate(Number(candidate))
        } else {
            window.alert('error found')
        }


    }


    return (
        <div class="container">
            <main role="main" class="container">
                <div class="jumbotron">
                    <h1>Project</h1>
                    <div className="row" style={{ paddingTop: "30px" }}>

                        <div className="row" style={{ paddingLeft: "40px" }}>
                            {candidate1.id} <h3>{candidate1.name}</h3> <h3>{candidate1.voteCount}</h3>
                        </div>
                        <div className="row" style={{ paddingLeft: "40px" }}>
                            {candidate2.id} <h3>{candidate2.name}</h3> <h3>{candidate2.voteCount}</h3>
                        </div>
                        <div className="row" style={{ paddingLeft: "40px" }}>
                            <button className="btn btn-primary">Click on it</button>
                        </div>

                    </div>
                </div>
            </main>
            <br></br>
            <form onSubmit={onsubmit}>
                <select class="form-select" aria-label="Default select example" onChange={onchange}>
                    <option selected>Candidaites</option>
                    <option value="1">{candidate1.name}</option>
                    <option value="2">{candidate2.name}</option>

                </select>

            </form>

        </div >

    )
}

export default Body
