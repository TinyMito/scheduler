import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";

export default function Application(props) {
  // Store all the api data state
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    const getDays = `http://localhost:8001/api/days`;
    const getAppointments = `http://localhost:8001/api/appointments`;
    const getInterviewers = `http://localhost:8001/api/interviewers`;

    // Promise all fetch API data, setState once all data are valid.
    Promise.all([
      axios.get(getDays),
      axios.get(getAppointments),
      axios.get(getInterviewers),
    ]).then(response => {
      setState(prev => ({...prev, days: response[0].data, appointments: response[1].data, interviewers: response[2].data}));
    });
  }, []);

  const setDay = day => setState({ ...state, day }); // Set the day object from onChange in DayList
  const dailyAppointments = getAppointmentsForDay(state, state.day); // Get the appointments for the day
  const dailyInterviewers = getInterviewersForDay(state, state.day); // Get the interviews for the day

  function bookInterview(id, interview) {
    console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState({...state, appointments});
  }

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
          days={state.days}
          value={state.day}
          onChange={setDay}
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map(appointment => {
          const interview = getInterview(state, appointment.interview);
          
          return (
            <Appointment 
              key={appointment.id}
              id={appointment.id}
              time={appointment.time}
              interview={interview}
              interviewers={dailyInterviewers}
              bookInterview={bookInterview}
            />
          )
          })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
