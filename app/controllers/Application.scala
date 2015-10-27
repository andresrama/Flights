package controllers

import play.api._
import play.api.mvc._
import play.Routes
import play.api.routing.JavaScriptReverseRouter
import play.libs.Json
import scala.util.parsing.json._


class Application extends Controller {

  def index = Action { implicit request =>
    Ok(views.html.index("Your new application is ready."))
  }

  def javascriptRoutes = Action { implicit request =>
    Ok(
      JavaScriptReverseRouter("jsRoutes")(
        routes.javascript.Application.index,
        routes.javascript.Application.ajaxCall,
        routes.javascript.Application.getGroupById,
        routes.javascript.Application.getFlightsByUserIds
      )
    ).as("text/javascript")
  }

  def getGroupById(groupId: Int) = Action { implicit request =>
    Ok(
      JSONArray(List(1, 2, 3, 4, groupId)).toString()
      //Json.toJson(List(1,2,3,4,groupId)).toString
    )
  }
  
  def getFlightsByUserIds(userIds: String) = Action { implicit request =>
    val jsonUserIds = Json.parse(userIds)
    Ok(
      Json.toJson(jsonUserIds.isArray).toString
    )
  }

  def ajaxCall(msg: String) = Action { implicit request =>
    Ok(s"Ajax Call! : $msg")
  }
}
