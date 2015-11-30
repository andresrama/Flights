package models

import play.api.libs.json._

/**
 * Created by Andres Rama on 10/27/2015.
 */
case class UserGroup(ownerId: Long, memberIds: Set[Long])

object UserGroup{
  implicit val groupFormat: Format[UserGroup] = Json.format[UserGroup]
}