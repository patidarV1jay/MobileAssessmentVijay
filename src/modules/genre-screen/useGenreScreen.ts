import { useNavigation } from "@react-navigation/native";
import { GenreScreenNavigation } from "../../types/";

const useGenreScreen = () => {
    const navigation = useNavigation<GenreScreenNavigation>();

    const handleGenrePress = (genre: string) => {
        navigation.navigate('Books', { genre });
    };

    return {
        handleGenrePress
    };
}

export default useGenreScreen;

