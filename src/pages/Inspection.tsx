import React, { useContext, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import { api } from '../services/api';

import styled from 'styled-components';
import { IInspection } from '../store/types';
import { StoreContext } from '../store';

import { useLocation } from 'react-router-dom';

export default function Inspection() {
  const { inspectionID } = useParams();
  const { setInspections } = useContext(StoreContext);
  const [filteredURls, setFilteredURLs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const {
    state: { keyword }
  } = useLocation();

  const { data } = useQuery<IInspection>(
    'inspection',
    async () => {
      const response = await api.get<IInspection>(`/crawl/${inspectionID}`);

      const oldInspectionsInCache = localStorage?.getItem('inspections') || '';
      const parsedOldInspectionsInCache: IInspection[] = JSON.parse(oldInspectionsInCache);

      let updatedInspection =
        parsedOldInspectionsInCache?.find(
          (inspection: IInspection) => inspection?.id === response?.data?.id
        ) || {};
      updatedInspection = { ...updatedInspection, status: response?.data?.status };

      const updatedInspections = parsedOldInspectionsInCache.map((inspection: IInspection) => {
        if (inspection?.id === response?.data?.id) return updatedInspection;
        return inspection;
      });

      setInspections(updatedInspections);

      localStorage?.setItem('inspections', JSON.stringify(updatedInspections));

      return response.data;
    },
    {
      staleTime: 1000 * 60 // 1 minuto
    }
  );

  useEffect(() => {
    if (!!data) setFilteredURLs(data?.urls || []);
  }, [data]);

  useEffect(() => {
    if (!!data) {
      const regexp = RegExp(searchTerm, 'ig');

      setFilteredURLs((data?.urls || []).filter((url: string) => url.match(regexp)));
    }
  }, [searchTerm]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event?.target || {};

    setSearchTerm(value);
  }

  return (
    <Container>
      <HeadlineContainer>
        <Stick status={data?.status} />
        <Headline children={`${keyword} - ${inspectionID}`} />
        <StatusCode status={data?.status} />
      </HeadlineContainer>

      <StatusContainer>
        <StatusLabel children="status: " />

        <StatusCode status="active" />
        <StatusLabel children="active" />

        <StatusCode status="done" />
        <StatusLabel children="done" />

        <StatusCode />
        <StatusLabel children="unknown" />
      </StatusContainer>

      <Subheading>
        Base-url: <BaseURL children="http://hiring.axreng.com" />
      </Subheading>

      <Input placeholder="Search..." value={searchTerm} onChange={handleChange} />

      {!filteredURls?.length ? (
        <List>
          <ListItem>
            <span>No URLs Found!</span>
          </ListItem>
        </List>
      ) : (
        <List>
          {filteredURls?.map((url: string) => (
            <ListItem key={url}>
              <Keyword to={url} target="_blank">
                {url?.replace('http://hiring.axreng.com', '')}
              </Keyword>
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  padding: 80px 150px;
`;

const HeadlineContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Headline = styled.span`
  font-size: 67px;
  line-height: 77px;

  letter-spacing: 0.01em;

  color: ${({ theme }) => theme.colors.text.primary};
  text-transform: uppercase;

  margin-right: 15px;
`;

const Subheading = styled.span`
  font-size: 18px;
  line-height: 29px;

  letter-spacing: 0.01em;

  color: ${({ theme }) => theme.colors.text.secondary};

  width: 100%;
  max-width: 460px;

  margin-top: 15px;
  margin-bottom: 50px;
`;

const BaseURL = styled.a.attrs({ href: 'http://hiring.axreng.com', target: '_blank' })`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: 700;
`;

const Stick = styled.div<{ status?: 'active' | 'done' | undefined }>`
  width: 5px;
  height: 80%;
  border-radius: 50px;
  background-color: ${(props) =>
    props?.status === 'active'
      ? props.theme.colors.statusCode.active
      : props?.status === 'done'
      ? props.theme.colors.statusCode.done
      : props.theme.colors.statusCode.unknown};
  margin-right: 15px;
`;

const List = styled.ul`
  width: 100%;
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
`;

const Keyword = styled(Link)`
  text-decoration: none;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const StatusContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-transform: uppercase;
  margin-top: 25px;
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

const Input = styled.input`
  background-color: ${({ theme }) => theme.colors.background.light};
  border: none;
  padding: 27px 24px;
  width: 100%;
  border-radius: 5px;

  font-size: 18px;
  color: ${({ theme }) => theme.colors.text.tertiary};

  outline: none;
  margin-bottom: 20px;
`;
