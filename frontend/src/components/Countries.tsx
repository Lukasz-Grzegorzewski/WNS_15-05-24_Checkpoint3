import { addCountry, queryCountries } from '../graphql/country';
import { CountinentTypes, CountryTypes } from '../types';
import { useMutation, useQuery } from '@apollo/client';
import CountryCard from './CountryCard';
import { useState } from 'react';
import { queryContinents } from '@/graphql/continent';

export default function Countries() {
  const { data: countriesAPI, error: errorCountries } = useQuery<{
    items: CountryTypes[];
  }>(queryCountries);
  const countries = countriesAPI ? countriesAPI.items : [];

  const { data: continentsAPI, error: errorContinents } = useQuery<{
    items: CountinentTypes[];
  }>(queryContinents);
  const continents = continentsAPI ? continentsAPI.items : [];

  const [countryName, setCountryName] = useState('');
  const [countryEmoji, setCountryEmoji] = useState('');
  const [continentCode, setContinentCode] = useState('');  

  const [addCountryMutation, { data, loading, error: mutationError }] =
    useMutation<{ item: CountryTypes }>(addCountry);

  const handlePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!countryName || !countryEmoji || !continentCode) {
      return;
    }
    
    const id = parseInt(continentCode, 10);
    
    try {
      await addCountryMutation({
        variables: {
          data: {
            code: countryName.slice(0, 3).toUpperCase(),
            name: countryName,
            emoji: countryEmoji,
            continent: { id },
          },
        },
      });
      alert('Country added successfully!');
      setCountryName('');
      setCountryEmoji('');
      setContinentCode('');
    } catch (err) {
      console.error('Error adding country:', err);
      alert('Failed to add country');
    }
  };

  return (
    <div className='flex flex-col justify-center items-center pt-10'>
      <div className='p-5 bg-red-100 shadow-lg'>
        <h2 className='text-center pb-7'>Add new country</h2>
        <form className='flex gap-5' onSubmit={handlePost}>
          <input
            className='p-3'
            type='text'
            placeholder='Name'
            value={countryName}
            onChange={(e) => setCountryName(e.target.value)}
          />
          <input
            className='p-3'
            type='text'
            placeholder='Emoji'
            value={countryEmoji}
            onChange={(e) => setCountryEmoji(e.target.value)}
          />
          <select
            value={continentCode}
            onChange={(e) => setContinentCode(e.target.value)}
          >
            <option value=''>Code</option>
            {continents.map((continent) => {
              return (
                <option key={continent.id} value={continent.id}>
                  {continent.name}
                </option>
              );
            })}
          </select>
          <button>Add</button>
        </form>
      </div>
      <div className='flex flex-row justify-center p-10 gap-5'>
        {countries.map((country) => {
          return (
            <div key={country.id}>
              <CountryCard country={country} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
