package controllers

import play.api._
import play.api.mvc._
import play.Routes
import play.api.routing.JavaScriptReverseRouter

class Application extends Controller {

  def index = Action { implicit request =>
    Ok(views.html.index("Your new application is ready."))
  }

  def javascriptRoutes = Action { implicit request =>
    Ok(
      JavaScriptReverseRouter("jsRoutes")(
        routes.javascript.Application.index,
        routes.javascript.Application.ajaxCall
      )
    ).as("text/javascript")
  }

  def ajaxCall = Action { implicit request =>
    Ok("Ajax Call!")
  }
}
