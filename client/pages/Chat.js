import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Dimensions } from "react-native";
import { ChatRoomHeader } from "../components";
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
        socket.emit("join", { name, selectedRoom }, (err) => console.log(err));

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
            <ChatRoomHeader room={selectedRoom} />
            <View style={styles.chatContainer}>
                {chatMessages}
                <TextInput
                    style={styles.chatBox}
                    autoCorrect={false}
                    value={message}
                    onChangeText={(message) => setMessage(message)}
                    onSubmitEditing={() => sendChatMessage()}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get("window").height,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    chatContainer: {
        display: "flex",
        height: Dimensions.get("window").height / 2,
        width: Dimensions.get("window").width / 2,
        marginTop: 60,
        padding: 10,
        borderColor: "red",
        borderWidth: 2,
        justifyContent: "flex-end",
        overflow: "scroll",
    },
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
