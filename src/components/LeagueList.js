import {useParams, useLocation} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const LeagueList = () => { 
  
    let { topicId } = useParams();
    const [leagueData, setLeagueData] = useState('');
  
    useEffect( () =>{
      axios.get(`http://localhost:8000/leagues?match_id=${topicId}`) 
    .then(res=>{
      if(res.status === 200){ setLeagueData(res.data)}
    })
  },[topicId]
);
 // getting a league into a variable
const leagues = leagueData.leagues;

    return (
      <div className="leaguelist">
          <div className="league-heading ">
            <h2>Available League's</h2>
            <div className="button btn">
              <Link to="/">matches</Link>
            </div>
          </div>
          { leagues && leagues.map((league) => (
          <div className="league-preview background-content" key={league.id}>
            <div className="league-name">
              <h2>{league.display_name}</h2>
            </div>
            <div className="league-content">
              <div className="first-section">
                  <div className="wining-amount">
                    <p>Winning Amount : {league.winning_amount}</p>
                  </div>
                  <div className="Entry-amount">
                    <p>Entry Fee : {league.entry_fee}</p>
                  </div>
              </div>
              <div className="second-section">
                  <div className="total-spot">
                    <p>Total spot : {league.max_limit}</p>
                  </div>
                  <div className="spot-left">
                    <p>Spot left : {league.max_limit - league.total_count}</p>
                  </div>
              </div>
              <div className="Third-section">
                  <div className="winners">
                    <p>Total winners : {league.winning_criteria}</p>
                  </div>
                  <div className="entry-btn btn">
                    <Link to={`/league-list/createsquad/${league.match_id}`}>Enter</Link>
                  </div>
              </div>
            </div>
            
          </div>
        ))}
        <div className="teams">
          <Link to="/Teams">My Squads</Link>
          <Link to={`/league-list/createsquad/${topicId}`}>Create Squad</Link>
        </div>
      </div>
    );
  };
  
  export default LeagueList;
  