import React, { useState, useEffect } from 'react';
import {
    StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert, Line
} from 'react-native';
import 'react-native-gesture-handler';




import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";
import firebase from 'firebase/app';
import firebaseConfig from '../firebase';


const Detail = () => {

    const [data, setData] = useState();

    useEffect(() => {

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig)
        }
        getData();
    }, [])

    const getData = () => {
        firebase
            .database()
            .ref('userDatas/')
            .on('value', function (snapshot) {
                let arrayDb = [];
                snapshot.forEach(function (childSnapshot) {
                    var childData = childSnapshot.val();
                    arrayDb.push({
                        id: childSnapshot.key,
                        activityName: childData.ActivityName,
                        location: childData.Location,
                        date: childData.Date,
                        time: childData.Time,
                        name: childData.Name,
                        desription: childData.Desription,
                    });
                });
                setData(arrayDb);

            });

    };

    function deleteDB(id) {
        Alert.alert('Delete', 'Do you want to delete? ',
            [


                {
                    text: "No",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    onPress: () => firebase.database().ref('userDatas/' + id).remove()
                        + alert('Delete Successfully!!')

                },
            ]
        )

    };

    const ViewData = (text) => {
        return data?.map((item, index) => {
            return (
                <View key={index} style={styles.itemBb}>
                    <Text style={styles.fieldText}>Activity Name: {item.activityName}</Text>
                    <Text style={styles.fieldText}>Location: {item.location}</Text>
                    <Text style={styles.fieldText}>Date: {item.date}</Text>
                    <Text style={styles.fieldText}>Times: {item.time}</Text>
                    <Text style={styles.fieldText}>Reporter name: {item.name}</Text>
                    <Text style={styles.fieldText}>Desription: {item.desription}</Text>
                    <View style={styles.functionRow}>
                        <TouchableOpacity
                            style={styles.deteleBtn}
                            onPress={() => {
                                deleteDB(item.id)
                            }}
                        >
                            <Text style={{ textAlign: "center", fontSize: 20 }}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            );

        });
    };

    return (

        <ScrollView style={styles.viewItem}>
            <View>{ViewData()}</View>
        </ScrollView>

    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemBb: {
        width: 300,
        margin: 20,
        borderWidth: 1,
        borderRadius: 5
    },
    fieldText: {
        fontSize: 16,
        margin: 5,

    },
    functionRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    deteleBtn: {
        width: "100%",
        padding: 10,
        marginTop: 20,
        
    },

});
export default Detail;