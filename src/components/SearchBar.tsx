import { View } from "./Themed";
import { StyleSheet, TextInput } from "react-native";
import { EvilIcons } from '@expo/vector-icons';
import { useState, useEffect } from "react";
import SearchFilter from "./SearchFilter";
import Instructions from "./Instructions";
import { BuildingData } from "../types";


export default function SearchBar({ buildingData }: any) {

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedData,setSelectedData] = useState<BuildingData|null>(null)

    const handleSearchQuery = (value: string) => {
        setSearchQuery(value);
    }

    return (
        <View>
            <View style={styles.searchContainer}>
                <EvilIcons
                    name="search"
                    size={24}
                    color="#ffffff4d"
                />
                <TextInput
                    style={styles.searchbox}
                    value={searchQuery}
                    placeholder="Search Here"
                    placeholderTextColor='#ffffff4d'
                    onChangeText={handleSearchQuery}
                />
            </View>
            {
                searchQuery.length>0 && <SearchFilter searchQuery={searchQuery} setSearchQuery={setSearchQuery} data={buildingData} setSelectedData={setSelectedData}/>
            }
            
            <Instructions selectedData={selectedData}/>
        </View>
    )
}

const styles = StyleSheet.create({
    searchContainer: {
       padding:10,
       flexDirection:"row",
       backgroundColor:'#373636',
       borderRadius:10,
       alignItems:"center",
       gap:10,
    },
    searchbox: {
        fontSize:15,
        width:"90%",
        color:"#ffffff"
    },
})