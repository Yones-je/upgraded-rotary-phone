import React from "react";
import { Text, StyleSheet } from "react-native";

const H1 = ({ text }) => {
    return <Text style={styles.h1}>{text}</Text>;
};

const styles = StyleSheet.create({
    h1: {
        fontSize: 30,
        fontWeight: "bold",
    },
});
export default H1;
