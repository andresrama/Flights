package controllers

import play.api._
import play.api.mvc._
import play.Routes

class Application extends Controller {

  def index = Action { implicit request =>
    Ok(views.html.index("Your new application is ready."))
  }

  def ajaxCall = Action { implicit request =>
    Ok("Ajax Call!")
  }
}
