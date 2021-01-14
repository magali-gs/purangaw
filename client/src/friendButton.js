import { useState, useEffect } from "react";
import axios from "./axios";

export default function FriendButton({ otherUserId, userId }) {
    const [buttonTxt, setButtonTxt] = useState("Friend Button");

    useEffect(() => {
        axios.get("/friendship-status/" + otherUserId)
            .then(({ data }) => {
                const text = friendshipStatusButtonTxt(data, userId);
                setButtonTxt(text);
            }).catch((error) => {
                console.log("error in /friendship-status/", error);
            });
    }, [otherUserId]);

    function handleClick(e) {
        console.log("handleClick", e.target.name);
        e.preventDefault();
        axios.post("/friendship-action", {action: buttonTxt, otherUserId: otherUserId})
            .then(() => {
                console.log("post requets to /friendship-action");
            });
    }

    return (
        <button onClick={(e) => handleClick(e)} name={buttonTxt}>
            {buttonTxt}
        </button>
    );
}


function friendshipStatusButtonTxt(friendshipStatus, userId) {
    const BUTTON_TEXT = {
        MAKE_REQUEST: "Make friend request",
        CANCEL_REQUEST: "Cancel friend request",
        ACCEPT_REQUEST: "Accept friend request",
        UNFRIEND: "Unfriend",
    };
    if (friendshipStatus.length === 0) {
        return BUTTON_TEXT.MAKE_REQUEST;
    } else {
        const { recipient_id, accepted } = friendshipStatus[0];
        if (accepted) {
            return BUTTON_TEXT.UNFRIEND;
        } else if (!accepted && recipient_id == userId) {
            return BUTTON_TEXT.ACCEPT_REQUEST;
        } else if (!accepted && recipient_id !== userId) {
            return BUTTON_TEXT.CANCEL_REQUEST;
        }
    }
}
