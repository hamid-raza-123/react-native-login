import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

// Validation schema for Yup
const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Password too short').required('Required'),
});

const App = () => {
  const [isSignup, setIsSignup] = useState(true); // Toggle between signup and login

  const handleFormSubmit = (values) => {
    if (isSignup) {
      console.log('Signup with:', values);
      // Handle signup logic here
    } else {
      console.log('Login with:', values);
      // Handle login logic here
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={SignupSchema}
        onSubmit={handleFormSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
            />
            {errors.email && touched.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {errors.password && touched.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

            <Button onPress={handleSubmit} title={isSignup ? 'Sign Up' : 'Log In'} />

            <TouchableOpacity onPress={() => setIsSignup(!isSignup)}>
              <Text style={styles.toggleText}>
                {isSignup ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
              </Text>
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
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  toggleText: {
    color: 'blue',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default App;
