import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ChatRoomHeader = ({ navigation, room }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.textSides}>Online: 1</Text>
            <Text style={styles.textCenter}>Room: {room}</Text>
            <Text style={styles.textSides}>X</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#eee",
    },
    textSides: {
        width: 40,
        height: 30,
    },
    textCenter: {
        flexGrow: 1,
        marginLeft: 5,
        marginRight: 5,
    },
});
export default ChatRoomHeader;
