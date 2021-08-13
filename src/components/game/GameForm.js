import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory, useParams } from 'react-router-dom'


export const GameForm = (props) => {
    const history = useHistory()
    const { games, createGames, getGame, gameTypes, updateGame  } = useContext(GameContext)

    const {game_id} = useParams()
    const [game, setGame] = useState({})
    const [idEdit, setEdit] = useState(false) 

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
        Get games types on initialization so that the <select>
        element presents games type choices to the user.
    */
    useEffect(() => {
        getGameTypes()
    }, [])

    useEffect(()=> {
        if(game_id) {
        setEdit(true)
        getGame(game_id).then((res)=> {
            const data = res.json()
            setCurrentGame({
                skill_level: data.skill_level,
                number_of_players: data.number_of_players,
                name: data.name,
                maker: data.maker,
                description: data.description,
                game_type: data.game_type
            })
            
        })
        
        }
    }, [game_id])

    const changeGameState = (event) => {
        const newGameState = { ...currentGame }
        newGameState[event.target.name] = event.target.value
        setCurrentGame(newGameState)
    }


    return (
        <form className="gamesForm">
            <h2 className="gamesForm__name">Register New Games</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name of Games: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={currentGame.name}
                        onChange={changeGameState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="maker">Games maker:</label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                            value={currentGame.maker}
                            onChange={changeGameState}
                    ></input>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Games description:</label>
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
                    <label htmlFor="games_type">Games Type:</label>
                    <select value={currentGame.games_type} name="games_type" id="gamesType" className="form-control" onChange={changeGameState}>
                        <option value="0">Select the Games Type</option>
                        {gameTypes.map(gt=>(
                            <option key={gt.id} value={gt.id}>
                                {gt.label}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            
            {
                ("games_id" in props.match.params)
                ? <button className="btn btn-primary"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    updateGame({
                        id: props.match.params.games_id,
                        maker: currentGame.maker,
                        name: currentGame.name,
                        number_of_players: parseInt(currentGame.number_of_players),
                        skill_level: parseInt(currentGame.skill_level),
                        games_type: parseInt(currentGame.games_type),
                        description: currentGame.description
                    })
                        .then(() => history.push("/games"))
                }}
                >Edit</button>
                
                : <button type="submit" className="btn btn-primary"
                    onClick={evt => {
                        // Prevent form from being submitted
                        evt.preventDefault()
    
                        const games = {
                            maker: currentGame.maker,
                            name: currentGame.name,
                            number_of_players: parseInt(currentGame.number_of_players),
                            skill_level: parseInt(currentGame.skill_level),
                            games_type: parseInt(currentGame.games_type),
                            description: currentGame.description
                        }
    
                        // Send POST request to your API
                        createGames(games)
                            .then(() => history.push("/games"))
                    }}
                    >Create</button>
            }
            
        </form>
    )
}
