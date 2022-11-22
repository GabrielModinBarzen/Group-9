package com.GeoFlex.GeoFlexBackend.Controllers.User;

import com.GeoFlex.GeoFlexBackend.Controllers.Admin.AdminCompanion;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller class to recieve requests from the front-end.
 * @see UserCompanion for further details
 */

@RestController
@RequestMapping("/user")
public class UserController {
    /**
     * Returns a complete route with locations and content by its code or id. (/user/route) GET
     * @return Response entity containing json the route.
     */

    @RequestMapping(value = "/route", method = RequestMethod.GET)
    public ResponseEntity<String> routeGet(@CookieValue(name = "authentication-token") String token,
                                           @CookieValue(name = "user-id") String userID, @RequestParam String routeCode) {
        UserCompanion userCompanion = new UserCompanion();
        return userCompanion.routeGet(routeCode);
    }

}
