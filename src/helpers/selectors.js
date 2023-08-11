// FUNCTION getAppointmentsForDay
export function getAppointmentsForDay(state, day) {
  // Find the object with selected day set into selectedDay
  const selectedDay = state.days.find(item => item.name === day);

  // If above result undefined = false return empty array.
  if (!selectedDay) {
    return [];
  }
  // Map the chosen day appointments array and return the match from the appointments object array
  const listAppointments = selectedDay.appointments.map(appointmentId => {
    return state.appointments[appointmentId]; // Return the appointments object on state
  });
  
  return listAppointments;
}

// FUNCTION getInterviewersForDay
export function getInterviewersForDay(state, day) {
  // Find the object with selected day.
  const selectedDay = state.days.find(item => item.name === day);

  // If above result undefined = false return empty array.
  if (!selectedDay) {
    return [];
  }

  // Map the chosen day appointments array and return the match from the interviewers object
  const listInterviewers = selectedDay.interviewers.map(interviewerId => {
    return state.interviewers[interviewerId];
  });
  
  return listInterviewers;
}

// FUNCTION getInterview
export function getInterview(state, interview) {

  // Return null if there is no interview 
  if (!interview) {
    return null;
  }

  // Select the appointment interviewer id to interviewers object
  const interviewer = state.interviewers[interview.interviewer];

  // Construct object
  const data = {
    student: interview.student,
    interviewer: {
      id: interviewer.id,
      name: interviewer.name,
      avatar: interviewer.avatar,
    },
  };

  return data;
}

