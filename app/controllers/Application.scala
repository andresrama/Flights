package controllers

import models._
import org.geotools.measure._
import com.github.nscala_time.time.Imports._
import play.api.mvc._
import play.api.routing.JavaScriptReverseRouter
import play.api.libs.json._
import models.UserGroup.groupFormat
import sorm.Persisted

class Application extends Controller {

  def index = Action { implicit request =>
    Ok(views.html.index("Your new application is ready."))
  }

  def javascriptRoutes = Action { implicit request =>
    Ok(
      JavaScriptReverseRouter("jsRoutes")(
        routes.javascript.Application.index,
        routes.javascript.Application.ajaxCall,
        routes.javascript.Application.getUsersByGroupId,
        routes.javascript.Application.getFlightsByUserIds,
        routes.javascript.Application.addUser
      )
    ).as("text/javascript")
  }

  def getUsersByGroupId(groupId: Int) = Action { implicit request =>
    Ok(
      //JSONArray(List(1, 2, 3, 4, groupId)).toString()
      Json.toJson(List(1,2,3,4,groupId)).toString
    )
  }

  def getFlightsByUserIds(userIds: String) = Action { implicit request =>
    val cdgLatitude = new Latitude(49.009722)
    val cdgLongitude = new Longitude(2.547778)
    val dcaLatitude = new Latitude(38.852222)
    val dcaLongitude = new Longitude(-77.037778)
    val cdg = Airport(
      0,
      "DEPARTURE AIRPORT",
      "Paris",
      "France",
      Option("CDG"),
      Option("IATA"),
      cdgLatitude.degrees,
      cdgLongitude.degrees,
      119,
      1
    )
    val dca = Airport(
      1,
      "ARRIVAL AIRPORT",
      "Washington",
      "United States of America",
      Option("DCA"),
      Option("IATA"),
      dcaLatitude.degrees,
      dcaLongitude.degrees,
      5,
      -5
    )
    val airline = Airline(0, "NAME", "ALIAS", Option("IATA"), Option("ICAO"), "CALLSIGN", "COUNTRY", false)
    val route = Route(airline, cdg, dca, false, 0, "BOEING 777-800")
    val flight = Flight(route, DateTime.now(), DateTime.nextDay())
    val resp = Json.toJson(flight)
    print(Json.prettyPrint(resp))
    Ok(
      Json.stringify(resp)
    )
  }

  def ajaxCall(msg: String) = Action { implicit request =>
    Ok(s"Ajax Call! : $msg")
  }

  def addUser(name: String) = Action { implicit request =>
    //val newUser = Database.save(User("a","b","c",Seq.empty,Seq.empty))
    /*val x = UserGroup(1,Seq.empty)
    val newGroup = Database.save(x)
    print(newGroup.id)
    Ok(Json.toJson(newGroup.id))*/
    val cdgLatitude = new Latitude(49.009722)
    val cdgLongitude = new Longitude(2.547778)
    val dcaLatitude = new Latitude(38.852222)
    val dcaLongitude = new Longitude(-77.037778)
    val cdg = Airport(
      0,
      "DEPARTURE AIRPORT",
      "Paris",
      "France",
      Option("CDG"),
      Option("IATA"),
      cdgLatitude.degrees,
      cdgLongitude.degrees,
      119,
      1
    )
    val dca = Airport(
      1,
      "ARRIVAL AIRPORT",
      "Washington",
      "United States of America",
      Option("DCA"),
      Option("IATA"),
      dcaLatitude.degrees,
      dcaLongitude.degrees,
      5,
      -5
    )
    val airline = Airline(0, "NAME", "ALIAS", Option("IATA"), Option("ICAO"), "CALLSIGN", "COUNTRY", false)
    val route = Database.addRoute(Route(airline, cdg, dca, false, 0, "BOEING 777-800"))
    val flight = Flight(route, DateTime.now(), DateTime.nextDay())

    val group = UserGroup(1, Set(1,1,2,3,5,8,13,21,34))
    //val one = Database.save(User("NAME","EMAIL","TOKEN",Seq(flight),Seq(group)))
    val anotherOne = Database.addUser(User("NAME","EMAIL","TOKEN",Seq(flight),Seq(group)))
    Ok(anotherOne.toString)
  }
}
