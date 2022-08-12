import { Dimensions, Platform, StatusBar } from "react-native"

const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight

export { WIDTH, HEIGHT, STATUSBAR_HEIGHT }