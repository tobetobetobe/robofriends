import { useState, useEffect } from 'react';
import './App.css';
import SearchBox from '../components/SearchBox';
import CardList from '../components/CardList';
import Scroll from '../components/Scroll';

function App() {
  const [robots, setRobots] = useState([]);
  const [searchfield, setSearchfield] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => {return response.json()})
    .then(users => {setRobots(users)});
  }, [])

  const onSearchChange = (event) => {
    setSearchfield(event.target.value);
  }

  const filteredRobots = robots.filter(robot => {
    return robot.name.toLowerCase().includes(
      searchfield.toLowerCase()
    );
  })
  
  return !robots.length ?
    <h1>Loading Robots...</h1> :
    (
      <div className='tc'>
        <h1 className='f1 ma3'>RoboFriends</h1>
        <SearchBox searchChange={onSearchChange} />
        <Scroll>
          <CardList robots={filteredRobots} />
        </Scroll>
      </div>  
    ); 
}


export default App;