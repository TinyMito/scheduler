export function getAppointmentsForDay(state, day) {
  // Find the object with selected day.
  const chosenDay = state.days.find(item => item.name === day);

  // If above result undefined = false return empty array.
  if (!chosenDay) {
    return [];
  }
  
  // Map the chosen day appointments array and return the match from the appointments object
  const listAppointments = chosenDay.appointments.map(appointmentId => {
    return state.appointments[appointmentId];
  });
  
  return listAppointments;
}

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
