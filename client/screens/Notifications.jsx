import { Text, TouchableOpacity, View ,StyleSheet} from "react-native";

// const Notifications=({route})=>{
//     const { selectedGoals } = route.params;

//     const backToHome=()=>{
//         navigation.navigate('Home')
//     }

//     return (
//         // <View>
//         //     <Text style={{marginLeft:50, marginTop:100}}>Notification section</Text>
//         //     <TouchableOpacity onPress={backToHome}>
//         //         <Text>back</Text>
//         //         <Text>Goal: {selectedGoal.goal}</Text>
//         //     <Text>Date: {selectedGoal.date ? selectedGoal.date.toLocaleDateString() : 'No date selected'}</Text>


//         //     </TouchableOpacity>
//         // </View>
//         <View style={styles.container}>
//             {selectedGoals.map((goal, index) => (
//                 <View key={index} style={styles.goalContainer}>
//                     <Text style={styles.goalText}>Goal: {goal.goal}</Text>
//                     <Text style={styles.dateText}>
//                         Date: {goal.date ? new Date(goal.date).toLocaleDateString() : 'No date selected'}
//                     </Text>
//                 </View>
//             ))}
//         </View>
//     )

// }
const Notifications = ({ route }) => {
    const selectedGoals = route.params?.selectedGoals;

    if (!selectedGoals || !Array.isArray(selectedGoals)) {
        return (
            <View style={styles.container}>
                <Text>No goals selected.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {selectedGoals.map((goal, index) => (
                <View key={index} style={styles.goalContainer}>
                    <Text style={styles.goalText}>Goal: {goal.goal}</Text>
                    <Text style={styles.dateText}>
                        Date: {goal.date ? new Date(goal.date).toLocaleDateString() : 'No date selected'}
                    </Text>
                </View>
            ))}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    goalContainer: {
        marginBottom: 20,
    },
    goalText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    dateText: {
        fontSize: 16,
        color: '#666',
    },
});
export default Notifications;