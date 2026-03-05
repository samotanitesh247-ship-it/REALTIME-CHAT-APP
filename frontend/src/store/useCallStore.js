import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";
import toast from "react-hot-toast";

export const useCallStore = create((set, get) => ({
    localStream: null,
    remoteStream: null,
    callState: "idle", // 'idle', 'ringing', 'active'
    incomingCall: null,
    peerConnection: null,
    activeCallUserId: null,
    isVideoCall: true,

    startCall: async (userToCall, isVideo = true) => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: isVideo, audio: true });
            set({ localStream: stream, callState: "ringing", activeCallUserId: userToCall._id, isVideoCall: isVideo });

            const peerConnection = get().createPeerConnection(userToCall._id);
            stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));

            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);

            const socket = useAuthStore.getState().socket;
            const currentUser = useAuthStore.getState().authUser;

            socket.emit("callUser", {
                userToCall: userToCall._id,
                signalData: offer,
                from: currentUser._id,
                name: currentUser.fullName,
            });

        } catch (error) {
            console.error("Error starting call:", error);
            toast.error("Could not access camera/microphone");
            set({ callState: "idle", activeCallUserId: null });
        }
    },

    createPeerConnection: (remoteUserId) => {
        const peerConnection = new RTCPeerConnection({
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        });

        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                const socket = useAuthStore.getState().socket;
                socket.emit("iceCandidate", {
                    to: remoteUserId,
                    candidate: event.candidate,
                });
            }
        };

        peerConnection.ontrack = (event) => {
            set({ remoteStream: event.streams[0], callState: "active" });
        };

        set({ peerConnection });
        return peerConnection;
    },

    answerCall: async () => {
        const { incomingCall, peerConnection: existingPc } = get();
        if (!incomingCall) return;

        try {
            if (existingPc) existingPc.close();

            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            set({ localStream: stream, activeCallUserId: incomingCall.from, isVideoCall: true });

            const peerConnection = get().createPeerConnection(incomingCall.from);
            stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));

            await peerConnection.setRemoteDescription(new RTCSessionDescription(incomingCall.signal));
            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(answer);

            const socket = useAuthStore.getState().socket;
            socket.emit("answerCall", {
                signal: answer,
                to: incomingCall.from,
            });

            set({ callState: "active" });

        } catch (error) {
            console.error("Error answering call:", error);
            toast.error("Could not access camera/microphone");
            get().endCall();
        }
    },

    rejectCall: () => {
        const { incomingCall } = get();
        if (incomingCall) {
            const socket = useAuthStore.getState().socket;
            socket.emit("endCall", { to: incomingCall.from });
            set({ incomingCall: null, callState: "idle" });
        }
    },

    endCall: () => {
        const { activeCallUserId } = get();

        if (activeCallUserId) {
            const socket = useAuthStore.getState().socket;
            socket.emit("endCall", { to: activeCallUserId });
        }

        get().endCallLocal();
    },

    endCallLocal: () => {
        const { localStream, peerConnection } = get();

        if (localStream) {
            localStream.getTracks().forEach(track => track.stop());
        }

        if (peerConnection) {
            peerConnection.close();
        }

        set({
            localStream: null,
            remoteStream: null,
            callState: "idle",
            incomingCall: null,
            peerConnection: null,
            activeCallUserId: null,
        });
    },

    // Handlers for socket events
    handleIncomingCall: (data) => {
        const { callState } = get();
        if (callState === "idle") {
            set({ incomingCall: data, callState: "ringing" });
        }
    },

    handleCallAccepted: async (signal) =>{
        const {peerConnection} = get();
        if (peerConnection) {
            await peerConnection.setRemoteDescription(new RTCSessionDescription(signal));
            set({callState: "active"});
        }
    },

    handleIceCandidate: async (candidate) => {
        const {peerConnection} = get();
        if (peerConnection) {
            try {
                await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
            } catch (err) {
                console.error("Error adding received ice candidate", err);
            }
        }
    },

    toggleVideo: () => {
        const {localStream} = get();
        if (localStream) {
            const videoTrack = localStream.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.enabled = !videoTrack.enabled;
            }
        }
    },

    toggleAudio: () => {
        const { localStream } = get();
        if (localStream) {
            const audioTrack = localStream.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = !audioTrack.enabled;
            }
        }
    },
}));
