import React from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

// APPLICATION Component
export default function Application(props) {
  // From hooks useApplicationData
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  // Get the interviews for the day, need to initialize first for dailyAppointments constant
  const dailyInterviewers = getInterviewersForDay(state, state.day); 

  // Get the appointments for the day
  const dailyAppointments = getAppointmentsForDay(state, state.day).map(appointment => {
    // Interview object contain all the data for the single interview
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment 
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    )
  }); 

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
        {dailyAppointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
