import React, { useEffect } from 'react';
import M from 'materialize-css';
import { Link } from 'react-router-dom';

export default function AdminModeratorOverviewList(props) {

    let url = "/admin/moderator/edit/" + props.data["user-id"];

    useEffect(() => {
        M.AutoInit();
        console.log(props.data.name)
    }, []);

    return (<>

        <li className='collection-item row'>

            <i className="material-icons col s1">person</i>
            <Link className="col s9 offset-s1" style={{ cursor: 'pointer', 'fontSize': '1rem', 'color': 'black' }} to={url} state={{ data: props.data }}>
                {props.data.name}
            </Link>
            <span className='col s1 right' style={{ cursor: 'pointer', 'fontSize': '2rem' }}><i className='material-icons right black-text' id={props.data["user-id"]} onClick={() => { props.deleteItem(props.data["user-id"]) }}>delete_forever</i></span>

        </li>

    </>
    )
}

/*
{[...selectItems].map((item) => (<AdminModAssignRoutes
                            key={item.id}
                            selectItem={item} />
                        ))}



                        {[...selectItems].map((item) => (<AdminModAssignRoutes
                                key={item.id}
                                selectItem={item} />
                            ))}


                            <div onClick={handleSelectOptions} >{props.data.name}</div>
            <div >
                <ul>
                    {[...routeData].map((route) => (

                        <AdminModRoutes key={(route.id)} data={route} moderator={props.data}/>
                    ))}
                </ul>
                <ul className="collapsible">
                    <li>
                        <div className="collapsible-header">Tilldela rutt</div>
                        <div className="collapsible-body">{[...selectItems].map((item) => (<AdminModAssignRoutes
                                key={item.id}
                                selectItem={item} />
                            ))}</div>
                    </li>
                </ul>
            </div>
*/