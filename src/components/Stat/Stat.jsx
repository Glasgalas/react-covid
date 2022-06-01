import { useData } from '../../redux/dataSlice';
import { listCountryApi, countryStatApi } from '../../API/service';
import { useEffect } from 'react';
import styled from '@emotion/styled';

// styled component
const Button = styled.button`
  margin: 16px;
  padding: 12px;
  background-color: orange;
  border-radius: 4px;
  border: none;
  &:hover {
    color: white;
    cursor: pointer;
    box-shadow: 10px 5px 5px #f55f07;
  }
`;
const Container = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(2, 1fr);

  text-align: center;
  justify-content: center;
  margin-bottom: 20px;

  @media (min-width: 320px) and (max-width: 767px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
const Item = styled.div`
  border: 5px solid #eeedf1;
  border-radius: 10px;
`;
const Text = styled.p`
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 0;
  padding-bottom: 20px;
`;
const Date = styled.span`
  font-family: 'Big Shoulders Display', cursive;
`;
const Numbers = styled.span`
  font-family: 'Black Ops One', cursive;
`;

const Stat = () => {
  const { dataValue, getData, getDataAll, split } = useData();

  // for loading page
  useEffect(() => {
    fetch();
  }, []);

  // fetching country list for select and data
  const fetch = () => {
    listCountryApi().then(data => {
      const countryList = data;
      countryList.sort();
      const result = {
        countryList,
      };
      getDataAll(result);
    });
    countryStatApi('all').then(data => {
      const totalCases = split(data[0].cases.total);
      const day = data[0].day;
      const activeCases = split(data[0].cases.active);
      const totalDeath = split(data[0].deaths.total);
      const criticalCases = split(data[0].cases.critical);
      const recovered = split(data[0].cases.recovered);
      const newCases = split(data[0].cases.new);
      const newDeaths = split(data[0].deaths.new);
      const totalTests = split(data[0].tests.total);

      const result = {
        country: 'world',
        totalCases,
        day,
        activeCases,
        totalDeath,
        criticalCases,
        recovered,
        newCases,
        newDeaths,
        totalTests,
      };
      getData(result);
    });
  };

  return (
    <div>
      <Button
        onClick={() => {
          fetch();
        }}
      >
        Get world statistics
      </Button>
      <Container>
        <Item>
          <Text>Total: </Text>
          <Text>
            <Numbers>{dataValue.totalCases} </Numbers> people
          </Text>
        </Item>
        <Item>
          <Text>Active cases:</Text>
          <Text>
            <Numbers>
              {dataValue.activeCases ? dataValue.activeCases : 0}{' '}
            </Numbers>
            people
          </Text>
        </Item>
        <Item>
          <Text>Critical:</Text>
          <Text>
            <Numbers>
              {dataValue.criticalCases ? dataValue.criticalCases : 0}{' '}
            </Numbers>
            people
          </Text>
        </Item>
        <Item>
          <Text>Deaths: </Text>
          <Text>
            <Numbers>
              {dataValue.totalDeath ? dataValue.totalDeath : 0}{' '}
            </Numbers>
            people
          </Text>
        </Item>
      </Container>
      <Container>
        <Item>
          <Text>Recovered:</Text>
          <Text>
            <Numbers>{dataValue.recovered ? dataValue.recovered : 0} </Numbers>
            people
          </Text>
        </Item>
        <Item>
          <Text>Tests:</Text>
          <Text>
            <Numbers>
              {dataValue.totalTests ? dataValue.totalTests : 0}{' '}
            </Numbers>
            people
          </Text>
        </Item>
      </Container>
      <Container>
        <Item>
          <Text>New cases:</Text>
          <Text>
            <Numbers>{dataValue.newCases ? dataValue.newCases : 0} </Numbers>
            people
          </Text>
        </Item>
        <Item>
          <Text>New deaths:</Text>
          <Text>
            <Numbers>{dataValue.newDeaths ? dataValue.newDeaths : 0} </Numbers>
            people
          </Text>
        </Item>
      </Container>

      <Text>
        Last update: <Date>{dataValue.day}</Date>
      </Text>
    </div>
  );
};

export default Stat;
