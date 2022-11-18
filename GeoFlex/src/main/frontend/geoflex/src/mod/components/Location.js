import React, { useEffect } from 'react';
import M from 'materialize-css';
import LocationForm from './LocationForm';
import ModEditLocation from '../ModEditLocation';

export default function Location(props) {
    /**
     * renders html for the locations based on their order
     * Location.js renders each single location-object received
     * all properties and functions is mapped through props.
     */

    const currentValue = props.data;

    const end = props.dataLength - 1;
    const currentIndex = props.data.location_index;

    const firstLocation = () => {
        /**
         * renders html for the first location.
         */
        return (
            <>
                <li className='row'>
                        <div className='col s2'>
                            <i className="material-icons col s1">place</i>
                        </div>
                        <div className='col s8'>
                            <span className=''>
                                {props.data.name} Här hamnar titeln på en location. vi kan flytta en location upp eller ner samt ta bort.
                            </span> 
                        </div>  
                        <div className='col s2'>
                                
                        </div>
                        <div className='col s1 offset-s2'>
                            <i  style={{cursor: 'pointer', 'fontSize': '2rem', 'padding': '1rem', 'line-height': '1.5'}} className='material-icons black-text col s1' onClick={() => { props.deleteLocation(props.data.id) }}>delete_forever</i>
                        </div>
                        <div className='col s7 offset-s1'>
                            <i  style={{cursor: 'pointer', 'fontSize': '2rem', 'border-bottom': '0', 'padding': '1rem'}} className='material-icons black-text collapsible-header col s1'>edit</i>
                        </div>
                        <div className='col s1'>
                            <i style={{cursor: 'pointer', 'fontSize': '2rem', 'padding': '1rem', 'line-height': '2'}} className='material-icons right black-text large' onClick={() => { props.swapLocationsDown(props.data.id) }}>keyboard_arrow_down</i>
                        </div>
                        <div className='collapsible-body col s10'>
                            <ModEditLocation data={currentValue} />
                        </div>
                        <div className="divider col s10 offset-s1"></div>    
                </li>
            </>
        )
    }

    const middleLocations = () => {
        /**
         * renders html for all locations between the "first location" and the "end location"
         */
        return (
            <>
                <li className='row'>
                    <div className='col s2'>
                        <i className="material-icons col s1">place</i>
                    </div>
                    <div className='col s8'>
                        <span className=''>
                            {props.data.name} Här hamnar titeln på en location. vi kan flytta en location upp eller ner samt ta bort.
                        </span> 
                    </div>  
                    <div className='col s2'>
                        <i style={{cursor: 'pointer', 'fontSize': '2rem', 'padding': '1rem', 'line-height': '1.5'}} className='material-icons right black-text large' onClick={() => { props.swapLocationsUp(props.data.id) }}>keyboard_arrow_up</i>
                    </div>
                    <div className='col s1 offset-s2'>
                        <i  style={{cursor: 'pointer', 'fontSize': '2rem', 'padding': '1rem', 'line-height': '1.5'}} className='material-icons black-text col s1' onClick={() => { props.deleteLocation(props.data.id) }}>delete_forever</i>
                    </div>
                    <div className='col s7 offset-s1'>
                        <i  style={{cursor: 'pointer', 'fontSize': '2rem', 'border-bottom': '0', 'padding': '1rem'}} className='material-icons black-text collapsible-header col s1'>edit</i>
                    </div>
                    <div className='col s1'>
                        <i style={{cursor: 'pointer', 'fontSize': '2rem', 'padding': '1rem', 'line-height': '2'}} className='material-icons right black-text large' onClick={() => { props.swapLocationsDown(props.data.id) }}>keyboard_arrow_down</i>
                    </div>
                    <div className='collapsible-body col s12'>
                        <ModEditLocation data={currentValue} />
                    </div>
                    <div className="divider col s10 offset-s1"></div>
                </li>
            </>

        )
    }

    const endLocation = () => {
        /**
         * renders hmtl for the end location
         */
        return (
            <>
                <li className='row'>
                    <section className=''>
                        <i className="material-icons col s1">place</i>
                        <span className='col s8'>
                            {props.data.name} Här hamnar titeln på en location. vi kan flytta en location upp eller ner samt ta bort.
                        </span>
                        <span className='col s1 right' style={{cursor: 'pointer', 'fontSize': '2rem'}}>
                            <i className='material-icons right black-text' onClick={() => { props.deleteLocation(props.data.id) }}>delete_forever</i>
                        </span>
                        <span className='col s1 right' style={{cursor: 'pointer', 'fontSize': '2rem'}}>
                            <i className='material-icons right black-text' onClick={() => { props.swapLocationsDown(props.data.id) }}>keyboard_arrow_down</i>
                        </span>
                        <span className='col s1 right' style={{cursor: 'pointer', 'fontSize': '2rem'}}>
                            <i className='material-icons collapsible-header'>edit</i>
                        </span>
                    </section>
                    <section className='collapsible-body col s12'>
                        <ModEditLocation data={currentValue} />
                    </section>
                </li>
            </>
        )
    }

    const lastLocation = () => {
        /**
         * returns html for the last location
         */
        return (<>
             <li className='row'>
                <div className='col s2'>
                    <i className="material-icons col s1">place</i>
                </div>
                <div className='col s8'>
                    <span className=''>
                        {props.data.name} Här hamnar titeln på en location. vi kan flytta en location upp eller ner samt ta bort.
                    </span> 
                </div>  
                <div className='col s2'>
                    <i style={{cursor: 'pointer', 'fontSize': '2rem', 'padding': '1rem', 'line-height': '1.5'}} className='material-icons right black-text large' onClick={() => { props.swapLocationsUp(props.data.id) }}>keyboard_arrow_up</i>
                </div>
                <div className='col s1 offset-s2'>
                    <i  style={{cursor: 'pointer', 'fontSize': '2rem', 'padding': '1rem', 'line-height': '1.5'}} className='material-icons black-text col s1' onClick={() => { props.deleteLocation(props.data.id) }}>delete_forever</i>
                </div>
                <div className='col s7 offset-s1'>
                    <i  style={{cursor: 'pointer', 'fontSize': '2rem', 'border-bottom': '0', 'padding': '1rem'}} className='material-icons black-text collapsible-header col s1'>edit</i>
                </div>
                <div className='col s1'>

                </div>
                <div className='collapsible-body col s12'>
                    <ModEditLocation data={currentValue} />
                </div>
                <div className="divider col s10 offset-s1"></div>    
            </li>
        </>)
    }

    if (currentIndex === "1") {
        return (
            firstLocation()
        )
    } else if (currentIndex === end.toString()) {
        return (
            endLocation()
        )
    } else if (currentIndex === undefined) {
        return (
            lastLocation()
        )
    } else {
        return (
            middleLocations()
        )
    }

}