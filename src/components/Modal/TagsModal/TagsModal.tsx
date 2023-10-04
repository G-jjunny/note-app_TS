import { useAppDispatch, useAppSelector } from "../../../hooks/reduc";
import React, { useState } from "react";
import { DeleteBox, FixedContainer } from "../Modal.styles";
import { Box, StyledInput, TagsBox } from "./TagModal.styles";
import { toggleTagsModal } from "../../../store/modal/modalSlice";
import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";
import getStandardName from "../../../utils/getStandardName";
import { addTags, deleteTags } from "../../../store/tags/tagSlice";
import { v4 } from "uuid";
import { removeTags } from "../../../store/noteList/noteListSlice";
import { Tag } from "../../../types/tag";

interface TagsModalProps {
  type: string;
  addedTags?: Tag[];
  handleTags?: (tag: string, type: string) => void;
}

const TagsModal = ({ type, addedTags, handleTags }: TagsModalProps) => {
  const dispatch = useAppDispatch();
  const { tagsList } = useAppSelector((state) => state.tags);
  const [inputText, setInputText] = useState();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputText) return;

    dispatch(addTags({ tag: inputText.toLowerCase(), id: v4() }));
    setInputText("");
  };
  const deleteTagsHandler = (tag: string, id: string) => {
    dispatch(deleteTags(id));
    dispatch(removeTags({ tag }));
  };

  return (
    <FixedContainer>
      <Box>
        <div className="editTags__header">
          <div className="editTags__title">
            {type === "edit" ? "ADD" : "Edit"} Tags
          </div>
          <DeleteBox
            className="editTags__close"
            onClick={() => dispatch(toggleTagsModal({ type, view: false }))}
          >
            <FaTimes />
          </DeleteBox>
        </div>
        <form onSubmit={submitHandler}>
          <StyledInput
            type="text"
            value={inputText}
            placeholder="new tag.."
            onChange={(e) => setInputText(e.target.value)}
          />
        </form>
        <TagsBox>
          {tagsList.map(({ tag, id }) => (
            <li key={id}>
              <div className="editTags__tag">{getStandardName(tag)}</div>
              {type === "edit" ? (
                <DeleteBox onClick={() => deleteTagsHandler(tag, id)}>
                  <FaTimes />
                </DeleteBox>
              ) : (
                <DeleteBox>
                  {addedTags?.find(
                    (addedTag: Tag) => addedTag.tag === tag.toLowerCase()
                  ) ? (
                    <FaMinus onClick={() => handleTags!(tag, "remove")} />
                  ) : (
                    <FaPlus onClick={() => handleTags!(tag, "add")} />
                  )}
                </DeleteBox>
              )}
            </li>
          ))}
        </TagsBox>
      </Box>
    </FixedContainer>
  );
};

export default TagsModal;
