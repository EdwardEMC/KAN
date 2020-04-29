import React, { Component } from "react";
import Wrapper from "../components/Wrapper";

class Description extends Component {
  render() {
    return (
      <Wrapper>
        <br></br>
        <h2 className="text-center"><span className="link">Know ‘a’ Neighbour (KAN)</span></h2>
        <br></br>
        <div className="text-center container">
          <p className="link">
            An application built around the premise of ending the isolation people feel in their day to day lives. Bring back the community spirit that was once abundant in the neighbourhood streets.
          </p>
          <br></br>
          <p className="link">
            These days people rarely know their next door neighbours let alone the ones down the street, KAN’s goal is to geographically get to know those around you and most importantly only when you want to!
          </p>
          <br></br>
          <p className="link">
            The application is built around a forum and map, the forum being for everyday enquiries that anyone can access, being able to post topics or comments. The map has two features the first is for places of interest so locals know where to go, whether it be a great coffee shop, nice playground or simply the best place to view the sunset. 
          </p>
          <br></br>
          <p className="link">
            The secondary feature of the map is to allow other users to see who is online, as the only way anyone can view or chat to a user is if they are online. If someone does not want to be contacted they can just delete their online marker and use the rest of the application as is.
          </p>
          <br></br>
          <p className="link">
            On logging out, the users online marker is automatically removed and any active chats and their message history deleted whilst any places of interest or forum posts stay until the user or admin decides otherwise.
          </p>
        </div>
      </Wrapper>
    )
  }
}
  
export default Description;