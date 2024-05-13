import { CountryTypes } from '@/types';
import Link from 'next/link';

function CountryCard({ country }: { country: CountryTypes }) {
  console.log('country', country);
  
  return (
    <Link
      href={`/country/${country.code}`}
      className='flex flex-col justify-center items-center h-20 w-20 border rounded-lg'
    >
      <h1>{country.name}</h1>
      <p className='text-3xl'>{country.emoji}</p>
    </Link>
  );
}

export default CountryCard;
