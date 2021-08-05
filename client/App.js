import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import io from "socket.io-client";

export default function App() {
    const [message, setMessage] = useState("");
    const [messagesList, setMessagesList] = useState([]);
    const socket = io("http://localhost:5000", {
        jsonp: false,
        transports: ["websocket"],
    });

    useEffect(() => {
        socket.on("chat message", (msg) => {
            console.log(msg);
            setMessagesList([...messagesList, msg]);
        });
    }, [messagesList]);

    const chatMessages = messagesList.map((chatMessage, index) => (
        <Text key={index}>{chatMessage}</Text>
    ));

    const sendChatMessage = () => {
        /*     const socket = io("http://localhost:5000", {
            jsonp: false,
            transports: ["websocket"],
        }); */
        socket.emit("chat message", message);
        setMessage("");
    };

    return (
        <View style={styles.container}>
            {chatMessages}
            <TextInput
                style={styles.chatBox}
                autoCorrect={false}
                value={message}
                onChangeText={(message) => setMessage(message)}
                onSubmitEditing={() => sendChatMessage()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    chatBox: {
        height: 40,
        borderWidth: 2,
        top: 600,
    },
});
