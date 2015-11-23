name := """play-scala"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.11.6"

libraryDependencies ++= Seq(
  jdbc,
  cache,
  ws,
  specs2 % Test
)

libraryDependencies += "org.geotools" % "gt-shapefile" % "13.2"
libraryDependencies += "org.geotools" % "gt-swing" % "13.2"
libraryDependencies += "com.github.nscala-time" %% "nscala-time" % "2.4.0"
resolvers += "scalaz-bintray" at "http://dl.bintray.com/scalaz/releases"
resolvers += "gt-shapefile" at "http://download.osgeo.org/webdav/geotools/"
resolvers += "gt-swing" at "http://download.osgeo.org/webdav/geotools/"

// Play provides two styles of routers, one expects its actions to be injected, the
// other, legacy style, accesses its actions statically.
routesGenerator := InjectedRoutesGenerator

//fork in run := true