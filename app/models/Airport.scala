package models

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
                   latitude: Double,
                   longitude: Double,
                   altitude: Int, //NOTE: We store this in metres like it should be
                   timeOffsetFromUTC: Double
                    ){

}



object Airport{
  implicit val airportFormat = Json.format[Airport]
}