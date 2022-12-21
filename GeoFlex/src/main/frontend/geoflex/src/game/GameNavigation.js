import React from 'react'
import Button from '../shared/Button'
import QRScanner from '../shared/QRScanner'
// import QRscanner from '../shared/QR'

export default function GameNavigation(props) {


  function QRScannerON(){
    props.setQRScanner(true)
  }

  function QRScannerOff(){
    props.setQRScanner(false)
  }
  function handleResult(result){
    console.log("handleResult")
    console.log(result.text)
    if(result.text === props.currentQuestion.location_id){
      console.log("IF")
      console.log(typeof result.text);
      console.log(props.currentQuestion.location_id)
      props.setUserArrived(true)
    }
    console.log("else")
      console.log(typeof result.text);
      console.log(props.currentQuestion.location_id)
  }

  if(props.QRScanner === false){
  return (
    <>
    <div className='row'>
        <div className='container white container-css'>
            <div className='row center-align'>
                <div className="col s12">
                  <div className='row'>
                    <div className='col s12'>
                      <h2 className='center align'>Vägbeskrivning</h2>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col s12'>
                      <p>
                          {props.currentQuestion.directions}
                      </p>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col s12'>
                      
                    </div>
                  </div>  
                </div>
            </div>
        </div>
    </div>
    <div className="row">
      <div className='container'>
      <Button text="Scanna QR" css="col s12" click={QRScannerON} icon={<i className="small material-icons right">qr_code_scanner</i>}/>
      </div> 
    </div>  
    </>
  )
  } else if (props.QRScanner === true){
    return(
      <>
      <QRScanner handleResult={handleResult}/>
      <div className="row">
      <div className='container'>
      <Button text="Vägbeskrivning" css="col s12" click={QRScannerOff} icon={<i className="small material-icons right">arrow_back</i>}/>
      </div> 
    </div>  
      </>
    )
  }
}
