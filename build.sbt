name := """play-scala"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.11.7"

lazy val sorm = "org.sorm-framework" % "sorm" % "0.3.19"

libraryDependencies ++= Seq(
  jdbc,
  cache,
  ws,
  specs2 % Test,
  sorm
)

libraryDependencies += "org.geotools"           %  "gt-shapefile" % "13.2"
libraryDependencies += "org.geotools"           %  "gt-swing"     % "13.2"
libraryDependencies += "com.github.nscala-time" %% "nscala-time"  % "2.4.0"
libraryDependencies += "com.h2database"         %  "h2"           % "1.3.168"
resolvers += "scalaz-bintray" at "http://dl.bintray.com/scalaz/releases"
resolvers += "gt-shapefile" at "http://download.osgeo.org/webdav/geotools/"
resolvers += "gt-swing" at "http://download.osgeo.org/webdav/geotools/"
resolvers += Resolver.url("Typesafe Ivy Releases", url("https://repo.typesafe.com/typesafe/ivy-releases"))(Resolver.ivyStylePatterns)

// Play provides two styles of routers, one expects its actions to be injected, the
// other, legacy style, accesses its actions statically.
routesGenerator := InjectedRoutesGenerator

//Stop libs from downgrading my scala
dependencyOverrides += "org.scala-lang" % "scala-compiler" % scalaVersion.value

//fork in run := true