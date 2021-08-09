import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Landing, Chat } from "../pages";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={"Start"}>
            <Stack.Screen
                name='Start'
                component={Landing}
                options={{ headerShown: false }}
            />
            <Stack.Screen name='Chat' component={Chat} />
        </Stack.Navigator>
    );
};

export default StackNavigator;
