import NetInfo from "@react-native-community/netinfo";


// Value	    Platform	    Description
// none	        Android, iOS	No network connection is active
// unknown	    Android, iOS	The network state could not be determined
// cellular	    Android, iOS	The active network is a cellular connection
// wifi	        Android, iOS	The active network is a Wifi connection
// bluetooth	Android	        The active network over Bluetooth
// ethernet	    Android	        The active network over a wired ethernet connection
// wimax	    Android	        The active network over a WiMax connection
export const GetConnectionInfo = async () => {
    return await NetInfo.getConnectionInfo()
        // .then(data => {
        //     console.log("Connection type", data.type); // none, uknown, cellular, wifi, bluetooth, ethernet, wimax
        //     console.log("Connection effective type", data.effectiveType);  // unknown, 2g, 3g, 4g
        // });
}

export const DeviceIsConnected = async () => {
    return await NetInfo.isConnected.fetch() //returns boolean
}