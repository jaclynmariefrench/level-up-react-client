import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { EventContext } from "./EventProvider"
import { GameContext } from "./GameProvider"



export const EventForm = () => {
    const history = useHistory()
    const {getGames, games} = useContext(GameContext)
    const {createEvent} = useContext(EventContext)
    const [currentEvent, setEvent] = useState({})

    useEffect(() => {
        getGames()
    }, [])

    const changeEventState = (domEvent) => {
        const newEventState = {...currentEvent}
        newEventState[domEvent.target.name] = domEvent.target.value
        setEvent(newEventState)
    }

    return (
        <form className="EventForm">
            <h2 className="EventForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game">Game: </label>
                    <select name="game" className="form-control"
                        value={ currentEvent.game }
                        onChange={ changeEventState }>
                        <option value="0">Select a Game...</option>
                        {
                            games.map(game => (
                                <option key={game.id} value={game.id}>
                                    {game.name}</option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Event title:</label>
                    <input type="text" name="title" required autoFocus className="form-control"
                            value={currentEvent.title}
                            onChange={changeEventState}
                    ></input>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Event description:</label>
                    <input type="text" name="description" required autoFocus className="form-control"
                            value={currentEvent.description}
                            onChange={changeEventState}
                    ></input>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input type="date" name="date" required autoFocus className="form-control"
                            value={currentEvent.date}
                            onChange={changeEventState}
                    ></input>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time:</label>
                    <input type="time" name="time" required autoFocus className="form-control"
                            value={currentEvent.time}
                            onChange={changeEventState}
                    ></input>
                </div>
            </fieldset>

            <button type="submit" className="btn btn-primary"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        host: currentEvent.host,
                        game: currentEvent.game,
                        date: currentEvent.date,
                        time: currentEvent.time,
                        title: currentEvent.title,
                        description: currentEvent.description
                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => history.push("/events"))
                }}
                >Create Event</button>
        </form>
    )
}
