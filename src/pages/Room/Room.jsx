import {
  ControlBar,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
  RoomContext,
} from "@livekit/components-react";
import { Room, Track } from "livekit-client";
import "@livekit/components-styles";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../config/constant";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useCall } from "../../Provider/Provider";
import getLiveKitUrl from "../../hooks/users/getLiveKitUrl";

export default function RoomPage() {
  const [token, setToken] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { handleEndCall } = useCall();
  const [liveKitUrl, setLiveKitUrl] = useState("");

  let roomName = searchParams.get("roomName");
  let username = searchParams.get("username");
  let peerSocketId = searchParams.get("peerSocketId");

  const [room] = useState(
    () =>
      new Room({
        adaptiveStream: true,
        dynacast: true,
      })
  );

  // Connect to room
  useEffect(() => {
    if (token && liveKitUrl) {
      let mounted = true;
      const connect = async () => {
        if (mounted) {
            await room.connect(liveKitUrl, token);

            // ✅ Automatically turn on mic (and optionally camera)
            room.localParticipant.setMicrophoneEnabled(true);
            // room.localParticipant.setCameraEnabled(true); // if you want video auto-on
        }
      };
      connect();

      // ✅ instant redirect when disconnected
      room.on("disconnected", () => {
        handleEndCall(peerSocketId);
        ("close auto matic ? ");
      });

      return () => {
        mounted = false;
        // room.disconnect();
      };
    }
  }, [room, token, navigate, handleEndCall, peerSocketId, liveKitUrl]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios(
        `${BASE_URL}/liveKit/get-token?roomName=${roomName}&username=${username}`
      );
      const { token } = data;
      setToken(token);
    };
    fetch();
  }, [roomName, username]);

  useEffect(() => {
    const fetchLiveKitUrl = async () => {
      try {
        const { data } = await getLiveKitUrl();
        if (data.success) {
          setLiveKitUrl(data.data.url);
        }
      } catch (error) {
        console.error("Failed to fetch LiveKit URL:", error);
      }
    };
    fetchLiveKitUrl();
  }, []);

  return (
    <RoomContext.Provider value={room}>
      <div data-lk-theme="default" style={{ height: "100vh" }}>
        <MyVideoConference />
        <RoomAudioRenderer />
        <ControlBar />
      </div>
    </RoomContext.Provider>
  );
}

function MyVideoConference() {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  );

  const localTrack = tracks.find((t) => t.participant.isLocal);
  const remoteTracks = tracks.filter((t) => !t.participant.isLocal);

  return (
    <div className="w-full h-[90vh] relative bg-black">
      {/* Remote participant(s) full screen */}
      <div className="w-full h-full flex items-center justify-center">
        {remoteTracks.length > 0 ? (
          remoteTracks.map((track) => (
            <ParticipantTile
              key={track.participant.identity + track.source}
              trackRef={track}
              className="w-full h-full object-cover"
            />
          ))
        ) : (
          <div className="text-white text-xl">Waiting for other user...</div>
        )}
      </div>

      {/* Local participant small top-right corner */}
      {localTrack && (
        <div className="absolute top-4 right-4 w-40 h-28 rounded-lg overflow-hidden shadow-lg border-2 border-white">
          <ParticipantTile trackRef={localTrack} />
        </div>
      )}
    </div>
  );
}
