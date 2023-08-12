import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  // Store all the api data state
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    const getDays = `/api/days`;
    const getAppointments = `/api/appointments`;
    const getInterviewers = `/api/interviewers`;

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

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // PUT interview database
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        // If success, set state with new data
        setState({...state, appointments});
        updateSpots(state.days.find(day => day.appointments.includes(id)).id, -1); // Get the appointment ID link to the day id.
      })

  };

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null // clear the interview object
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // DELETE interview database
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        // If success, set state with new data
        setState({...state, appointments});
        updateSpots(state.days.find(day => day.appointments.includes(id)).id, +1); // Get the appointment ID link to the day id.
      })
  };

  function updateSpots(id, num = 0) {
    setState(prev => { // Get current object
      const newDays = prev.days.map(day => { // Map the array in days object
        if (day.id === id) { // if the day id match the request id
          return {...day, spots: day.spots + num}; // Take the mapped array "...day" and update the spots with the new num value
        }
        return day; // Return the day object for newDays
      });
      return {...prev, days: newDays}; // Update the days object into state
    });
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}