import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss";

export default function InterviewerList(props) {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {props.interviewers.map(x => (
          <InterviewerListItem 
            key={x.id}
            id={x.id}
            name={x.name}
            avatar={x.avatar}
            selected={x.id === props.interviewer}
            setInterviewer={props.setInterviewer}
          />
        ))}
      </ul>
    </section>
  )
}