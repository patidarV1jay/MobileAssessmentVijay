import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GenresScreen, BooksScreen } from '../modules';



const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Genres"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Genres" component={GenresScreen} />
      <Stack.Screen name="Books" component={BooksScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
