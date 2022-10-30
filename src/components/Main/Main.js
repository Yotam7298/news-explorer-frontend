import React from 'react';

export default function Main(props) {
    return (
        <div className='main'>
            {props.isSaved ?
                <props.elementList cardTemplate={props.element} isSaved={true} />
            :
                <div className='main__content'>
                    <h3 className='main__title'>Search results</h3>
                    <props.elementList cardTemplate={props.element} isSaved={false} />
                    <button className='main__button'>Show more</button>
                </div>
            }

        </div>
    )
}