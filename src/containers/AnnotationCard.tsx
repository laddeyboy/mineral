import React, { useState } from "react";
import "./styles/AnnotationCard.css";

interface PassedProps {
  title: string;
  notes: Array<string>;
  updateNotes: (note: string) => void;
  closeAnnotationCard: () => void;
}

const AnnotationCard: React.FC<PassedProps> = props => {
  const [textAreaValue, setTextAreaValue] = useState<string>("");

  const createNoteList = () => {
    const { notes } = props;
    if (notes) {
      return notes.map((note, index) => {
        return (
          <li style={{ fontSize: ".75rem" }} key={index}>
            {note}
          </li>
        );
      });
    }
  };

  const updateTextArea = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(evt.target.value);
  };
  const clearTextArea = () => {
    setTextAreaValue("");
  };
  const handleCloseAnnotationCard = () => {
    const { closeAnnotationCard } = props;
    closeAnnotationCard();
  };

  const handleSubmit = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    const { updateNotes } = props;
    updateNotes(textAreaValue);
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
          <ul>{createNoteList()}</ul>
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
