import React from 'react';
import bookmark from '../../images/bookmark.svg';
import bookmarkHover from '../../images/bookmark_hover.svg';
import remove from '../../images/remove.svg';
import removeHover from '../../images/remove_hover.svg';
import cardImage from '../../images/example-image1.png';

export default function NewsCard() {
    const [isHover, setIsHover] = React.useState(false);
    const [isSaved, setIsSaved] = React.useState(false);

    function functionHovered() {
        setIsHover(true)
    }

    function functionEndHover() {
        setIsHover(false)
    }

    return (
        <div className='news-card'>
            <div className='news-card__keyword'>Keyword</div>
            <div className='news-card__function'>
                {isSaved ?
                    <img
                    src={isHover ? removeHover : remove}
                    alt='bookmark button'
                    onMouseEnter={functionHovered}
                    onMouseLeave={functionEndHover}
                    className='news-card__function-icon'
                />
                    :
                    <img
                    src={isHover ? bookmarkHover : bookmark}
                    alt='bookmark button'
                    onMouseEnter={functionHovered}
                    onMouseLeave={functionEndHover}
                    className='news-card__function-icon'
                />}
                <div className='news-card__function-message'>Sign in to save article</div>
            </div>
            <img src={cardImage} alt='illustrator image for news article' className='news-card__image' />
            <div className='news-card__text'>
                <p className='news-card__date'>November 4, 2020</p>
                <h5 className='news-card__title'>Everyone Needs a Special 'Sit Spot' in Nature</h5>
                <p className='news-card__paragraph'>Ever since I read Richard Louv's influential book, "Last Child in the Woods," the idea of having a special "sit spot" has stuck with me. This advice, which Louv attributes to nature educator Jon Young, is for both adults and children to find find find find find</p>
                <p className='news-card__source'>TREEHUGGER</p>
            </div>
        </div>
    )
}