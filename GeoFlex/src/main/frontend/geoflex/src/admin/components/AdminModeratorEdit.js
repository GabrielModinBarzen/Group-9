import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

export default function AdminModeratorEdit() {
    const [moderatorRoutes, setModeratorRoutes] = useState([]);
    const [allRoutes, setAllRoutes] = useState([]);
    
    
    const location = useLocation();
    const navigate = useNavigate();

    const moderatorID = location.state.data["user-id"];

    

    const handleSelectOptions = () => {
        
        //

        
        
        //let routes = props.moderatorRoutesData;


        var leftUsers = allRoutes.filter(u => moderatorRoutes.findIndex(lu => lu.id === u.id) === -1);


        /*
                let allRoutes = props.allRoutesData;
                let availableRoutes = routeData.filter(val => !allRoutes.includes(val));
                
                availableRoutes.forEach(element => {
                    
                });
        
                setSelectItems(availableRoutes);
        */
        //setSelectItems(leftUsers)
    }
    useEffect(() =>{

        function getRouteForUser() {
            console.log("MOD ID: " + moderatorID);
            var config = {
                method: 'get',
                url: '/admin/route/user?user-id=' + moderatorID,
                headers: {
                }
            };
    
            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    setModeratorRoutes(response.data["routes-for-user"]);
                })
                .catch(function (error) {
                    console.log(error);
                    //dummy data som ska tas bort:
                    var assignedRouteExample = {
                        "routes-for-user": [
                            {
                                "code": 6960,
                                "description": "Postman edit test",
                                "locations": 17,
                                "id": 96,
                                "title": "Spongebob Squarepants",
                                "type": "INFO"
                            },
                            {
                                "code": 10501,
                                "description": "Quiz om Malmö",
                                "locations": 5,
                                "id": 97,
                                "title": "Malmö",
                                "type": "QUIZ"
                            }
                        ]
                    };
                    console.log("MODERATOR ROUTES DUMMY DATA");
                    setModeratorRoutes(assignedRouteExample["routes-for-user"]);
                });
    
        }
        function getAllRoutes() {
            var config = {
                method: "get",
                url: "/admin/routes",
                headers: {},
            };
    
            axios(config)
                .then(function (response) {
                    setAllRoutes(response.data);
                })
                .catch(function (error) {
                    console.log(error);
    
                    //Dev placeholderdata
                    const dummyData = [{ "title": "Test Quiz", "description": "This quiz is for testing purposes.", "type": "QUIZ", "id": "1", "code": "572748", "locations": 3 }, { "title": "Test Info", "description": "This info for testing purposes.", "type": "INFO", "id": "2", "code": "184471", "locations": 3 }, { "title": "Test 2", "description": "More testing tests ", "type": "INFO", "id": "4", "code": "295052", "locations": 0 }, { "title": "Num Location Test1", "description": "test, remove", "type": "INFO", "id": "5", "code": "447827", "locations": 0 }, { "title": "Num Location Test2", "description": "test, remove", "type": "INFO", "id": "6", "code": "625158", "locations": 3 }, { "title": "Num Location Test3", "description": "test, remove", "type": "INFO", "id": "7", "code": "782310", "locations": 4 }, { "title": "Test Quiz2E", "description": "This quiz is for testing purposes.", "type": "QUIZ", "id": "8", "code": "538027", "locations": 6 }, { "title": "Test Quizz", "description": "This quiz is for testing purposes.", "type": "QUIZ", "id": "10", "code": "983850", "locations": 6 }];
                    setAllRoutes(dummyData);
    
                });
        }

        getRouteForUser();
        getAllRoutes();
    }, [moderatorID])
    

  return (
    <div>
        <h1></h1>

    </div>
  )
}