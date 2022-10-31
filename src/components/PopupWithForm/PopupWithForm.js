import React from 'react';

export default function PopupWithForm() {
    return (
        <div className='popup'>
            <div className='popoup__content'>
                <button className='popup__close' />
                <form className='popup__form'>
                    <h3 className='popup__title'>Sign in</h3>
                    <fieldset className='popup__fieldset'>
                        <label></label>
                    </fieldset>
                </form>
            </div>
        </div>
    )
}