import React, { Component } from 'react'
import LastLocationUpdate from './LastLocationUpdate';
import LocationFormMedia from './LocationFormMedia';

export default class LastLocationForm extends Component {
  /**
   * class component to handle the last_location that will work as the GameFinish screen later on for users
   * constructor sets the state of the component and binds methods used
   */
  constructor(props) {
    super(props)

    this.state = {
      title: this.props.data.name,
      description: this.props.data.text_info,
      locationMediaUrl: this.props.data.media[0].mediaURL,
      locationMediaType: "",
      locationMediaExternal: this.props.data.media[0].externalMedia,
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleMediaOptions = this.handleMediaOptions.bind(this);
    this.setParentMediaUrl = this.setParentMediaUrl.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    /**
     * react method that allows logic before the render() method
     * helps to set state on certain parameters
     */
    if (this.props.data.media[0].mediaType === "video") {
      this.setState({ locationMediaType: false })
    } else if (this.props.data.media[0].mediaType === "image") {
      this.setState({ locationMediaType: true })
    } else {
      this.setState({ locationMediaType: false })
    }

    if (this.props.data.media[0].externalMedia === false) {

      this.setState({ locationMediaExternal: false })
    } else if (this.props.data.media[0].externalMedia === true) {
      this.setState({ locationMediaExternal: true })
    }
  }

  handleMediaOptions(mediaType, externalMedia) {
    /**
     * method to change state of locationMediaType and locatioinMediaExternal
     */
    this.setState({
      locationMediaType: mediaType,
      locationMediaExternal: externalMedia
    })
  }

  setParentMediaUrl(mediaPath) {
    /**
     * method to be sent to locationFormMedia 
     */
    if (this.state.locationMediaUrl === "") {
      this.setState({ locationMediaType: "video" })
    }
    this.setState({ locationMediaUrl: mediaPath })
  }

  handleInputChange(event) {
    /**
     * method to handle the various input fields and conditions for the media switches 
     */
    function youtubeUrlToEmbedUrl(youtubeUrl) {
      /**
       * function to handle a youtube url to make sure it will work 
       */
      
      // First, check if the URL is a valid YouTube URL
      var youtubeRegex = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.be)\/.+$/;
      if (!youtubeRegex.test(youtubeUrl)) {
        return false;
      }

      // If the URL is a valid YouTube URL, then extract the video ID
      var videoId = youtubeUrl.split("v=")[1];
      var ampersandIndex = videoId.indexOf("&");
      if (ampersandIndex !== -1) {
        videoId = videoId.substring(0, ampersandIndex);
      }

      // Use the video ID to create the embed URL
      var embedUrl = "https://www.youtube.com/embed/" + videoId;

      return embedUrl;
    }
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({ [name]: value });
    if (name === "title") {
      this.props.handleChange(value)
    }

    if ((name === "locationMediaExternal") || (name === "locationMediaType")) {
      this.setState({ locationMediaUrl: "" })
    }
    if (name === "locationMediaUrl") {
      if (this.state.locationMediaExternal === true) {
        if (this.state.locationMediaType === false) {
          let youtubeURL = youtubeUrlToEmbedUrl(value)
          if (youtubeURL !== false) {
            this.setState({ [name]: youtubeURL })
          }
        }
      }
    }

  }
  handleSubmit(event) {
    /**
     * method to handle saving the last location. builds the data object that is later sent to API call function
     */
    event.preventDefault();
    let mediaType;

    if (this.state.locationMediaType === false) {
      mediaType = "video"
    } else if (this.state.locationMediaType === true) {
      mediaType = "image"
    }
    if (this.state.locationMediaUrl.length === 0) {
      mediaType = "";
    }

    let data = {
      "location-update": {
        "location-id": this.props.data.location_id,
        "name": this.state.title,
        "text_info": this.state.description,
        "media": [{
          "mediaURL": this.state.locationMediaUrl,
          "mediaType": mediaType,
          "externalMedia": this.state.locationMediaExternal
        }],
        "content": []
      }
    }

    LastLocationUpdate(data);

  }

  render() {
    /**
     * react function that handles rendering in react class component
     */
    return (<>
      <form onSubmit={this.handleSubmit}>
        <fieldset>
          <label>
            Rubrik
            <input
              className='blue lighten-4'
              name="title" type="text"
              value={this.state.title}
              onChange={this.handleInputChange} />
          </label>
          <label>
            Innehåll
            <textarea
              className='blue lighten-4 materialize-textarea'
              name="description"
              value={this.state.description}
              onChange={this.handleInputChange} />
          </label>
          <LocationFormMedia
            locationID={this.props.data.location_id}
            locationMediaUrl={this.state.locationMediaUrl}
            locationMediaType={this.state.locationMediaType}
            locationMediaExternal={this.state.locationMediaExternal}
            handleInputChange={this.handleInputChange}
            handleMediaOptions={this.handleMediaOptions}
            setParentMediaUrl={this.setParentMediaUrl}
          />
        </fieldset>
        <input type="submit" value="Submit" />
      </form>
    </>
    )
  }
}
