import { countryStatApi } from '../../API/service';
import { useData } from '../../redux/dataSlice';
import styled from '@emotion/styled';

// styled component
const Title = styled.h1`
  padding-top: 20px;
  margin-top: 0;
`;
const Head = styled.div`
  display: grid;
  gap: 20px;
  text-align: center;
  justify-content: center;
`;
const MenuSelect = styled.div`
  position: relative;
  display: block;
  min-width: 220px;
  width: 100%;
  margin-bottom: 20px;
`;
const Select = styled.select`
  width: 100%;
  max-width: 100%;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 14px 15px;
  font-family: 'Jura', sans-serif;
  font-weight: 700;
  line-height: 18px;
  color: rgba(255, 130, 6);
  cursor: pointer;
  outline: none;
`;
const Option = styled.option`
  position: relative;
  border-top: 1px solid rgba(224, 229, 231, 0.5);
  padding: 10px 15px;
  cursor: pointer;
  outline: none;
  border-radius: 10px;
`;

const Bar = () => {
  const { dataValue, getData, split } = useData();

  const handleChange = ({ target }) => {
    countryStatApi(target.value).then(data => {
      const country = data[0].country;
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
        totalCases,
        country,
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
    <Head>
      <Title>Statistic about COVID-19 in</Title>
      <MenuSelect>
        <Select name="country" onChange={handleChange}>
          <Option value="default">{dataValue.country}</Option>
          {dataValue.countryList.map(el => {
            return (
              <Option key={el + Date.now()} value={el}>
                {el}
              </Option>
            );
          })}
        </Select>
      </MenuSelect>
    </Head>
  );
};

export default Bar;
