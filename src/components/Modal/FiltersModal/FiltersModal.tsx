import React from "react";
import { useAppDispatch } from "../../../hooks/reduc";
import { Box, Container, TopBox } from "./FilterModal.styles";
import { DeleteBox, FixedContainer } from "../Modal.styles";
import { toggleFiltersModal } from "../../../store/modal/modalSlice";
import { FaTimes } from "react-icons/fa";

interface FiltersModalProps {
  handleFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClear: () => void;
  filter: string;
}

const FiltersModal = ({
  handleFilter,
  handleClear,
  filter,
}: FiltersModalProps) => {
  const dispatch = useAppDispatch();

  return (
    <FixedContainer>
      <Container>
        <DeleteBox
          onClick={() => dispatch(toggleFiltersModal(false))}
          className="filters__close"
        >
          <FaTimes />
        </DeleteBox>
        <TopBox>
          <div className="filters__title">정렬</div>
          <small onClick={handleClear} className="filters__delete">
            CLEAR
          </small>
        </TopBox>
        <Box>
          <div className="filters_subtitle">PRIORITY</div>
          <div className="filters__check">
            <input
              type="radio"
              name="filter"
              id="low"
              value={"row"}
              checked={filter === "row"}
              onChange={(e) => handleFilter(e)}
            />
            <label htmlFor="low">Low to High</label>
          </div>
          <div className="filters__check">
            <input
              type="radio"
              name="filter"
              id="high"
              value={"high"}
              checked={filter === "high"}
              onChange={(e) => handleFilter(e)}
            />
            <label htmlFor="high">High to Low</label>
          </div>
        </Box>
        <Box>
          <div className="filters_subtitle">DATE</div>
          <div className="filters__check">
            <input
              type="radio"
              name="filter"
              id="new"
              value={"latest"}
              checked={filter === "latest"}
              onChange={(e) => handleFilter(e)}
            />
            <label htmlFor="new">Sort by Latest</label>
          </div>
          <div className="filters__check">
            <input
              type="radio"
              name="filter"
              id="create"
              value={"created"}
              checked={filter === "created"}
              onChange={(e) => handleFilter(e)}
            />
            <label htmlFor="create">Sort by Created</label>
          </div>
          <div className="filters__check">
            <input
              type="radio"
              name="filter"
              id="edit"
              value={"edited"}
              checked={filter === "edited"}
              onChange={(e) => handleFilter(e)}
            />
            <label htmlFor="edit">Sort by Edited</label>
          </div>
        </Box>
      </Container>
    </FixedContainer>
  );
};

export default FiltersModal;
