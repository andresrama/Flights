package models

import play.api.libs.json._

/**
 * Created by Andres Rama on 10/30/2015.
 */
object DST extends Enumeration{
  type DST = Value
  val europe, northAmerica, southAmerica, australia, newZealand, none, unknown = Value
  implicit val dstFormat: Format[DST] = EnumUtils.enumFormat(DST)
}
