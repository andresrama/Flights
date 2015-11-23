package models

import play.api.libs.json.Json

/**
 * Created by Andres Rama on 10/30/2015.
 */
case class Route(airline: Airline,
                sourceAirport: Airport,
                destinationAirport: Airport,
                codeshare: Boolean,
                stops: Int,
                equipment: String
                  )

object Route{
  implicit val routeFormat = Json.format[Route]
}
