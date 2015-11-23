package models

import models.DST.DST
import models.Formaters._ // Not superfluous; needed for conversions to and from JSON
import org.geotools.measure._
import play.api.libs.json._

/**
 * Created by Andres Rama on 10/27/2015.
 */



case class Airport(airportId: Int,
                   name: String,
                   city: String,
                   country: String,
                   code: Option[String],
                   codeType: Option[String],
                   latitude: Latitude,
                   longitude: Longitude,
                   altitude: Int, //NOTE: We store this in metres like it should be
                   timeOffsetFromUTC: Float,
                   dst: DST
                    ){

}



object Airport{
  implicit val airportFormat = Json.format[Airport]
}