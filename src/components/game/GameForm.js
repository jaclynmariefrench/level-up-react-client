import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory } from 'react-router-dom'


export const GameForm = () => {
    const history = useHistory()
    const { createGame, getGameTypes, gameTypes } = useContext(GameContext)

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skill_level: 0,
        number_of_players: 0,
        name: "",
        maker: "",
        description: "",
        game_type: 0
    })

    /*
        Get game types on initialization so that the <select>
        element presents game type choices to the user.
    */
    useEffect(() => {
        getGameTypes()
    }, [])

    /*
        REFACTOR CHALLENGE START

        Can you refactor this code so that all property
        state changes can be handled with a single function
        instead of five functions that all, largely, do
        the same thing?

        One hint: [event.target.name]
    */
    const changeGameState = (event) => {
        const newGameState = { ...currentGame }
        newGameState[event.target.name] = event.target.value
        setCurrentGame(newGameState)
    }

    /* REFACTOR CHALLENGE END */

    return (
        <form className="gameForm">
            <h2 className="gameForm__name">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name of Game: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={currentGame.name}
                        onChange={changeGameState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="maker">Game maker:</label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                            value={currentGame.maker}
                            onChange={changeGameState}
                    ></input>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Game description:</label>
                    <input type="text" name="description" required autoFocus className="form-control"
                            value={currentGame.description}
                            onChange={changeGameState}
                    ></input>
                </div>
                <div className="form-group">
                    <label htmlFor="number_of_players">Number of Players:</label>
                    <input type="number" name="number_of_players" required autoFocus className="form-control"
                        value={currentGame.number_of_players}
                        onChange={changeGameState}
                    ></input>
                </div>
                <div className="form-group">
                    <label htmlFor="skill_level">Skill level needed:</label>
                    <input type="number" name="skill_level" required autoFocus className="form-control"
                        value={currentGame.skill_level}
                        onChange={changeGameState}
                    ></input>
                </div> 
                <div className="form-group">
                    <label htmlFor="game_type">Game Type:</label>
                    <select value={currentGame.game_type} name="game_type" id="gameType" className="form-control" onChange={changeGameState}>
                        <option value="0">Select the Game Type</option>
                        {gameTypes.map(gt=>(
                            <option key={gt.id} value={gt.id}>
                                {gt.label}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>

            {/* You create the rest of the input fields for each game property */}

            <button type="submit" className="btn btn-primary"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        maker: currentGame.maker,
                        name: currentGame.name,
                        number_of_players: parseInt(currentGame.number_of_players),
                        skill_level: parseInt(currentGame.skill_level),
                        game_type: parseInt(currentGame.game_type),
                        description: currentGame.description
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => history.push("/games"))
                }}
                >Create</button>
        </form>
    )
}
