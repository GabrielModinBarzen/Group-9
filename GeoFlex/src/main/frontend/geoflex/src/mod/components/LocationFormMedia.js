import React, { Component } from 'react';
import axios from 'axios';
import FormData from 'form-data';

export default class LocationFormMedia extends Component {
    /**
     * class component to handle internal and external media upload 
     * constructor sets states of the component and binds methods
     */
    constructor(props) {
        super(props)

        this.state = {
            locationID: props.locationID,
            routeID: props.routeID,
            mediaExternal: props.locationMediaExternal,
            mediaUrl: props.locationMediaUrl,
            mediaType: props.locationMediaType,
            selectedFile: "",
            preview: false
        }

        this.handleSaveMediaLocation = this.handleSaveMediaLocation.bind(this);
        this.handleGetMediaLocation = this.handleGetMediaLocation.bind(this);
        this.onFieldChange = this.onFieldChange.bind(this);
        this.setParentMediaUrl = this.setParentMediaUrl.bind(this);
    }
    componentDidMount() {
        if (this.props.locationMediaUrl.length !== 0) {
            this.setState({ addMedia: true })
        }
    }


    onFileChange = event => {
        // Update the state
        this.setState({ selectedFile: event.target.files[0] });
        this.handleSaveMediaLocation(event);
    };

    setParentMediaUrl(fileUrl) {
        //Send the media file url to parent component method
        this.props.setParentMediaUrl(fileUrl)
    }

    handleGetMediaLocation() {
        //API-call to GET the url for an uploaded media file
        //Note that binding to is done inside the axios call in order to access "this".
        let url;
        if (this.state.routeID !== undefined) {
            url = '/moderator/route/file/retrieve?routeId=' + this.state.routeID
        } else {
            url = '/moderator/location/file/retrieve?locationId=' + this.state.locationID
        }

        var myData;
        var config = {
            method: 'get',
            url: url,
            headers: {}
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                myData = response.data
                this.props.setParentMediaUrl(myData);
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            }.bind(this));
    }

    handleSaveMediaLocation(event) {
        //API-call to upload a media file to the server

        event.preventDefault();

        var data = new FormData();
        let url;
        if (this.state.routeID !== undefined) {
            url = '/moderator/route/file/upload?routeId=' + this.state.routeID
        } else {
            url = '/moderator/location/file/upload?locationId=' + this.state.locationID
        }

        data.append('file', event.target.files[0]);

        var config = {
            method: 'post',
            url: url,
            headers: {
                "Content-Type": "multipart/form-data"
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));

            })
            .catch(function (error) {
                console.log(error);

            });
    }
    onFieldChange(event) {
        /**
         * passing on the event to parent class method
         */

        this.props.handleInputChange(event);
    }

    handlePreview(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        if (value === true) {
            if (this.props.locationMediaExternal === false) {
                this.handleGetMediaLocation();
                this.setState({ preview: value })
            } else {
                this.setState({ preview: value })
            }
        } else if (value === false) {
            this.setState({ preview: value })
        }
    }

    render() {
        /**
         * react component to handle rendering of html and other components
         */

        //html for upload media files
        let previewMedia = (<>
            <label className='col s2'>
                <input className='text-black'
                    name="preview"
                    checked={this.state.preview}
                    type="checkbox"
                    onChange={this.handlePreview.bind(this)}
                />
                <span>Förhandsgranska media</span>
            </label>
        </>)
        let uploadMedia = (<>
            <label>
                Lägg till media
                <div className="file-field input-field">
                    <div className="btn">
                        <span>Välj fil</span>
                        <input type="file"
                            className='blue lighten-4'
                            onChange={this.onFileChange}
                        />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate"
                            type="text"
                            name='locationMediaUrl'
                            value={this.props.locationMediaUrl}
                            onChange={this.onFieldChange} />
                    </div>
                </div>
                <p onClick={this.handleGetMediaLocation}>Spara bild</p>
            </label>
        </>)

        //html to add external mediaURL
        let externalMedia = (<>
            <label>
                Media url
                <input
                    className='grey lighten-3'
                    name="locationMediaUrl" type="text"
                    value={this.props.locationMediaUrl}
                    onChange={this.onFieldChange}
                />
            </label>
        </>)

        //html to preview an image uploaded or externally added
        let renderImage = (<>
            <div className="">
                <br />
                <br />
                <br />
                <img className="responsive-img"
                    src={this.props.locationMediaUrl}
                    alt="uppladdad bild" />
            </div>
        </>)
        //fixa src så den stämmer
        //html to preview an externally added video
        let renderExternalVideo = (<>
            <div className="">
                <br />
                <br />
                <br />
                <div className="video-container">
                    <iframe
                        title="external"
                        width={853}
                        height={480}
                        src={this.props.locationMediaUrl}
                        frameBorder="0"
                        allowFullScreen
                        sandbox="allow-scripts allow-same-origin allow-presentation">
                    </iframe>
                </div>
            </div>
        </>);

        //html to preview an uploaded video
        let renderInternalVideo = (<><div className="col 12">
            <br />
            <br />
            <br />
            <video className="responsive-video" controls>
                <p>Förhandsvy Media</p>
                <source src={this.state.mediaUrl} type="video/mp4" />
            </video>
        </div>
        </>)

        //html to render if no media is attached to the location
        let noMedia = (<>
            <p>Det finns ingen media kopplad till detta quiz.</p>
        </>)

        /* 
         * Depending on the location object settings for externally added or upploaded media and/or video/image,
         * renderInput and renderMediaPreview is assigned appropriate html to render.
         */
        let renderInput;
        let renderMediaPreview;

        if (this.props.locationMediaExternal === true) {
            if (this.props.locationMediaType === true) {

                renderInput = externalMedia;
                renderMediaPreview = renderImage;

            } else if (this.props.locationMediaType === false) {

                renderInput = externalMedia;
                renderMediaPreview = renderExternalVideo;

            }
        } else if (this.props.locationMediaExternal === false) {
            if (this.props.locationMediaType === true) {

                renderInput = uploadMedia;
                renderMediaPreview = renderImage

            } else if (this.props.locationMediaType === false) {

                renderInput = uploadMedia;
                renderMediaPreview = renderInternalVideo

            }
        }
        if (this.props.locationMediaUrl.length === 0) {
            renderMediaPreview = noMedia
        }

        //html to render media settings; lets the moderator choose between uploading a video/image file or add an external video/image file
        let mediaSettings = (<>
            <div className='row' style={{ 'marginLeft': '0rem' }}>
                <div className='col 10'>
                    <div className="switch row">
                        <h5>Media</h5>
                        <i>Välj att ladda upp ett eget klipp/bild, eller hämta från extern källa</i>
                        <br />
                        <br />
                        <label>
                            Egen
                            <input type="checkbox"
                                name="locationMediaExternal"
                                checked={this.props.locationMediaExternal}
                                onChange={this.onFieldChange}
                            />
                            <span className="lever"></span>
                            Extern
                        </label>
                    </div>
                </div>
            </div>
            <div className='row' style={{ 'marginLeft': '0rem' }}>
                <div className='col 10'>
                    <div className="switch row">
                        <i>Vilken typ av media är det?</i>
                        <br />
                        <label>
                            Video
                            <input type="checkbox"
                                name="locationMediaType"
                                checked={this.props.locationMediaType}
                                onChange={this.onFieldChange}
                            />
                            <span className="lever"></span>
                            Bild
                        </label>
                    </div>
                </div>
            </div>
        </>)
        if (this.state.preview === false) {
            return (<>
                {mediaSettings}
                {renderInput}
                {previewMedia}
            </>)
        } else if (this.state.preview === true)
            return (<>
                {mediaSettings}
                {renderInput}
                {previewMedia}
                {renderMediaPreview}
            </>)
    }
}