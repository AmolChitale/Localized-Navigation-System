import React, { useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import Colors from '../../constants/Colors';
import { useColorScheme } from '../../components/useColorScheme';
import { useClientOnlyValue } from '../../components/useClientOnlyValue';
import { BuildingData } from '@/src/types';

// creating a context to share data between screens

const DataContext = React.createContext<{
  sharedData: BuildingData[];
  setSharedData: React.Dispatch<React.SetStateAction<BuildingData[]>>;
  buildingName: string;
  setBuildingName: React.Dispatch<React.SetStateAction<string>>;
  part:number,
  setPart:React.Dispatch<React.SetStateAction<number>>;
  total:number,
  setTotal:React.Dispatch<React.SetStateAction<number>>;
}>({
  sharedData: [],
  setSharedData: () => { },
  buildingName: "",
  setBuildingName: () => { },
  part:0,
  setPart:()=>{},
  total:0,
  setTotal:()=>{},
});


// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  
  const colorScheme = useColorScheme();
  const [sharedData, setSharedData] = useState<BuildingData[]>([]);
  const [buildingName,setBuildingName] = useState<string>("");
  const [part,setPart] = useState<number>(0);
  const [total,setTotal] = useState<number>(0);

  return (
    <DataContext.Provider value={{ sharedData, setSharedData,buildingName,setBuildingName,part,setPart,total,setTotal }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: useClientOnlyValue(false, true),
          unmountOnBlur: true
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Scanner',
            tabBarIcon: ({ color }) => <TabBarIcon name="camera-retro" color={color} />
          }}
        />
        <Tabs.Screen
          name="two"
          options={{
            title: 'Search Place',
            tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
          }}
        />
      </Tabs>
    </DataContext.Provider>
  );
}

export const useSharedData = () => React.useContext(DataContext);