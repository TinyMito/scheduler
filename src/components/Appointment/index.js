import React from "react";
import "./styles.scss";
import Confirm from "./Confirm";
import Empty from "./Empty";
import Error from "./Error";
import Form from "./Form";
import Header from "./Header";
import Show from "./Show";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";

// APPOINTMENT MODULE
export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true))
  };

  function cancel() {
    transition(CONFIRM);
  };

  function confirm() {
    transition(DELETING, true);

    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true))
  }

  function edit() {
    transition(EDIT);

  }
  
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={edit}
          onDelete={cancel}
        />
      )}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
          message="Enter Student Name"
        />
      )}

      {mode === SAVING && (
        <Status
          message="Saving..."
        />
      )}

      {mode === DELETING && (
        <Status
          message="Deteting..."
        />
      )}

      {mode === CONFIRM && (
        <Confirm
          message="Delete the appointment?"
          onCancel={back}
          onConfirm={confirm}
        />
      )}

      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
          message="Enter Student Name"
        />
      )}

      {mode === ERROR_SAVE && (
        <Error
          message="Booking the Interview..."
          onClose={back}
        />
      )}

      {mode === ERROR_DELETE && (
        <Error
          message="Cancelling the Interview..."
          onClose={back}
        />
      )}
    </article>
  )
}