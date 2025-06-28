import React, { useEffect, useState } from 'react';
import { Container, Button, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries, loadMore, filterByRegion } from '../store/countriesSlice';
import SliderComponent from '../components/SliderComponent';
import './HomePage.css';

function HomePage() {
  const dispatch = useDispatch();
  const { filteredCountries, visibleCount, status } = useSelector(state => state.countries);

  const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  return (
    <Container>
      <div className="header">
        <h2>WELCOME</h2>
        <Dropdown>
          <Dropdown.Toggle variant="secondary">
            Filter by Region
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {regions.map(region => (
              <Dropdown.Item key={region} onClick={() => dispatch(filterByRegion(region))}>
                {region}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <SliderComponent />

      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Failed to fetch countries.</p>}

      <div className="country-grid">
        {filteredCountries.slice(0, visibleCount).map(country => (
          <div className="country-card" key={country.name}>
            <img src={country.flag} alt={country.name} />
            <div className="country-card-body">
              <h5>{country.name}</h5>
              <p>{country.region}</p>
            </div>
          </div>
        ))}
      </div>

      {visibleCount < filteredCountries.length && (
        <div className="load-more-container">
          <Button onClick={() => dispatch(loadMore())}>Load More</Button>
        </div>
      )}

      <footer>
        Example@react.com <br />
        Copyright © 2025 React All rights reserved.
      </footer>
    </Container>
  );
}

export default HomePage;
