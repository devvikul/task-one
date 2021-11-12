import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Team from "./Team";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateSquad = ({matchData}) => {
  
  const[team,setTeam] = useState([])
 
  let { topicId } = useParams();
  const [playersData, setPlayersData] = useState("");
  const [players,setPlayers] = useState({
  selected:true,
  Wk:[],
  BAT:[],
  ALLR:[],
  BWL:[],
  Total_Point:100,
  Team:[]
  })


//funtion for updating the state and restrictions and for add the item into the team

/// logic for cross checking
const teamBatCount =  players.Team.filter(batsman => batsman.role ==="Batsman");
const teamBowlCount =  players.Team.filter(batsman => batsman.role ==="Bowler");
const teamALLRCount = players.Team.filter(batsman => batsman.role ==="All-Rounder");
const teamWKCount = players.Team.filter(batsman => batsman.role ==="Wicket-Keeper");

//useEffect Hook
  useEffect(() => {
    axios
      .get(`http://localhost:8000/squad/players?match_id=${topicId}`)
      .then((res) => {
        if (res.status === 200) {
          setPlayersData(res.data);
        }
      });
  }, [topicId]);

// for the data of players team namex
const teamNames = playersData && [...new Set(playersData.map(data => data.team_name))]

// for restriction
const teamRestictionOne = (players.Team).filter(items=>items.team_name === teamNames[0]).length;
const teamRestictionTwo = (players.Team).filter(items=>items.team_name === teamNames[1]).length;
  
// player adding function
const addPlayer =(ply)=>{  
  if(ply.role === "Wicket-Keeper" && (players.Wk.length < 4 ? true : toast.error("you can not select more than three weecket keeper")) && players.Wk.length < 4 && players.Total_Point > ply.event_player_credit && (players.Team.length < 12 ? true : toast.error("you can not select more than 11 players")) && players.Team.length < 12){

    if(11  - (players.Team.length  ) <= 3 - teamBatCount.length ){
      if(teamBatCount.length===0){
        toast.error(`you have to select at least 3 batsman`)
      }else{
        toast.error(`you have to select  ${ 3- teamBatCount.length} more batsman`)
      }
    }
    else if(11  - (players.Team.length  )<= 1 - teamALLRCount.length ){
      toast.error(`you have to select at least 1 all rounder`)
    }
    else if(11  - (players.Team.length )<= 3 - teamBowlCount.length ){
      if(teamBowlCount.length===0){
        toast.error(`you have to select at least 3 Bowler`)
      }else{
        toast.error(`you have to select  ${ 3- teamBowlCount.length} more bowler`)
      }
    }else{
    const newPoint = players.Total_Point - ply.event_player_credit;
    const newWK = [...players.Wk, ply]
    const newTeam =  [...players.Team, ply]
    setPlayers({...players, Wk:newWK, Total_Point:newPoint, Team:newTeam, selected:false})
    }
    }  
  else if(ply.role === "Batsman" && (players.BAT.length < 6 ? true : toast.error("you can not selete more than Six Batsman")) && players.BAT.length < 6  && players.Total_Point > ply.event_player_credit && (players.Team.length < 12 ? true : toast.error("you can not select more than 11 players")) && players.Team.length < 12){
    
    if(11  - (players.Team.length  )<= 1 - teamALLRCount.length ){
      
      toast.error(`you have to select at least 1 all-rounder`)
    }
    else if(11  - (players.Team.length  )<= 3 - teamBowlCount.length ){
      if(teamBowlCount.length===0){
        toast.error(`you have to select at least 3 Bowler`)
      }else{
        toast.error(`you have to select  ${ 3- teamBowlCount.length} more bowler`)
      }
    }
    else if(11  - (players.Team.length  )<= 1 - teamWKCount.length ){
      toast.error(`you have to select at least 1 wicket keeper`)
    }
    else{ 
      const newPoint = players.Total_Point - ply.event_player_credit;
      const newBAT = [...players.BAT, ply]
      const newTeam =  [...players.Team, ply]
      setPlayers({...players, BAT:newBAT, Total_Point:newPoint, Team:newTeam})
    }
    }
  
  else if(ply.role === "All-Rounder" && (players.ALLR.length < 4 ? true : toast.error("you can not selete more than three weecket keeper")) && players.ALLR.length < 4 && players.Total_Point > ply.event_player_credit && (players.Team.length < 11 ? true : toast.error("you can not select more than 11 players")) && players.Team.length < 11){
    
    if(11  - (players.Team.length )<= 3 - teamBowlCount.length ){
      if(teamBowlCount.length===0){
        toast.error(`you have to select at least 3 Bowler`)
      }else{
        toast.error(`you have to select  ${ 3- teamBowlCount.length} more bowler`)
      }
    }
    else if(11  - (players.Team.length  )<= 1 - teamWKCount.length ){
      toast.error(`you have to select at least 1 wicket keeper`)	
    }else if(11  - (players.Team.length + ( 3- teamBatCount.length) )<= 3 - teamBatCount.length ){
      if(teamBatCount.length===0){
        toast.error(`you have to select at least 3 Batsman`)
      }else{
        toast.error(`you have to select  ${ 3- teamBatCount.length} more Batsman`)
      }
    }else{
    const newPoint = players.Total_Point - ply.event_player_credit;
    const newALLR = [...players.ALLR, ply]

    const newTeam =  [...players.Team, ply]
    setPlayers({...players, ALLR:newALLR, Total_Point:newPoint, Team:newTeam})
    }
    } 
  else if(ply.role === "Bowler" &&  (players.BWL.length < 6 ? true : toast.error("you can not selete more than three weecket keeper")) && players.BWL.length < 7  && players.Total_Point > ply.event_player_credit && (players.Team.length < 12 ? true : toast.error("you can not select more than 11 players")) && players.Team.length < 12 ){
    
    if(11  - (players.Team.length  )<= 1 - teamWKCount.length ){
      toast.error(`you have to select at least 1 wicket keeper`)
    }else if(11  - (players.Team.length )<= 3 - teamBatCount.length ){
      if(teamBatCount.length===0){
        toast.error(`you have to select at least 3 batsman`)
      }else{
        toast.error(`you have to select  ${ 3- teamBatCount.length} more batsman`)
      }
    }else if(11  - (players.Team.length )<= 1 - teamALLRCount.length ){
      toast.error(`you have to select at least 1 all rounder`)
    }else{
    const newPoint = players.Total_Point - ply.event_player_credit;
    const newBWL = [...players.BWL, ply]
    const newTeam =  [...players.Team, ply]
    setPlayers({...players, BWL:newBWL, Total_Point:newPoint, Team:newTeam})
  } 
  }    
}

  //for removing the player item from the updated state

const reomvePlayer =(ply)=>{  
  if(ply.role === "Wicket-Keeper" ){
    const newPoint = players.Total_Point + ply.event_player_credit;
    const newWK = [players.Wk].map(wks =>wks.id !== ply.id)
    const newTeam =  [...players.Team].filter(teamPlayer =>teamPlayer.player_id !== ply.player_id)
    setPlayers({...players,Total_Point:newPoint, Wk:newWK, Team:newTeam})
  }else if(ply.role === "Batsman" ){
    const newPoint = players.Total_Point + ply.event_player_credit;
    const newBAT = [players.BAT].map(bat =>bat.id !== ply.id)
    const newTeam =  [...players.Team].filter(teamPlayer =>teamPlayer.player_id !== ply.player_id)
    setPlayers({...players,Total_Point:newPoint, BAT:newBAT, Team:newTeam})
  }else if(ply.role === "All-Rounder" ){
    const newPoint = players.Total_Point + ply.event_player_credit;
    const newALLR = [players.ALLR].map(allr =>allr.id !== ply.id)
    const newTeam =  [...players.Team].filter(teamPlayer =>teamPlayer.player_id !== ply.player_id)
    setPlayers({...players,Total_Point:newPoint, ALLR:newALLR, Team:newTeam})
  }else if(ply.role === "Bowler" ){
    const newPoint = players.Total_Point + ply.event_player_credit;
    const newBWL = [players.BWL].map(bwl =>bwl.id !== ply.id)
    const newTeam =  [...players.Team].filter(teamPlayer =>teamPlayer.player_id !== ply.player_id)
    setPlayers({...players,Total_Point:newPoint, BWL:newBWL, Team:newTeam})
  }
  
}
  //match data 
  const matchListItem = matchData.cricket;
  //tabs data

  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className="player-list">
      <div className="league-heading ">
            <h2>Available Player's</h2>
             {players.Total_Point === 100 ?<p>Points : {players.Total_Point}</p> :<p>Points left : {players.Total_Point}</p>}
          </div>
      <div className="squad-container">
      <div className="container">
        <div className="bloc-tabs">
          <button
            className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(1)}
          >
            WK({teamWKCount.length}) 
          </button>
          <button
            className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(2)}
          >
            
            BAT({teamBatCount.length})
          </button>
          <button
            className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(3)}
          >
            ALLR({teamALLRCount.length})
          </button>
          <button
            className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(4)}
          >
            BWL({teamBowlCount.length})

          </button>
        </div>

        <div className="content-tabs">
          <div
            className={
              toggleState === 1 ? "content  active-content" : "content"
            }
          >
            {playersData &&
              playersData
                .filter(
                  (player) =>
                  (player.team_name === teamNames[0] ||  player.team_name === teamNames[1])  &&  
                    player.role === "Wicket-Keeper"
                )
                .map((player) => (
                  <div key={player.id} className="playdata background-content" >
                    <div className="image">
                      <img src={player.team_logo} alt="" />
                    </div>

                    <div className="player-about">
                      <h4>{player.name}</h4>
                      <h4>{player.team_name}</h4>
                    </div>
                    <div className="points">
                      <h4>{player.event_total_points}</h4>
                    </div>
                    <div className="points">
                      <h4>{player.event_player_credit}</h4>
                    </div>
                    {players.Team.map(item=> item.name).includes(player.name)?<div onClick={()=>reomvePlayer(player)}  className="points btn">
                      <a>unSelect</a>
                    </div>:<div  onClick={()=>addPlayer(player)} className="points btn">
                      <a>Select</a>
                    </div>}
                    
                    
                  </div>
                ))}
          </div>

          <div
            className={
              toggleState === 2 ? "content  active-content" : "content"
            }
          >
            {playersData &&
              playersData
                .filter(
                  (player) =>
                  (player.team_name === teamNames[0] ||  player.team_name === teamNames[1]) &&
                    player.role === "Batsman"
                )
                .map((player) => (
                  <div key={player.id} className="playdata background-content">
                    <div className="image">
                      <img src={player.team_logo} alt="" />
                    </div>
                    <div className="player-about">
                      <h4>{player.name}</h4>
                      <h4>{player.team_name}</h4>
                    </div>
                    <div className="points">
                      <h4>{player.event_total_points}</h4>
                    </div>
                    <div className="points">
                      <h4>{player.event_player_credit}</h4>
                    </div>
                    {players.Team.map(item=> item.name).includes(player.name)?<div onClick={()=>reomvePlayer(player)}  className="points btn">
                      <a>unSelect</a>
                    </div>:<div  onClick={()=>addPlayer(player)} className="points btn">
                      <a>Select</a>
                    </div>}
                  </div>
                ))}
          </div>

          <div
            className={
              toggleState === 3 ? "content  active-content" : "content"
            }
          >
            {playersData &&
              playersData
                .filter(
                  (player) =>
                  (player.team_name === teamNames[0] ||  player.team_name === teamNames[1]) &&
                    player.role === "All-Rounder"
                )
                .map((player) => (
                  <div key={player.id} className="playdata background-content">
                    <div className="image">
                      <img src={player.team_logo} alt="" />
                    </div>
                    <div className="player-about">
                      <h4>{player.name}</h4>
                      <h4>{player.team_name}</h4>
                    </div>
                    <div className="points">
                      <h4>{player.event_total_points}</h4>
                    </div>
                    <div className="points">
                      <h4>{player.event_player_credit}</h4>
                    </div>
                    {players.Team.map(item=> item.name).includes(player.name)?<div onClick={()=>reomvePlayer(player)}  className="points btn">
                      <a>unSelect</a>
                    </div>:<div  onClick={()=>addPlayer(player)} className="points btn">
                      <a>Select</a>
                    </div>}
                  </div>
                ))}
          </div>
          <div
            className={
              toggleState === 4 ? "content  active-content" : "content"
            }
          >
            {playersData &&
              playersData
                .filter(
                  (player) =>
                  (player.team_name === teamNames[0] ||  player.team_name === teamNames[1]) &&
                    player.role === "Bowler"
                )
                .map((player) => (
                  <div key={player.id} className="playdata background-content">
                    <div className="image">
                      <img src={player.team_logo} alt="" />
                    </div>
                    <div className="player-about">
                      <h4>{player.name}</h4>
                      <h4>{player.team_name}</h4>
                    </div>
                    <div className="points">
                      <h4>{player.event_total_points}</h4>
                    </div>
                    <div className="points">
                      <h4>{player.event_player_credit}</h4>
                    </div>  
                    {players.Team.map(item=> item.name).includes(player.name)?<div onClick={()=>reomvePlayer(player)}  className="points btn">
                      <a>unSelect</a>
                      
                    </div>:<div  onClick={()=>addPlayer(player)} className="points btn">
                      <a>Select</a>
                    </div>}
                  </div>
                  
                ))}
          </div>
          {/* { teams and create team on clicking the button */}
          <div className="teams">
          <Link to="/Teams">My Squads</Link>
          <Link to="/Teams">Proceed</Link> 
          <div style={{zIndex: "100"}}>
          <ToastContainer position="bottom-center"
          width="500px"
autoClose={2000} />
          </div>
          </div>
        </div>
      </div>
      <div className="team-comp">
         {players && <Team players={players}/>}
      </div>
      <div  style={{display: "none"}}>
         {players && <Team players={players}/>}
      </div>
      </div>
    </div>
  );
};


export default CreateSquad;
