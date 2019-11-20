import React, { useState, useEffect } from "react";
import "./styles/AnnotationCard.css";

interface PassedProps {
  title: string;
  notes: Array<string>;
  closeAnnotationCard: (notes: Array<string>) => void;
}

const AnnotationCard: React.FC<PassedProps> = props => {
  const [notes, setUpdatedNotes] = useState<Array<string>>([]);
  const [textAreaValue, setTextAreaValue] = useState<string>("");

  useEffect(() => {
    const { notes } = props;
    if (notes.length > 0) {
      setUpdatedNotes(notes);
    }
  }, []);

  const createNoteList = () => {
    return notes.map((note, index) => {
      return (
        <li style={{ fontSize: ".75rem" }} key={index}>
          {note}
        </li>
      );
    });
  };

  const updateTextArea = (evt: any) => {
    setTextAreaValue(evt.target.value);
  };
  const clearTextArea = () => {
    setTextAreaValue("");
  };
  const handleCloseAnnotationCard = () => {
    const { closeAnnotationCard } = props;
    closeAnnotationCard(notes);
  };

  const handleSubmit = (evt: any) => {
    evt.preventDefault();
    const updatedNotes = [...notes];
    updatedNotes.push(textAreaValue);
    setUpdatedNotes(updatedNotes);
    clearTextArea();
  };

  return (
    <div className="annotation-card-container">
      <div className="annotation-card-heading">
        <div className="annotation-card-title">{props.title} </div>
        <div
          className="annotation-card-close"
          onClick={handleCloseAnnotationCard}
        >
          +
        </div>
      </div>
      <div className="annotation-card-info">
        <div className="annotation-card-data-title">Notes:</div>
        <div className="annotation-card-data">
          <ul>{notes.length > 0 ? createNoteList() : null}</ul>
        </div>
        <textarea
          className="annotation-card-input"
          rows={9}
          placeholder={"Add a feature note"}
          value={textAreaValue}
          onChange={updateTextArea}
        ></textarea>
      </div>
      <div className="annotation-card-btns">
        <button type="submit" onClick={handleSubmit}>
          Add Note
        </button>
        <button
          type="button"
          style={{ backgroundColor: "#cc0505" }}
          onClick={clearTextArea}
        >
          Clear Text
        </button>
      </div>
    </div>
  );
};

export default AnnotationCard;
