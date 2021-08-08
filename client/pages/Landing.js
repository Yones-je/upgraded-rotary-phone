import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Landing = () => {
    return (
        <View style={styles.pageContainer}>
            <Text>Welcome to RNW-Chat!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    pageContainer: {
        margin: 10,
    },
});

export default Landing;
