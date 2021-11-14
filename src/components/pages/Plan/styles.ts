import styled from "styled-components";
import Colors from "../../../styles/colors.json";

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 100vh;
  max-height: 100vh;
`;

export const Body = styled.div`
  flex: 1;
  overflow: hidden;
  height: 100%;
  display: flex;
  background-color: ${Colors.background};
  padding: 10px;

  form {
    margin: -20px auto;
    padding: 0 20px;
    width: 340px;

    h1 {
      margin-bottom: 25px;
    }

    div {
      display: flex;

      Button {
        margin-top: 15px;
      }

      Button + Button {
        margin-left: 10px;
      }
    }
  }

  > div {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 50px;
    max-width: 700px;
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ButtonContainer = styled.div`
  width: 150px;
  align-self: flex-end;
  flex-direction: column;
`;
