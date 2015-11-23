package models

import play.api.libs.json._

/**
 * Created by Andres Rama on 10/27/2015.
 */
case class Group (ownerId: Long, memberIds: List[Long])

object Group{
  implicit val groupFormat: Format[Group] = Json.format[Group]
}