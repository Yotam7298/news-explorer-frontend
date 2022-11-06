import React from "react";

export default function SearchForm() {
    return (
        <form className='search-form'>
            <fieldset className='search-form__fieldset'>
                <input type='text' name='search' placeholder='Enter topic' className='search-form__input' />
                <button type='submit' className='search-form__submit'>Search</button>
            </fieldset>
        </form>
    )
}