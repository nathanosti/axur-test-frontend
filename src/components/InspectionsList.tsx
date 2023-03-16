import React, { useContext } from 'react';

import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { StoreContext } from '../store';
import { IInspection } from '../store/types';

interface IInspectionList {
  mockedState?: IInspection[];
}

export default function InspectionsList({ mockedState }: IInspectionList) {
  const navigate = useNavigate();
  const { inspections } = useContext(StoreContext);

  function handleNavigate(inspection: IInspection) {
    navigate(`/${inspection.id}`, { state: { keyword: inspection.keyword } });
  }

  console.log({ mockedState });

  return !inspections?.length && !mockedState?.length ? (
    <></>
  ) : (
    <Container data-testid="inspection-list-wrapper">
      <Headline children="Recent Inspections" />

      <List>
        {inspections?.map((inspection: IInspection) => (
          <ListItem onClick={() => handleNavigate(inspection)} key={inspection.id}>
            <KeywordContainer>
              <Stick status={inspection.status} />
              <Keyword children={inspection.keyword} />
            </KeywordContainer>

            <StatusCode status={inspection.status} />
          </ListItem>
        ))}
      </List>

      <StatusContainer>
        <StatusLabel children="status: " />

        <StatusCode status="active" />
        <StatusLabel children="active" />

        <StatusCode status="done" />
        <StatusLabel children="done" />

        <StatusCode />
        <StatusLabel children="unknown" />
      </StatusContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 40%;
  height: 372px;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const Headline = styled.span`
  font-size: 35px;
  line-height: 77px;

  letter-spacing: 0.01em;

  color: ${({ theme }) => theme.colors.text.primary};

  width: 100%;
  max-width: 500px;
`;

const List = styled.ul`
  list-style: none;
  overflow-y: scroll;
`;

const ListItem = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin-bottom: 10px;

  padding: 15px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.background.secondary};

  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const KeywordContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const Keyword = styled.span``;

const Stick = styled.div<{ status?: 'active' | 'done' | undefined }>`
  width: 2px;
  height: 20px;
  border-radius: 50px;
  background-color: ${(props) =>
    props?.status === 'active'
      ? props.theme.colors.statusCode.active
      : props?.status === 'done'
      ? props.theme.colors.statusCode.done
      : props.theme.colors.statusCode.unknown};
`;

const StatusContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  color: ${({ theme }) => theme.colors.text.primary};
  text-transform: uppercase;
`;

const StatusLabel = styled.span``;

const StatusCode = styled.div<{ status?: 'active' | 'done' | undefined }>`
  width: 20px;
  height: 20px;
  border-radius: 100%;
  background-color: ${(props) =>
    props?.status === 'active'
      ? props.theme.colors.statusCode.active
      : props?.status === 'done'
      ? props.theme.colors.statusCode.done
      : props.theme.colors.statusCode.unknown};
`;
