// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, ScrollView } from "react-native";
// import Star from "../../../assets/star_filled.png";
// import Back from "../../../assets/back.png";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
// import Calendar from '../../../assets/calendar.png';
// const MentorsAvailability = ({ route, navigation }) => {
//   const { name, image, description, rating, type } = route.params;
//   const [selectedTime, setSelectedTime] = useState(null);
//   const [selectedDuration, setSelectedDuration] = useState(null);
//   const [meetingType, setMeetingType] = useState("Personal");
//   const [location, setLocation] = useState("");
//   const [isDatePickerVisible, setDatePickerVisible] = useState(false);
//   const [dateOfBirth, setDateOfBirth] = useState(null);
//   const [dateOfBirthError, setDateOfBirthError] = useState("");

//   const showDatePicker = () => {
//     setDatePickerVisible(true);
//   };

//   const hideDatePicker = () => {
//     setDatePickerVisible(false);
//   };

//   const handleConfirmDate = (selectedDate) => {
//     hideDatePicker();
//     if (selectedDate) {
//       setDateOfBirth(selectedDate);
//       setDateOfBirthError("");
//     }
//   };
//   const durations = ["30 mins", "45 mins", "1h", "1h 30mins"];
//   const availableTime = [
//     {
//       name: "Fares J.",
//       availableTimes: ["7:00 am", "11:00 am", "2:00 pm", "4:00 pm", "7:00 pm"],
//     },
//     {
//       name: "Mira D.",
//       availableTimes: ["4:00 am", "11:00 am", "2:00 pm", "4:00 pm", "7:00 pm"],
//     },
//     {
//       name: "John Doe",
//       availableTimes: ["5:00 am", "11:00 am", "2:00 pm", "4:00 pm", "7:00 pm"],
//     },
//     {
//       name: "Jane Smith",
//       availableTimes: ["8:00 am", "11:00 am", "2:00 pm", "4:00 pm", "7:00 pm"],
//     },
//   ];

//   const mentorTimes = availableTime.find((mentor) => mentor.name === name);

//   const handleBook = () => {
//     alert(`Time: ${selectedTime}, Duration: ${selectedDuration}, Type: ${meetingType}, Location: ${location}, Date: ${dateOfBirth.toDateString()}`);
//   };

//   const backToHome = () => {
//     navigation.navigate("Mentors");
//   };

//   return (
//     <>
//       <View style={styles.container}>
//         <TouchableOpacity onPress={backToHome}>
//           <Image source={Back} style={styles.backButton} />
//         </TouchableOpacity>
//         <Text style={styles.header}>{type}</Text>
//         <Image source={image} style={styles.feedbackImage} />
//       </View>
//       <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//         <Text style={{left: 230, fontSize: 22, top: -160, color: "white", fontWeight: "bold" ,position:"absolute"}}>
//           {name}
//         </Text>
//         <Text
//           style={{
//             left: 230,
//             fontSize: 22,
//             top:-120,
//             position:"absolute",
//             color: "white",
//             backgroundColor: "#032B79",
//             fontWeight: "bold",
//             padding: 7,
//             width: 90,
//             paddingLeft: 15,
//             borderRadius: 30,
//           }}
//         >
//           {rating}
//         </Text>
//         <Image style={{ left: 285, position: "absolute", width: 25, height: 25, top: -110 }} source={Star} />
//       </View>

//       <ScrollView>
//         <View style={styles.containerr}>
//         <TouchableOpacity style={styles.input} onPress={showDatePicker}>
//         <Text>
//           {dateOfBirth ? (
//             dateOfBirth.toDateString()
//           ) : (
//             <Image source={Calendar} style={styles.Calendar} />
//           )}
//         </Text>
//       </TouchableOpacity>
//       {dateOfBirth ? (
//         <Text style={styles.errorText}>{dateOfBirthError}</Text>
//       ) : null}
//         <DateTimePickerModal
//         isVisible={isDatePickerVisible}
//         mode="date"
//         placeholder="date of birth"
//         value={dateOfBirth}
//         onConfirm={handleConfirmDate}
//         onCancel={hideDatePicker}
//       />
//           <Text style={styles.label}>Available Times for {name}</Text>
//           <View style={styles.optionsContainer}>
//             {mentorTimes ? (
//               mentorTimes.availableTimes.map((time) => (
//                 <TouchableOpacity
//                   key={time}
//                   style={[styles.option, selectedTime === time && styles.selectedOption]}
//                   onPress={() => setSelectedTime(time)}
//                 >
//                   <Text style={[styles.optionText, selectedTime === time && styles.selectedOptionText]}>{time}</Text>
//                 </TouchableOpacity>
//               ))
//             ) : (
//               <Text>No available times for this mentor</Text>
//             )}
//           </View>

//           <Text style={styles.label}>Select the duration</Text>
//           <View style={styles.optionsContainer}>
//             {durations.map((duration) => (
//               <TouchableOpacity
//                 key={duration}
//                 style={[styles.option, selectedDuration === duration && styles.selectedOption]}
//                 onPress={() => setSelectedDuration(duration)}
//               >
//                 <Text style={[styles.optionText, selectedDuration === duration && styles.selectedOptionText]}>
//                   {duration}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>

//           <Text style={styles.label}>Meeting Type</Text>
//           <View style={styles.toggleContainer}>
//             <TouchableOpacity
//               style={[styles.toggleOption, meetingType === "Personal" && styles.selectedToggleOption]}
//               onPress={() => setMeetingType("Personal")}
//             >
//               <Text style={[styles.toggleOptionText, meetingType === "Personal" && styles.selectedToggleOptionText]}>
//                 Personal
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[styles.toggleOption, meetingType === "Group" && styles.selectedToggleOption]}
//               onPress={() => setMeetingType("Group")}
//             >
//               <Text style={[styles.toggleOptionText, meetingType === "Group" && styles.selectedToggleOptionText]}>
//                 Group
//               </Text>
//             </TouchableOpacity>
//           </View>

//           <Text style={styles.label}>Meeting Location</Text>
//           <TextInput
//             style={styles.textInput}
//             placeholder="Enter the location"
//             value={location}
//             onChangeText={setLocation}
//           />

//           <TouchableOpacity style={styles.bookButton} onPress={handleBook}>
//             <Text style={styles.bookButtonText}>BOOK IT!</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#719AEA",
//     height: "45%",
//     borderRadius: 70,
//     marginTop: -50,
//     alignItems: "center",
//   },
//   backButton: {
//     position: "absolute",
//     marginTop: 90,
//     marginLeft: -170,
//     width: 30,
//     height: 30,
//   },
//   header: {
//     color: "white",
//     fontSize: 30,
//     fontWeight: "bold",
//     position: "absolute",
//     marginTop: 130,
//   },
//   feedbackImage: {
//     width: 180,
//     height: 180,
//     marginTop: 170,
//     left: -30,
//   },
//   containerr: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#fff",
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   optionsContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//   },
//   option: {
//     padding: 10,
//     borderRadius: 5,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     marginBottom: 10,
//     width: "48%",
//     alignItems: "center",
//   },
//   selectedOption: {
//     backgroundColor: "#719AEA",
//     borderColor: "#719AEA",
//   },
//   optionText: {
//     color: "#000",
//   },
//   selectedOptionText: {
//     color: "#fff",
//   },
//   toggleContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginBottom: 20,
//   },
//   toggleOption: {
//     padding: 10,
//     borderRadius: 5,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     flex: 1,
//     alignItems: "center",
//     marginHorizontal: 5,
//   },
//   selectedToggleOption: {
//     backgroundColor: "#719AEA",
//     borderColor: "#719AEA",
//   },
//   toggleOptionText: {
//     color: "#000",
//   },
//   selectedToggleOptionText: {
//     color: "#fff",
//   },
//   textInput: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 20,
//   },
//   bookButton: {
//     backgroundColor: "#719AEA",
//     padding: 15,
//     borderRadius: 5,
//     alignItems: "center",
//   },
//   bookButtonText: {
//     color: "#fff",
//     fontSize: 16,
//   },
// });

// export default MentorsAvailability;

// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, ScrollView } from "react-native";
// import axios from "axios";
// import Star from "../../../assets/star_filled.png";
// import Back from "../../../assets/back.png";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
// import Calendar from '../../../assets/calendar.png';

// const MentorsAvailability = ({ route, navigation }) => {
//   const { name, image, description, rating, type } = route.params;
//   const [selectedTime, setSelectedTime] = useState(null);
//   const [selectedDuration, setSelectedDuration] = useState(null);
//   const [meetingType, setMeetingType] = useState("Personal");
//   const [location, setLocation] = useState("");
//   const [isDatePickerVisible, setDatePickerVisible] = useState(false);
//   const [dateOfBirth, setDateOfBirth] = useState(null);
//   const [dateOfBirthError, setDateOfBirthError] = useState("");

//   const showDatePicker = () => {
//     setDatePickerVisible(true);
//   };

//   const hideDatePicker = () => {
//     setDatePickerVisible(false);
//   };

//   const handleConfirmDate = (selectedDate) => {
//     hideDatePicker();
//     if (selectedDate) {
//       setDateOfBirth(selectedDate);
//       setDateOfBirthError("");
//     }
//   };

//   const durations = ["30 mins", "45 mins", "1h", "1h 30mins"];
//   const availableTime = [
//     {
//       name: "Fares J.",
//       availableTimes: ["7:00 am", "11:00 am", "2:00 pm", "4:00 pm", "7:00 pm"],
//     },
//     {
//       name: "Mira D.",
//       availableTimes: ["4:00 am", "11:00 am", "2:00 pm", "4:00 pm", "7:00 pm"],
//     },
//     {
//       name: "John Doe",
//       availableTimes: ["5:00 am", "11:00 am", "2:00 pm", "4:00 pm", "7:00 pm"],
//     },
//     {
//       name: "Jane Smith",
//       availableTimes: ["8:00 am", "11:00 am", "2:00 pm", "4:00 pm", "7:00 pm"],
//     },
//   ];

//   const mentorTimes = availableTime.find((mentor) => mentor.name === name);

//   const handleBook = async () => {
//     if (!selectedTime || !selectedDuration || !dateOfBirth || !location) {
//       alert("Please fill out all fields.");
//       return;
//     }

//     const bookingDetails = {
//       mentorName: name,
//       time: selectedTime,
//       duration: selectedDuration,
//       meetingType,
//       location,
//       date: dateOfBirth.toDateString(),
//       status:"upcoming"

//     };

//     try {
//       const response = await axios.post("http://10.0.0.21:3001/bookings", bookingDetails);
//       if (response.status === 200) {
//         alert("Booking confirmed!");
//         navigation.navigate("Mentors");
//       } else {
//         alert("Failed to book. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error booking appointment:", error);
//       alert("An error occurred while booking. Please try again.");
//     }
//   };

//   const backToHome = () => {
//     navigation.navigate("Mentors");
//   };

//   return (
//     <>
//       <View style={styles.container}>
//         <TouchableOpacity onPress={backToHome}>
//           <Image source={Back} style={styles.backButton} />
//         </TouchableOpacity>
//         <Text style={styles.header}>{type}</Text>
//         <Image source={image} style={styles.feedbackImage} />
//       </View>
//       <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//         <Text style={{left: 230, fontSize: 22, top: -160, color: "white", fontWeight: "bold" ,position:"absolute"}}>
//           {name}
//         </Text>
//         <Text
//           style={{
//             left: 230,
//             fontSize: 22,
//             top:-120,
//             position:"absolute",
//             color: "white",
//             backgroundColor: "#032B79",
//             fontWeight: "bold",
//             padding: 7,
//             width: 90,
//             paddingLeft: 15,
//             borderRadius: 30,
//           }}
//         >
//           {rating}
//         </Text>
//         <Image style={{ left: 285, position: "absolute", width: 25, height: 25, top: -110 }} source={Star} />
//       </View>

//       <ScrollView>
//         <View style={styles.containerr}>
//           <TouchableOpacity style={styles.input} onPress={showDatePicker}>
//             <Text>
//               {dateOfBirth ? (
//                 dateOfBirth.toDateString()
//               ) : (
//                 <Image source={Calendar} style={styles.Calendar} />
//               )}
//             </Text>
//           </TouchableOpacity>
//           {dateOfBirth ? (
//             <Text style={styles.errorText}>{dateOfBirthError}</Text>
//           ) : null}
//           <DateTimePickerModal
//             isVisible={isDatePickerVisible}
//             mode="date"
//             placeholder="date of birth"
//             value={dateOfBirth}
//             onConfirm={handleConfirmDate}
//             onCancel={hideDatePicker}
//           />
//           <Text style={styles.label}>Available Times for {name}</Text>
//           <ScrollView style={styles.optionsContainer}  horizontal showsHorizontalScrollIndicator={false}>
//             {mentorTimes ? (
//               mentorTimes.availableTimes.map((time) => (
//                 <TouchableOpacity
//                   key={time}
//                   style={[styles.option, selectedTime === time && styles.selectedOption]}
//                   onPress={() => setSelectedTime(time)}
//                 >
//                   <Text style={[styles.optionText, selectedTime === time && styles.selectedOptionText]}>{time}</Text>
//                 </TouchableOpacity>
//               ))
//             ) : (
//               <Text>No available times for this mentor</Text>
//             )}
//           </ScrollView>

//           <Text style={styles.label}>Select the duration</Text>
//           <View style={styles.optionsContainer} horizontal showsHorizontalScrollIndicator={false}>
//             {durations.map((duration) => (
//               <TouchableOpacity
//                 key={duration}
//                 style={[styles.option, selectedDuration === duration && styles.selectedOption]}
//                 onPress={() => setSelectedDuration(duration)}
//               >
//                 <Text style={[styles.optionText, selectedDuration === duration && styles.selectedOptionText]}>
//                   {duration}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>

//           <Text style={styles.label}>Meeting Type</Text>
//           <View style={styles.toggleContainer}>
//             <TouchableOpacity
//               style={[styles.toggleOption, meetingType === "Personal" && styles.selectedToggleOption]}
//               onPress={() => setMeetingType("Personal")}
//             >
//               <Text style={[styles.toggleOptionText, meetingType === "Personal" && styles.selectedToggleOptionText]}>
//                 Personal
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[styles.toggleOption, meetingType === "Group" && styles.selectedToggleOption]}
//               onPress={() => setMeetingType("Group")}
//             >
//               <Text style={[styles.toggleOptionText, meetingType === "Group" && styles.selectedToggleOptionText]}>
//                 Group
//               </Text>
//             </TouchableOpacity>
//           </View>

//           <Text style={styles.label}>Meeting Location</Text>
//           <TextInput
//             style={styles.textInput}
//             placeholder="Enter the location"
//             value={location}
//             onChangeText={setLocation}
//           />

//           <TouchableOpacity style={styles.bookButton} onPress={handleBook}>
//             <Text style={styles.bookButtonText}>BOOK IT!</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#719AEA",
//     height: "45%",
//     borderRadius: 70,
//     marginTop: -50,
//     alignItems: "center",
//   },
//   backButton: {
//     position: "absolute",
//     marginTop: 90,
//     marginLeft: -170,
//     width: 30,
//     height: 30,
//   },
//   header: {
//     color: "white",
//     fontSize: 30,
//     fontWeight: "bold",
//     position: "absolute",
//     marginTop: 130,
//   },
//   feedbackImage: {
//     width: 180,
//     height: 180,
//     marginTop: 170,
//     left: -30,
//   },
//   containerr: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#fff",
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   optionsContainer: {

//     flexWrap: "wrap",
//     flexDirection:"row",
//     overflow:"visible"

//   },
//   option: {
//     padding:5,
//     borderRadius: 15,
//     borderWidth: 2,
//     borderColor: "#ccc",
//     marginBottom: 10,
//     width: "30%",
//     alignItems: "center",

//     },
//   selectedOption: {
//     backgroundColor: "#719AEA",
//     borderColor: "#719AEA",
//   },
//   optionText: {
//     color: "#000",
//   },
//   selectedOptionText: {
//     color: "#fff",
//   },
//   toggleContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginBottom: 20,
//     backgroundColor:"yellow"
//   },
//   toggleOption: {
//     padding: 10,
//     borderRadius: 5,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     flex: 1,
//     alignItems: "center",
//     marginHorizontal: 5,
//   },
//   selectedToggleOption: {
//     backgroundColor: "#719AEA",
//     borderColor: "#719AEA",
//   },
//   toggleOptionText: {
//     color: "#000",
//   },
//   selectedToggleOptionText: {
//     color: "#fff",
//   },
//   textInput: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 20,
//   },
//   bookButton: {
//     backgroundColor: "#719AEA",
//     padding: 15,
//     borderRadius: 5,
//     alignItems: "center",
//   },
//   bookButtonText: {
//     color: "#fff",
//     fontSize: 16,
//   },
// });

// export default MentorsAvailability;

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import axios from "axios";
import Star from "../../../assets/star_filled.png";
import Back from "../../../assets/back.png";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Calendar from "../../../assets/whiteCalendar.png";

const MentorsAvailability = ({ route, navigation }) => {
  const { name, image, description, rating, type } = route.params;
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [meetingType, setMeetingType] = useState("Personal");
  const [location, setLocation] = useState("");
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [dateOfBirthError, setDateOfBirthError] = useState("");

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirmDate = (selectedDate) => {
    hideDatePicker();
    if (selectedDate) {
      setDateOfBirth(selectedDate);
      setDateOfBirthError("");
    }
  };

  const durations = ["30 mins", "45 mins", "1h", "1h 30mins"];
  const availableTime = [
    {
      name: "Fares J.",
      availableTimes: ["7:00 am", "11:00 am", "2:00 pm", "4:00 pm", "7:00 pm"],
    },
    {
      name: "Mira D.",
      availableTimes: ["4:00 am", "11:00 am", "2:00 pm", "4:00 pm", "7:00 pm"],
    },
    {
      name: "John Doe",
      availableTimes: ["5:00 am", "11:00 am", "2:00 pm", "4:00 pm", "7:00 pm"],
    },
    {
      name: "Jane Smith",
      availableTimes: ["8:00 am", "11:00 am", "2:00 pm", "4:00 pm", "7:00 pm"],
    },
  ];

  const mentorTimes = availableTime.find((mentor) => mentor.name === name);

  const handleBook = async () => {
    if (!selectedTime || !selectedDuration || !dateOfBirth || !location) {
      alert("Please fill out all fields.");
      return;
    }

    const bookingDetails = {
      mentorName: name,
      time: selectedTime,
      duration: selectedDuration,
      meetingType,
      location,
      date: dateOfBirth.toDateString(),
      status: "upcoming",
    };

    try {
      const response = await axios.post(
        "http://10.0.0.21:3001/bookings",
        bookingDetails
      );
      if (response.status === 200) {
        alert("Booking confirmed!");
        navigation.navigate("Mentors");
      } else {
        alert("Failed to book. Please try again.");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("An error occurred while booking. Please try again.");
    }
  };

  const backToHome = () => {
    navigation.navigate("Mentors");
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={backToHome}>
          <Image source={Back} style={styles.backButton} />
        </TouchableOpacity>
        <Text style={styles.header}>{type}</Text>
        <Image source={image} style={styles.feedbackImage} />
      </View>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text
          style={{
            left: 230,
            fontSize: 22,
            top: -160,
            color: "white",
            fontWeight: "bold",
            position: "absolute",
          }}
        >
          {name}
        </Text>
        <Text
          style={{
            left: 230,
            fontSize: 22,
            top: -120,
            position: "absolute",
            color: "white",
            backgroundColor: "#032B79",
            fontWeight: "bold",
            padding: 7,
            width: 90,
            paddingLeft: 15,
            borderRadius: 30,
          }}
        >
          {rating}
        </Text>
        <Image
          style={{
            left: 285,
            position: "absolute",
            width: 25,
            height: 25,
            top: -110,
          }}
          source={Star}
        />
      </View>

      <ScrollView>
        <View style={styles.containerr}>
        <Text style={styles.label}>Select the date for {name}</Text>

          <TouchableOpacity style={styles.input} onPress={showDatePicker}>
            <Text style={styles.date}> 
              {dateOfBirth ? (
               `Date: ${ dateOfBirth.toDateString()}`
              ) : (
                // <Image source={Calendar} style={{width:40,height:80,marginleft:10,position:"absolute"}} />
                <Text>Choose a date</Text>
              )}
            </Text>
            <Image source={Calendar} style={{width:30,height:30,left:300,top:5,position:"absolute"}} />
          </TouchableOpacity>
          {dateOfBirth ? (
            <Text style={styles.errorText}>{dateOfBirthError}</Text>
          ) : null}
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            placeholder="date of birth"
            value={dateOfBirth}
            onConfirm={handleConfirmDate}
            onCancel={hideDatePicker}
          />
          {/* <TextInput
            style={styles.textInput}
            placeholder="Enter the date"
            value={dateOfBirth}
            onChangeText={setLocation}
          /> */}
          <Text style={styles.label}>Available Times for {name}</Text>
          <ScrollView
            style={styles.optionsContainer}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {mentorTimes ? (
              mentorTimes.availableTimes.map((time) => (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.option,
                    selectedTime === time && styles.selectedOption,
                  ]}
                  onPress={() => setSelectedTime(time)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedTime === time && styles.selectedOptionText,
                    ]}
                  >
                    {time}
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text>No available times for this mentor</Text>
            )}
          </ScrollView>

          <Text style={styles.label}>Select the duration</Text>
          <ScrollView
            style={styles.optionsContainer}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {durations.map((duration) => (
              <TouchableOpacity
                key={duration}
                style={[
                  styles.option,
                  selectedDuration === duration && styles.selectedOption,
                ]}
                onPress={() => setSelectedDuration(duration)}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedDuration === duration && styles.selectedOptionText,
                  ]}
                >
                  {duration}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.label}>Meeting Type</Text>
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[
                styles.toggleOption,
                meetingType === "Personal" && styles.selectedToggleOption,
              ]}
              onPress={() => setMeetingType("Personal")}
            >
              <Text
                style={[
                  styles.toggleOptionText,
                  meetingType === "Personal" && styles.selectedToggleOptionText,
                ]}
              >
                Personal
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleOption,
                meetingType === "Group" && styles.selectedToggleOption,
              ]}
              onPress={() => setMeetingType("Group")}
            >
              <Text
                style={[
                  styles.toggleOptionText,
                  meetingType === "Group" && styles.selectedToggleOptionText,
                ]}
              >
                Group
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Meeting Location</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter the location"
            value={location}
            onChangeText={setLocation}
          />

          <TouchableOpacity style={styles.bookButton} onPress={handleBook}>
            <Text style={styles.bookButtonText}>BOOK IT!</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#719AEA",
    height: "45%",
    borderRadius: 70,
    marginTop: -50,
    alignItems: "center",
  },
  CalendarImage: {
    width: 30,
    height: 80,
  },
  input:{
marginBottom:10
  },
  date: {
    backgroundColor:"#719AEA",
    padding:10,
    color:"white",
    borderRadius:15

  },
  backButton: {
    position: "absolute",
    marginTop: 90,
    marginLeft: -170,
    width: 30,
    height: 30,
  },
  header: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    position: "absolute",
    marginTop: 130,
  },
  feedbackImage: {
    width: 180,
    height: 180,
    marginTop: 170,
    left: -30,
  },
  containerr: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
 
  label: {
    fontSize: 15,
    marginBottom: 15,
    color: "#999999",
  },
  optionsContainer: {
    flexDirection: "row",
    overflow: "visible",
  },
  option: {
    padding: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 30,
    marginRight: 10,
    width: 100,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 13 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "#fff", // Ensure the background is white
  },
  selectedOption: {
    backgroundColor: "#719AEA",
    borderColor: "#719AEA",
  },
  optionText: {
    color: "#032B79",
    fontWeight: "700",
  },
  selectedOptionText: {
    color: "#fff",
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 13 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 8,
    backgroundColor: "#fff",
    borderColor: "grey",
    borderRadius: 10,
    height: 45,
  },
  toggleOption: {
    padding: 2.5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "white",
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
    borderRadius: 10,
    height: 30,
    top: 7,
  },
  selectedToggleOption: {
    backgroundColor: "#719AEA",
    borderColor: "#719AEA",
  },
  toggleOptionText: {
    textAlign: "center",
    color: "#719AEA",
    fontWeight: "700",
  },
  selectedToggleOptionText: {
    color: "#fff",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 15,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#EFEFEF",
  },
  bookButton: {
    backgroundColor: "#719AEA",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    width: "50%",
    left: 80,
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MentorsAvailability;
