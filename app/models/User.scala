package models

import play.api.libs.json.Json

/**
 * Created by Andres Rama on 10/27/2015.
 */
case class User (
                name: String,
                email: String,
                googleToken: String,
                flights: Seq[Flight],
                groups: Seq[UserGroup]
                )

object User{
  implicit val userFormat = Json.format[User]
}
