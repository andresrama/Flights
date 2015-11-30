package models

import play.api.libs.json.Json
import sorm.Entity

/**
 * Created by Andres Rama on 10/30/2015.
 */
case class Airline(airlineId: Int,
                   name: String,
                   alias: String,
                   iataCode: Option[String],
                   icaoCode: Option[String],
                   callsign: String,
                   country: String,
                   active: Boolean
                    )

object Airline{
  implicit val airlineFormat = Json.format[Airline]
}
