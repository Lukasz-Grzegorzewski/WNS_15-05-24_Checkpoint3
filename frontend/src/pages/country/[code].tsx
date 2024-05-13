import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { CountryTypes } from '../../types';
import { queryCountry } from '@/graphql/country';

export default function CountryDetail() {
  const router = useRouter();
  const { code } = router.query;
  const { data, error } = useQuery<{ item: CountryTypes }>(queryCountry, {
    variables: { code },
  });
  const country = data ? data.item : null;

  return (
    data &&
    data.item && (
      <div className='flex justify-center items-center p-20'>
        <div className=' bg-red-100 p-10 shadow-xl'>
          <h1>{data.item.name}</h1>
          <p>{data.item.emoji}</p>
          <p>{data.item.continent.name}</p>
        </div>
      </div>
    )
  );
}
