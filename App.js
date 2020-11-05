import "react-native-gesture-handler";
import React from "react";
import DiscoverScreen from "./screens/Discover.screen";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "@react-navigation/stack";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import DetailsScreen from "./screens/Details.screen";

const Stack = createSharedElementStackNavigator(
  {
    Home: {
      screen: DiscoverScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
  },
  {},
  {}
);

// function App() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="Home"
//         component={DiscoverScreen}
//         options={{
//           title: "Discover",
//           // headerTransparent: true,
//           headerStyle: {
//             backgroundColor: "#f7f7f7",
//             shadowOpacity: 0,
//           },
//           headerTitleStyle: {
//             fontSize: 30,
//             fontWeight: "700",
//           },
//         }}
//       />
//     </Stack.Navigator>
//   );
// }
export default createAppContainer(Stack);
