import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import io from "socket.io-client";

let socket;

const Chat = ({ route }) => {
    const { name, selectedRoom } = route.params;
    const [message, setMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const ENDPOINT = "http://localhost:5000";

    useEffect(() => {
        socket = io(ENDPOINT, {
            jsonp: false,
            transports: ["websocket"],
        });
        socket.emit("join", { name, selectedRoom });

        return () => {
            socket.off();
        };
    }, [ENDPOINT, route.params]);

    useEffect(() => {
        socket.on("message", (message) => {
            setMessageList([...messageList, message]);
        });
    }, [messageList]);

    const chatMessages = messageList.map((chatMessage, index) => (
        <Text style={styles.chatText} key={index}>
            {chatMessage.text} || By: {chatMessage.user}
        </Text>
    ));

    const sendChatMessage = () => {
        socket.emit("sendMessage", message);
        setMessage("");
    };

    return (
        <View style={styles.container}>
            <Text>
                Hello {name}! Welcome to #{selectedRoom}
            </Text>
            <View style={styles.chatContainer}>
                <TextInput
                    style={styles.chatBox}
                    autoCorrect={false}
                    value={message}
                    onChangeText={(message) => setMessage(message)}
                    onSubmitEditing={() => sendChatMessage()}
                />
            </View>
            {chatMessages}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    chatContainer: {},
    chatBox: {
        height: 40,
        borderWidth: 2,
        top: 600,
        padding: 5,
        margin: 10,
        borderRadius: 12,
    },
    chatText: {
        borderWidth: 1,
        borderRadius: 12,
        backgroundColor: "skyblue",
        textAlign: "center",
        minWidth: 60,
        padding: 5,
        marginBottom: 5,
    },
});

export default Chat;
