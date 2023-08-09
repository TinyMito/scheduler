export default function getAppointmentsForDay(state, day) {
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
  
  //console.log(listAppointments);
  return listAppointments;
}