import React from "react";
import { Note } from "../../../types/note";
import { useAppDispatch } from "../../../hooks/reduc";
import { DeleteBox, FixedContainer } from "../Modal.styles";
import { Box } from "./ReadNoteModal.styles";
import { readNotes } from "../../../store/noteList/noteListSlice";
import { FaTimes } from "react-icons/fa";
import parse from "html-react-parser";

interface ReadNoteModalProps {
  note: Note;
  type: string;
}

const ReadNoteModal = ({ note, type }: ReadNoteModalProps) => {
  const dispatch = useAppDispatch();

  return (
    <FixedContainer>
      <Box style={{ backgroundColor: note.color }}>
        <DeleteBox
          className="readNote__close-btn"
          onClick={() => dispatch(readNotes({ type, id: note.id }))}
        >
          <FaTimes />
        </DeleteBox>
        <div className="readNote__title">{note.title}</div>
        <div className="readNote__content">{parse(note.content)}</div>
      </Box>
    </FixedContainer>
  );
};

export default ReadNoteModal;
