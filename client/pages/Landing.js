import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { H1 } from "../components";

const Landing = () => {
    const [name, setName] = useState("");
    const [roomName, setRoomName] = useState("");
    const [selectedRoom, setSelectedRoom] = useState();

    const pressHandler = () => {
        Alert.alert(
            `Your display name is: ${name}`,
            `The room you're joining is ${selectedRoom}`,
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
                {
                    text: "Yes!",
                    onPress: () => console.log("Yes pressed"),
                },
            ]
        );
    };

    return (
        <View style={styles.pageContainer}>
            <H1 text='Welcome to RNW-chat!' />
            <View style={styles.infoBox}>
                <Text style={styles.prompt}>
                    What do you want to be called?
                </Text>
                <TextInput
                    placeholder='Choose a display name...'
                    style={styles.nameBox}
                    autoCorrect={false}
                    value={name}
                    onChangeText={(name) => setName(name)}
                />
                <View style={styles.middleContainer}>
                    <View style={styles.pickerContainer}>
                        <Text style={styles.prompt}>
                            Choose a room to chat in!
                        </Text>
                        <Picker
                            selectedValue={selectedRoom}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedRoom(itemValue)
                            }
                            style={styles.nameBox}
                        >
                            <Picker.Item label='WebDev' value='WebDev' />
                            <Picker.Item label='General Chat' value='General' />
                        </Picker>
                    </View>
                    <H1 text='OR' style={styles.h1} />
                    <View style={styles.createRoomContainer}>
                        <Text style={styles.prompt}>Create your own!</Text>
                        <TextInput
                            placeholder='Choose a room name...'
                            style={styles.nameBox}
                            autoCorrect={false}
                            value={roomName}
                            onChangeText={(roomName) => setRoomName(roomName)}
                        />
                        <TouchableOpacity
                            style={styles.btn2}
                            onPress={() => setSelectedRoom(roomName)}
                        >
                            <Text style={styles.prompt}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() =>
                        console.log(
                            `Your display name is: ${name} & The room you're joining is ${selectedRoom}`
                        )
                    }
                >
                    <Text>Lets Chat!</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    pageContainer: {
        margin: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    infoBox: {
        padding: 10,
        width: "70%",
        height: 500,
        backgroundColor: "#eee",
        opacity: "80%",
    },
    middleContainer: {
        flexDirection: "row",
        alignItems: "center",
        //justifyContent: "center",
        height: 100,
    },
    pickerContainer: {
        height: 100,
        margin: 10,
    },
    createRoomContainer: {
        height: 100,
        margin: 10,
        alignItems: "center",
    },
    nameBox: {
        width: 200,
        padding: 5,
        backgroundColor: "white",
        borderWidth: 1,
    },
    prompt: {
        fontSize: 16,
        fontWeight: "bold",
        margin: 1,
    },
    btn: {
        marginTop: 40,
        borderRadius: 12,
        backgroundColor: "skyblue",
        width: 150,
        padding: 10,
        borderWidth: 1,
    },
    btn2: {
        marginTop: 10,
        borderRadius: 20,
        backgroundColor: "skyblue",
        width: 25,
        height: 20,
        borderWidth: 1,
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    h1: {
        margin: 10,
    },
});

export default Landing;
