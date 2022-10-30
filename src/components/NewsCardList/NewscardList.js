import React from "react";

export default function NewsCardList(props) {
    return (
        <div className="cards-list">
            <props.cardTemplate isSaved={props.isSaved} />
            <props.cardTemplate isSaved={props.isSaved} />
            <props.cardTemplate isSaved={props.isSaved} />
            <props.cardTemplate isSaved={props.isSaved} />
            <props.cardTemplate isSaved={props.isSaved} />
        </div>
    )
}