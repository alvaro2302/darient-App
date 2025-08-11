import Category from "@/app/helper/Category";
import React from "react";
import { FlatList } from "react-native";
import { Avatar, Card } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
interface ListCategoriesProps {
    listCategories: Category[];
    navigatoToScreenJokes?: (category: string) => void;
}
const ListCategories = (props: ListCategoriesProps) => {
 const { listCategories, navigatoToScreenJokes } = props;
 return ( 
    <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1}}>
        <FlatList
            data={listCategories}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (

                <Card style={{ margin: 10 }} onPress={() => navigatoToScreenJokes && navigatoToScreenJokes(item.name)}>
                    <Card.Title
                        title={item.name}
                        left={(props) => <Avatar.Icon {...props} icon="folder" />}
                    />
                </Card>
            )}
        />
        </SafeAreaView>
    </SafeAreaProvider>
 );
}
export default ListCategories;