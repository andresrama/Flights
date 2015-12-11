package models

import org.geotools.measure.Latitude
import org.joda.time.DateTime
import sorm._

/**
  * Created by Andres Rama on 11/24/2015.
  */

object Database extends Instance(
  entities = Set(
    Entity[User](),
    Entity[Flight](),
    Entity[Route](),
    Entity[Airline](),
    Entity[Airport](),
    Entity[UserGroup]()
  ),
  url = "jdbc:h2:mem:test;DB_CLOSE_DELAY=-1"
){
  def addGroup(userGroup: UserGroup): UserGroup = {
    Database.save(userGroup)
  }

  def addAirline(airline: Airline): Airline with Persisted = {
    Database
      .query[Airline]
      .whereEqual("name", airline.name)
      .fetchOne()
      .getOrElse(
        Database.save[Airline](airline)
      )
  }

  def addAirport(airport: Airport): Airport with Persisted = {
    val x: Airport with Persisted = Database
      .query[Airport]
      .whereEqual("latitude", airport.latitude)
      .whereEqual("longitude", airport.longitude)
      .fetchOne()
      .getOrElse(
        Database.save[Airport](airport)
      )
    x
  }

  def addRoute(route: Route): Route with Persisted = {
    val dbAirline = Database.addAirline(route.airline)
    val dbSourceAirport = Database.addAirport(route.sourceAirport)
    val dbDestinationAirport = Database.save(route.destinationAirport)
    Database
      .query[Route]
      .whereEqual("airline.name", dbAirline.name)
      .whereEqual("sourceAirport.id", dbSourceAirport.id)
      .whereEqual("destinationAirport.id", dbDestinationAirport.id)
      .fetchOne()
      .getOrElse(
        Database.save[Route](Route(
          dbAirline,
          dbSourceAirport,
          dbDestinationAirport,
          route.codeshare,
          route.stops,
          route.equipment
        ))
      )
  }

  def addFlight(flight: Flight): Flight = {
    Database
      .query[Flight]
      .whereEqual("route", flight.route)
      .whereEqual("departureTime", flight.departureTime)
      .whereEqual("arrivalTime", flight.arrivalTime)
      .fetchOne()
      .getOrElse(
        Database.save(Flight(
          addRoute(flight.route),
          flight.departureTime,
          flight.arrivalTime
        ))
      )
  }

  def addUser(user: User): User = {
    Database
      .query[User]
      .whereEqual("googleToken", user.googleToken)
      .fetchOne()
      .getOrElse(
        Database.save(User(
          user.name,
          user.email,
          user.googleToken,
          user.flights.map(f => addFlight(f)),
          user.groups.map(g => addGroup(g))
        ))
      )
  }
}