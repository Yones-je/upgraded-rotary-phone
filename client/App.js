import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppRegistry } from "react-native";
import StackNavigator from "./navigation/StackNavigator";

export default function App() {
    return (
        <NavigationContainer>
            <StackNavigator />
        </NavigationContainer>
    );
}
