import React from "react";

export default function SavedNewsHeader(props) {
    return (
        <div className='saved-header'>
            <props.navbar saved={true} />
            <div className='saved-header__content'>
                <p className='saved-header__pretitle'>Saved articles</p>
                <h2 className='saved-header__title'>Elise, you have 5 saved articles</h2>
                <h3 className='saved-header__keywords'>
                    By keywords:&nbsp;
                    <span className='saved-header__keywords-content'>
                        Nature, Yellowstone, and 2 other
                    </span>
                </h3>
            </div>
        </div>
    )
}