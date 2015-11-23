package models

import play.api.libs.json.Json

/**
 * Created by Andres Rama on 10/27/2015.
 */
case class User (
                id: Long,
                name: String,
                email: String,
                google_token: String,
                flights: List[Flight]
                )

object User{
  implicit val userFormat = Json.format[User]
}
