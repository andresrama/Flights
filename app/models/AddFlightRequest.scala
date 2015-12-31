package models

import org.joda.time.DateTime
import play.api.libs.json.Json

/**
  * Created by and-y on 12/30/2015.
  */
case class AddFlightRequest(
                           airline: String,
                           from: String,
                           fromTime: DateTime,
                           to: String,
                           toTime: DateTime
                           )

object AddFlightRequest{
  implicit val addFlightRequestFormat = Json.format[AddFlightRequest]
}