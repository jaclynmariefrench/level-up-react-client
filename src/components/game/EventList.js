import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { EventContext } from "./EventProvider.js";

export const EventList = (props) => {
  const { events, getEvents, joinEvent, leaveEvent } = useContext(EventContext);
  const history = useHistory()

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <article className="events">
      <header className="events__header">
        <button
          className="btn btn-2 btn-sep icon-create"
          onClick={() => {
            history.push({ pathname: "/events/new" });
          }}
        >
          Create New Event
        </button>
        <h1>Level Up Game Events</h1>
      </header>
      {events.map((event) => {
        return (
          <section key={event.id} className="registration">
            <h3 className="registration__game">{event.game.name}</h3>
            <div>{event.description}</div>
            <div>
              {new Date(event.date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              @ {event.time}
            </div>
          {
                event.joined
                    ? <button className="btn btn-3"
                        onClick={() => leaveEvent(event.id)}
                        >Leave</button>
                    : <button className="btn btn-2"
                        onClick={() => joinEvent(event.id)}
                        >Join</button>
            }
          </section>
        );
              })}
    </article>
  );
};
