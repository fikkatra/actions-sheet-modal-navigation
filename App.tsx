import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import ActionSheet, { ActionSheetRef, SheetManager } from 'react-native-actions-sheet';



function HomeScreen({ navigation }) {
  const sheetId = "1";
  const actionSheetRef = useRef<ActionSheetRef>(null);
  
  const openActionSheet = () => {
    actionSheetRef.current?.show();
  }

  const navigateToModal = async () => {
    await SheetManager.hide(sheetId);
    navigation.navigate('Modal')
  }


  return (
    <>
      <View style={styles.container}>
        <Button title="Open Action Sheet" onPress={openActionSheet} />
        <Button title="Navigate to Modal screen" onPress={navigateToModal} />
      </View>
      <ActionSheet id={sheetId} ref={actionSheetRef} isModal={true}>
        <View style={styles.sheet}>
          <Button title="Navigate to Modal screen" onPress={navigateToModal} />
        </View>
      </ActionSheet>
    </>
  );
}

function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text>Modal Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Modal" component={ModalScreen} options={{presentation: 'modal'}}/>
      </Stack.Navigator>
    </NavigationContainer>
    <StatusBar style="auto" /></>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheet: {
    padding: 20,
  }
});


