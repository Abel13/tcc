import styled from "styled-components";

import Colors from "../../../styles/colors.json";

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-height: 100vh;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;
  padding: 10px;

  form {
    margin: 0px auto;
    padding: 0px 20px;
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
  width: 100%;
  height: 100%;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  border-bottom: 1px solid ${Colors.gray};
  padding-bottom: 10px;
  margin-bottom: 10px;

  button {
    width: 150px;
  }

  strong {
    margin: 0 20px;
    color: ${Colors.gray};
    font-size: 20px;
  }
`;
