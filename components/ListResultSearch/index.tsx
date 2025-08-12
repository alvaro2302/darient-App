import jokeRandomResponse from "@/app/helper/JokeRandomResponse";
import { FlatList } from "react-native";
import { ActivityIndicator, Card, Text } from "react-native-paper";
interface ListResultSearchProps {
    listSearch: jokeRandomResponse[];
    loading: boolean;
}

const ListResultSearch = (props: ListResultSearchProps) => {
    const { listSearch, loading } = props
    if(loading) {
        return (
            <>
            <ActivityIndicator size="large" style={{ flex: 1, justifyContent: "center", alignItems: "center" }} />
            </>
        )
    }
    return (
        <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingBottom: 75 }}
            data={listSearch}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Card style={{ alignSelf: "center", margin: 10, width: "90%" }}>
                <Card.Title title={"Chuck Norris Say:"} />

                <Card.Content>
                  <Text variant="titleMedium">{item.value}</Text>
                </Card.Content>
              </Card>
            )}
          />
    );
}
export default ListResultSearch;