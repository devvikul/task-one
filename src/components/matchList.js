import { Link } from "react-router-dom";

const MatchList = ({matchData}) => {
  //storing the match list into a variable
  const matchListItem = matchData.cricket;
  return (
    <div className="todays-match"> 
      <div className="match-list">
      <div className="matches">
        <h2>Upcominng matches</h2>
      </div>
        {/* // getting the information from an object and rendering it onto the screen */}
        {matchData &&
          matchListItem.map((match) => (
            <div className="match-preview" key={match.id}>
              <div className="matches-content background-content">
                <div className="Match-title">
                  <h3>{match.event_name}</h3>
                </div>
                <div className="team-names">
                  <div className="team-first">
                    <h3>{match.t1_short_name}</h3>
                    <img src={match.t1_image} alt="" width="150px" height="100px"/>
                  </div>
                  <div className="match-time">
                    <h4>{match.match_date}</h4>
                  </div>
                  <div className="team-second">
                    <img className="image" src={match.t2_image} alt="" width="150px" height="100px"/>
                    <h3>{match.t2_short_name}</h3>
                  </div>
                </div>
                <div className="enter-btn btn">
                      <Link to={`/league-list/${match.id}`}>Enter</Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MatchList;
