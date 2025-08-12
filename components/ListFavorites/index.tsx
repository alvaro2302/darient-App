import Favorite from "@/app/helper/Favorite";
import Joke from "@/app/helper/Joke";
import UserLogged from "@/app/helper/UserLogged";
import React from "react";
import { FlatList } from "react-native";
import { Card, Text } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import FavoriteTrash from "../FavoriteTrash";
interface ListCategoriesProps {
  favorites: Favorite[];
  user: UserLogged;
  deleteFavorite: (joke: Joke, user: UserLogged) => Promise<void>;
}

const ListFavorites = (props: ListCategoriesProps) => {
  const { favorites,user,deleteFavorite } = props;
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={favorites}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            
            <Card style={{ alignSelf: "center", margin: 20, width: "90%" }}>
              <Card.Title
                title={"Chuck Norris Say:"}
                right={(props) => (
                  <FavoriteTrash 
                    joke={item.joke}
                    userLogged={user}
                    deleteFavorite={deleteFavorite}
                  />
                )}
              />

              <Card.Content>
                <Text variant="titleMedium">{item.joke.value}</Text>
              </Card.Content>
            </Card>
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
export default ListFavorites;
