import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from "react-native-screens";
import { createNativeStackNavigator } from "react-native-screens/native-stack";

enableScreens();

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details (flip)"
        onPress={() => {
          navigation.navigate("Flip", {
            itemId: 86,
            otherParam: "flippy",
          });
        }}
      />

      <Button
        title="Go to Details (standard modal)"
        onPress={() => {
          navigation.navigate("Slide", {
            itemId: 42,
            otherParam: "standard",
          });
        }}
      />
    </View>
  );
}

function DetailsScreen({ route, navigation }) {
  const { itemId } = route.params;
  const { otherParam } = route.params;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.push("Details", {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <StatusBar style="light" animated={true} />
    </View>
  );
}

const Stack = createNativeStackNavigator();
const FlipStack = createNativeStackNavigator();
const SlideStack = createNativeStackNavigator();

// Putting a set of modal screens in their own navigator is necessary to have a header
function Flip({ route }) {
  return (
    <FlipStack.Navigator>
      <FlipStack.Screen
        name="Details"
        initialParams={route.params}
        component={DetailsScreen}
      />
    </FlipStack.Navigator>
  );
}

function Slide({ route }) {
  return (
    <SlideStack.Navigator>
      <SlideStack.Screen
        name="Details"
        initialParams={route.params}
        component={DetailsScreen}
        options={{ headerShown: false }}
      />
    </SlideStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Flip"
          component={Flip}
          options={{
            stackPresentation: "modal",
            stackAnimation: "flip",
            headerTitle: "Flip",
          }}
        />
        <Stack.Screen
          name="Slide"
          component={Slide}
          options={{ stackPresentation: "modal", headerTitle: "Slide" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
