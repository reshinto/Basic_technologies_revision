#!/usr/bin/env bash
printf 'Using JAVA_HOME=%s\n' $JAVA_HOME
jlink --module-path mods/:$JAVA_HOME/jmods --add-modules com.java9modules.main --output com.java9modules.main-image
