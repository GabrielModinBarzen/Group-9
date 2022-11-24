import React from 'react';

export default function AdminModRoutes(props) {

  function handleDelete(){
    //tar bort en route från en moderator
    alert(props.moderator['user-id'] + " " + props.data.id)
  }
  return (
    <li className='row'>
        <p className='col s10'>{props.data.title}</p><i className="small material-icons col s2" onClick={handleDelete}>delete_forever</i>
    </li>
  )
}
