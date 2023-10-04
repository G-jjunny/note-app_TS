import { FaEdit, FaTrash, FaTrashRestore } from "react-icons/fa";
import { NotesIconBox } from "../styles/styles";
import { RiInboxUnarchiveFill } from "react-icons/ri";
import { Note } from "../types/note";
import { Dispatch } from "@reduxjs/toolkit";
import { toggleCreateModal } from "../store/modal/modalSlice";
import {
  DeleteNote,
  RestoreNote,
  setArchiveNote,
  setEditNotes,
  setTrashNotes,
  unArchiveNote,
} from "../store/noteList/noteListSlice";

const getRelevanBtns = (type: string, note: Note, dispatch: Dispatch) => {
  const clickHandler = () => {
    dispatch(toggleCreateModal(true));
    dispatch(setEditNotes(note));
  };

  if (type === "archive") {
    return (
      <>
        <NotesIconBox
          onClick={() => dispatch(unArchiveNote(note))}
          data-info="Unarchive"
        >
          <RiInboxUnarchiveFill style={{ fontSize: "1rem" }} />
        </NotesIconBox>
        <NotesIconBox
          onClick={() => dispatch(setTrashNotes(note))}
          data-info="Delete"
        >
          <FaTrash style={{ fontSize: "1rem" }} />
        </NotesIconBox>
      </>
    );
  } else if (type === "trash") {
    return (
      <>
        <NotesIconBox
          onClick={() => dispatch(RestoreNote(note))}
          data-info="Restore"
        >
          <FaTrashRestore style={{ fontSize: "1rem" }} />
        </NotesIconBox>
        <NotesIconBox
          onClick={() => dispatch(DeleteNote(note))}
          data-info="Delete"
        >
          <FaTrash style={{ fontSize: "1rem" }} />
        </NotesIconBox>
      </>
    );
  } else {
    return (
      <>
        <NotesIconBox onClick={clickHandler} data-info="Edit">
          <FaEdit style={{ fontSize: "1rem" }} />
        </NotesIconBox>
        <NotesIconBox
          onClick={() => dispatch(setArchiveNote(note))}
          data-info="Archive"
        >
          <FaTrashRestore style={{ fontSize: "1rem" }} />
        </NotesIconBox>
        <NotesIconBox
          onClick={() => dispatch(setTrashNotes(note))}
          data-info="Delete"
        >
          <FaTrash style={{ fontSize: "1rem" }} />
        </NotesIconBox>
      </>
    );
  }
};

export default getRelevanBtns;
