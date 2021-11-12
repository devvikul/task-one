import NavBar from './components/Nav';
import MatchList from './components/matchList';
import LeagueList from './components/LeagueList';
import CreateSquad from './components/CreateSquad'
import  './styles/App.scss'
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom'
import {useState,useEffect} from 'react';
import axios from 'axios';


function App() {
  // state for match data
  const [matchData, setMatchData] = useState("");

  // useeffect for fetching data from API using axios library
  useEffect(() => {
    axios.get("http://localhost:8000/matches/upcoming-matches").then((res) => {
      if (res.status === 200) {
        setMatchData(res.data.matches);
      }
    });
  }, [setMatchData]);
  return (
      <Router>
            <div className="App">
              <NavBar/>
              <Switch>
                <Route exact path="/">
                  {matchData && <MatchList matchData={matchData}/>}
                </Route>
                <Route exact path="/league-list/:topicId">
                   <LeagueList />
                </Route>
                <Route exact path="/league-list/createsquad/:topicId">
                 {matchData &&  <CreateSquad  matchData={matchData} />}
                </Route>
              </Switch>  
            </div>
      </Router>
  );
}

export default App;
