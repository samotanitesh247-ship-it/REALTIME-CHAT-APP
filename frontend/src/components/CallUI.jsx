import { useEffect, useRef, useState } from "react";
import { useCallStore } from "../store/useCallStore";
import { Phone, PhoneOff, Video, VideoOff, Mic, MicOff } from "lucide-react";

const CallUI = () => {
    const {
        callState,
        incomingCall,
        localStream,
        remoteStream,
        answerCall,
        rejectCall,
        endCall,
        toggleVideo,
        toggleAudio,
        isVideoCall
    } = useCallStore();

    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);

    const [isMicMuted, setIsMicMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);

    useEffect(() => {
        if (localVideoRef.current && localStream) {
            localVideoRef.current.srcObject = localStream;
        }
    }, [localStream]);

    useEffect(() => {
        if (remoteVideoRef.current && remoteStream) {
            remoteVideoRef.current.srcObject = remoteStream;
        }
    }, [remoteStream]);

    const handleToggleMic = () => {
        toggleAudio();
        setIsMicMuted((prev) => !prev);
    };

    const handleToggleVideo = () => {
        toggleVideo();
        setIsVideoOff((prev) => !prev);
    };

    if (callState === "idle") return null;
    if (callState === "ringing" && incomingCall) {
        return (
            <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center backdrop-blur-sm">
                <div className="bg-base-100 p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-6 max-w-sm w-full mx-4 border border-base-300">
                    <div className="animate-pulse bg-primary/20 p-4 rounded-full">
                        <Phone size={48} className="text-primary animate-bounce" />
                    </div>
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-2">{incomingCall.name}</h2>
                        <p className="text-base-content/60">Incoming Call...</p>
                    </div>
                    <div className="flex gap-4 w-full mt-4">
                        <button
                            onClick={rejectCall}
                            className="btn btn-error flex-1 rounded-full gap-2"
                        >
                            <PhoneOff size={20} />
                            Decline
                        </button>
                        <button
                            onClick={answerCall}
                            className="btn btn-success flex-1 rounded-full gap-2"
                        >
                            <Phone size={20} />
                            Accept
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    if (callState === "ringing" && !incomingCall) {
        return (
            <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center backdrop-blur-sm">
                <div className="bg-base-100 p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-6 max-w-sm w-full mx-4 border border-base-300">
                    <div className="animate-pulse bg-primary/20 p-4 rounded-full">
                        <Phone size={48} className="text-primary" />
                    </div>
                    <div className="text-center">
                        <h2 className="text-xl font-bold mb-2">Calling...</h2>
                        <p className="text-base-content/60">Waiting for answer</p>
                    </div>
                    <div className="flex w-full mt-4">
                        <button
                            onClick={endCall}
                            className="btn btn-error w-full rounded-full gap-2"
                        >
                            <PhoneOff size={20} />
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (callState === "active") {
        return (
            <div className="fixed inset-0 bg-black z-50 flex flex-col">
                <div className="flex-1 relative flex items-center justify-center bg-zinc-900">
                    {remoteStream ? (
                        <video
                            ref={remoteVideoRef}
                            autoPlay
                            playsInline
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    )}
                    {localStream && isVideoCall && (
                        <div className="absolute top-6 right-6 w-32 md:w-48 bg-base-300 rounded-xl overflow-hidden shadow-2xl border-2 border-base-100 transition-all duration-300">
                            <video
                                ref={localVideoRef}
                                autoPlay
                                playsInline
                                muted
                                className={`w-full h-full object-cover ${isVideoOff ? 'hidden' : 'block'}`}
                            />
                            {isVideoOff && (
                                <div className="w-full aspect-video flex items-center justify-center bg-base-300">
                                    <VideoOff className="text-base-content/50" />
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="bg-base-100/95 backdrop-blur-md p-6 flex justify-center gap-6 border-t border-base-300/50">
                    <button
                        onClick={handleToggleMic}
                        className={`btn btn-circle btn-lg ${isMicMuted ? "btn-error" : "bg-base-300 hover:bg-base-200 border-none"
                            }`}
                    >
                        {isMicMuted ? <MicOff size={24} /> : <Mic size={24} />}
                    </button>

                    {isVideoCall && (
                        <button
                            onClick={handleToggleVideo}
                            className={`btn btn-circle btn-lg ${isVideoOff ? "btn-error" : "bg-base-300 hover:bg-base-200 border-none"
                                }`}
                        >
                            {isVideoOff ? <VideoOff size={24} /> : <Video size={24} />}
                        </button>
                    )}

                    <button
                        onClick={endCall}
                        className="btn btn-circle btn-lg btn-error hover:scale-105 transition-transform"
                    >
                        <PhoneOff size={24} />
                    </button>
                </div>
            </div>
        );
    }

    return null;
};

export default CallUI;
