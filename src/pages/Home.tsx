import React from 'react'
import styled from 'styled-components'

import AddInspection from '../components/AddInspection'
import InspectionsList from '../components/InspectionsList'

export default function Home() {
  return (
    <Container>
      <AddInspection />

      <InspectionsList />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 80px 150px;
`