import { APIProvider, Map } from "@vis.gl/react-google-maps";
import Navbar from "../../components/Navbar";
const ForMobile = () => (
    <APIProvider
        apiKey={"AIzaSyDIj9ZhXRQX7XsTB14AhZvUcVItytgSYRc"}
        onLoad={() => console.log("Maps API has loaded.")}
    >
        <div className="w-[100vw] h-[100vh]">
            <Map
                className="w-[100%] h-[90%]"
                defaultZoom={13}
                defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
                onCameraChanged={(ev) =>
                    console.log(
                        "camera changed:",
                        ev.detail.center,
                        "zoom:",
                        ev.detail.zoom
                    )
                }
            />
            <Navbar />
        </div>
    </APIProvider>
);

export default ForMobile;
