import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Image } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import Back from '../assets/arrowBack.png';

const CancelBookingScreen = ({ navigation }) => {
//   const validationSchema = Yup.object().shape({
//     reason: Yup.string().required("Please select a reason"),
//     otherReason: Yup.string().when("reason", {
//       is: "Other",
//       then: Yup.string().required("Please enter a reason"),
      
//     }),
    
//   });
const validationSchema = Yup.object().shape({
    reason: Yup.string().required("Please select a reason"),
    otherReason: Yup.string(),
  });


  

  const reasons = [
    "Schedule Change",
    "Weather Conditions",
    "Unexpected Work",
    "Childcare Issue",
    "Other",
  ];


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={Back} style={{ top:10,left:0, width:40,height:40}}/>

      </TouchableOpacity>
      <Text style={styles.title}>Cancel Booking</Text>
      <Text style={styles.subtitle}>Please select the reason for cancellations:</Text>
      <Formik
        initialValues={{ reason: "", otherReason: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          navigation.goBack()        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
          <View>
            {reasons.map((reason) => (
              <TouchableOpacity
                key={reason}
                onPress={() => setFieldValue("reason", reason)}
                style={styles.radioContainer}
              >
                <View style={styles.radioCircle}>
                  {values.reason === reason && <View style={styles.selectedRb} />}
                </View>
                <Text style={styles.radioText}>{reason}</Text>
              </TouchableOpacity>
            ))}
            {values.reason === "Other" && (
              <TextInput
                style={styles.textInput}
                placeholder="Enter your reason"
                onChangeText={handleChange("otherReason")}
                onBlur={handleBlur("otherReason")}
                value={values.otherReason}
              />
            )}
            <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Cancel Appointment</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 18,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#96979A",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  selectedRb: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#719AEA",
  },
  radioText: {
    fontSize: 16,
    marginBottom:10,
    top:5
  },
  textInput: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    padding: 10,
    marginVertical: 20,
    backgroundColor:"#FAFAFAFA"
  },
  submitButton: {
    backgroundColor: "#719AEA",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    top:10
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CancelBookingScreen;
