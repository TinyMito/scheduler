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
        setState({...state, appointments})
      })

  }

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
        setState({...state, appointments})
      })
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}