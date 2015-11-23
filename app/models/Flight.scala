package models

import com.github.nscala_time.time.Imports._
import play.api.libs.json.Json


/**
 * Created by Andres Rama on 10/27/2015.
 */
case class Flight(
                 route: Route,
                 departureTime: DateTime,
                 arrivalTime: DateTime
                 )

object Flight{
  implicit val flightFormat = Json.format[Flight]
}
