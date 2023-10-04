import { createSlice } from "@reduxjs/toolkit";
import { Note } from "../../types/note";
import notes from "../../noteData";

interface NoteState {
  mainNotes: Note[];
  archiveNotes: Note[];
  trashNotes: Note[];
  editNotes: null | Note;
}

const initialState: NoteState = {
  mainNotes: [...notes],
  archiveNotes: [],
  trashNotes: [],
  editNotes: null,
};

enum noteType {
  mainNotes = "mainNotes",
  archiveNotes = "archiveNotes",
  trashNotes = "trashNotes",
}
const NoteListSlice = createSlice({
  name: "noteList",
  initialState,
  reducers: {
    setMainNotes: (state, { payload }) => {
      // 해당 노트를 수정
      if (state.mainNotes.find(({ id }) => id === payload.id)) {
        state.mainNotes = state.mainNotes.map((note) =>
          note.id === payload.id ? payload : note
        );
      } else {
        // 노트를 새롭게 생성
        state.mainNotes.push(payload);
      }
    },
    setTrashNotes: (state, { payload }) => {
      state.mainNotes = state.mainNotes.filter(({ id }) => id !== payload.id);
      state.archiveNotes = state.archiveNotes.filter(
        ({ id }) => id !== payload.id
      );
      // filter를 이용해 제거 후 trashnote로 옮김
      state.trashNotes.push({ ...payload, isPinned: false });
    },
    setArchiveNote: (state, { payload }) => {
      // archiveNotes로 옮김
      state.mainNotes = state.mainNotes.filter(({ id }) => id !== payload.id);
      state.archiveNotes.push({ ...payload, isPinned: false });
    },
    unArchiveNote: (state, { payload }) => {
      // archiveNote에서 mainNotes로 이동
      state.archiveNotes = state.archiveNotes.filter(
        ({ id }) => id !== payload.id
      );
      state.mainNotes.push(payload);
    },
    RestoreNote: (state, { payload }) => {
      // trashNotes에서 mainNotes로 이동
      state.trashNotes = state.trashNotes.filter(({ id }) => id !== payload.id);
      state.mainNotes.push(payload);
    },
    DeleteNote: (state, { payload }) => {
      // TrashNotes에서 해당 note 삭제(완전 삭제)
      state.trashNotes = state.trashNotes.filter(({ id }) => id !== payload.id);
    },
    setPinnedNotes: (state, { payload }) => {
      // pin 비/활성화
      state.mainNotes = state.mainNotes.map((note) =>
        note.id === payload.id ? { ...note, isPinned: !note.isPinned } : note
      );
    },
    setEditNotes: (state, { payload }) => {
      // editNote에 해당 객체하나 할당
      state.editNotes = payload;
    },
    readNotes: (state, { payload }) => {
      const { type, id } = payload;
      const setRead = (notes: noteType) => {
        state[notes] = state[notes].map((note: Note) =>
          note.id === id ? { ...note, isRead: !note.isRead } : note
        );
      };
      if (type === "archive") {
        setRead(noteType.archiveNotes);
      } else if (type === "trash") {
        setRead(noteType.trashNotes);
      } else {
        setRead(noteType.mainNotes);
      }
    },
    removeTags: (state, { payload }) => {
      state.mainNotes = state.mainNotes.map((note) => ({
        ...note,
        tags: note.tags.filter(({ tag }) => tag !== payload.tag),
      }));
    },
  },
});

export const {
  removeTags,
  setMainNotes,
  setTrashNotes,
  setArchiveNote,
  RestoreNote,
  DeleteNote,
  unArchiveNote,
  setPinnedNotes,
  setEditNotes,
  readNotes,
} = NoteListSlice.actions;

export default NoteListSlice.reducer;
