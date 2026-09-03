export interface GenreScreenNavigation  {
    navigate: (screen: 'Books', params: { genre: string }) => void;
};

export interface RootStackParamList  {
  Genres: undefined;
  Books: {
    genre: string;
  };
};