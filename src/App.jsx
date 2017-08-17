import React, {Component} from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from  './Profile';
import Gallery from './Gallery';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: '',
      artist: null,
      tracks: []
    };

  }



  search() {

    console.log('this.state', this.state);
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    let fetchUrl = `${BASE_URL}q=${this.state.query}&type=Artist&limit=1`;
    const ALBUM_URL ='https://api.spotify.com/v1/artists/';
    const API_TOCKEN = 'BQCUm7YUMc5nM1lccNBBp3IGKMdsYWxeB2m21jr3KiqI6OlJslGPq6OLJISxBujOphTWVBvLa-pcIBUCJjG1uWOj0POa5MG6gzhjVeAAdVhBmNnUi4rNG97v0Lr-LTe03IgroGpABak8hIOiLmdtt70w6aH84w';
    let artistId = '';

    var mySpotifyOptions = {
      method: 'GET',
      headers: {
	'Authorization': 'Bearer ' + API_TOCKEN
      },
      mode: 'cors',
      cache: 'default'
    };

    console.log('FETCH_URL',fetchUrl);


    fetch(fetchUrl,mySpotifyOptions)
      .then(response => response.json())
      .then(json => {
	const  artist = json.artists.items[0];
       	this.setState({artist})

	fetchUrl = `${ALBUM_URL}${artist.id}/top-tracks?country=DE&`;

	fetch(fetchUrl,mySpotifyOptions)
	  .then(response => response.json())
	  .then(json => {
	    
	    let {tracks} = json;
	    console.log('artist\'s top tracks: ', {tracks});
	    this.setState({tracks});
	    
	  });

      });
  }


  render() {
    return (
      <div className="App">
	<div className="App-title"> Music Master</div>

	<FormGroup>
	  <InputGroup>  
	    <FormControl
	      type="text"
	      placeholder="Search for an Artist"
	      value={this.state.query}
	      onChange={event => {this.setState({query: event.target.value})}}
	      onKeyPress={event => {
		  if(event.key === 'Enter') {
		    this.search();
		  }
	      }
	      }
	    />
	    <InputGroup.Addon onClick={() => this.search()}>
	      <Glyphicon glyph="search"></Glyphicon>
	    </InputGroup.Addon>

	  </InputGroup>
	</FormGroup>

	{
	  this.state.artist !==null ?
	  <div>
	    <Profile
	      artist={this.state.artist}
	    />
	    <Gallery
	    tracks={this.state.tracks}
	    />
	    
	    
	  </div>
	  : <div></div>
	}
	
      </div>
    )
  }
}


export default App;
