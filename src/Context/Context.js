// import { createContext, useState,useEffect } from "react";
// import axios from "axios";


// export const MatcheDetails = createContext();

// const Context = ({children}) => {
//     const matches = [ useEffect(() => {
//         axios.get("http://localhost:8000/matches/upcoming-matches").then((res) => {
//           if (res.status === 200) {
//              return res.data.matches;
//           }
//         });
//       }, [])]
   
//     return  <MatcheDetails.Provider value={matches}>{children}</MatcheDetails.Provider> 
// }
 
// export default Context;