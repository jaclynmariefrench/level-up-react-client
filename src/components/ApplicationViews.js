import React from "react"
import { Route } from "react-router-dom"
import { EventList } from "./game/EventList.js"
import { EventProvider } from "./game/EventProvider.js"
import { GameList } from "./game/GameList.js"
import { GameProvider } from "./game/GameProvider.js"
import { GameForm } from "./game/GameForm.js"
import { EventForm } from "./game/EventForm.js"
import { ProfileProvider } from "./auth/ProfileProvider.js"
import { Profile } from "./auth/Profile.js"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
        <EventProvider>
            <GameProvider>
                <ProfileProvider>
                    <Route exact path="/games">
                        <GameList />
                    </Route>
                    <Route exact path="/games/new" render= {props => <GameForm {...props}/>}/>
                    <Route exact path="/games/:game_id(\d+)/edit" render= {props => <GameForm {...props}/>}/>
                    <Route exact path="/profile">
                        <Profile />
                    </Route>
                    <Route exact path="/events">
                        <EventList />
                    </Route>
                    <Route exact path="/events/new">
                        <EventForm/>
                    </Route>
                </ProfileProvider>
        </GameProvider>
        </EventProvider>

        </main>
    </>
}

