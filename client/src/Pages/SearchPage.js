
import { useEffect, useState } from 'react';
import ItemCard from '../Components/ItemCard';
import { useLocation } from 'react-router-dom';
import useFetchData from '../CustomHooks/useFetchData';

export default function SearchPage() {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('text');
    console.log('query:', query);
    const [searchResults, setSearchResults] = useState([]);
  
    const { data } = useFetchData(`http://localhost:5001/recipes/search?text=${encodeURIComponent(query)}`);
    console.log('search data:', data);
  
    useEffect(() => {
      if (data && data.success) {
        const filtered = data.searchRecipes; 
        console.log('filtered:', filtered);
        setSearchResults(filtered);
      }
    }, [query, data]);
    console.log('search results:', searchResults);
  
    return (
      <div>
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '8rem', marginRight: '3rem', gap: '4rem' }}>
          {searchResults.map((item) => (
            <ItemCard
              key={item._id}
              title={item.title}
              image={item.image}
              ingredients={item.ingredients}
              instructions={item.instructions}
            />
          ))}
        </div>
      </div>
    );
  }
  
  
