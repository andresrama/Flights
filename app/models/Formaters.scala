package models

import play.api.libs.json._
import org.geotools.measure._

object Formaters {
  implicit object latitudeFormatter extends Format[Latitude]{
    override def reads(json: JsValue): JsResult[Latitude] = JsSuccess(new Latitude(
      json.as[Double]
    ))

    override def writes(o: Latitude): JsValue = JsNumber(
      o.radians()
    )
  }

  implicit object longitudeFormatter extends Format[Longitude]{
    override def reads(json: JsValue): JsResult[Longitude] = JsSuccess(new Longitude(
      json.as[Double]
    ))

    override def writes(o: Longitude): JsValue = JsNumber(
      o.radians()
    )
  }

}
