import styled from 'styled-components'

export const StyledButton = styled.button`
  background-color: transparent;
  outline: none;
  border: none;
  padding-bottom: 6px;
  border-bottom: 1.5px solid #000; 
  transition: border-bottom-color 0.3s linear;
  cursor: pointer;
  max-width: 100%;
  margin-top: 10px;

  &:hover {
    border-bottom-color: var(--color-auxiliar);
  }

  & span {
    font-size: 1.4rem;
  }

  & span, p {
    color: initial;
    transition: color 0.3s linear;
  }

  &:hover span{
    color: var(--color-auxiliar);
  }

   &:hover p{
    color: var(--color-auxiliar-light);
  }



` 