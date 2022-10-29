import React from 'react';
import bookmark from '../../images/bookmark.svg';
import bookmarkHover from '../../images/bookmark_hover.svg';
import remove from '../../images/remove.svg';
import removeHover from '../../images/remove_hover.svg';
import cardImage from '../../images/example-image1.png';

export default function NewsCard(props) {
    const [isHover, setIsHover] = React.useState(false);
    const [isMessageShow, setIsMessageShow] = React.useState(false);

    function functionHovered() {
        setIsHover(true)
    }

    function functionEndHover() {
        setIsHover(false)
    }

    function flipMessageShow() {
        setIsMessageShow(!isMessageShow);
    }

    return (
        <div className='news-card'>
            <div className='news-card__keyword'>Keyword</div>
                {props.isSaved ?
                    <div className='news-card__function'>
                        <img
                        src={isHover ? removeHover : remove}
                        alt='bookmark button'
                        onMouseEnter={functionHovered}
                        onMouseLeave={functionEndHover}
                        onClick={flipMessageShow}
                        className='news-card__function-icon'
                        />
                        <div className={`news-card__function-message ${isMessageShow ? 'news-card__function-message_show' : ''}`}>
                            Remove from saved
                        </div>
                    </div>
                    :
                    <div className='news-card__function'>
                        <img
                        src={isHover ? bookmarkHover : bookmark}
                        alt='bookmark button'
                        onMouseEnter={functionHovered}
                        onMouseLeave={functionEndHover}
                        onClick={flipMessageShow}
                        className='news-card__function-icon'
                        />
                        <div className={`news-card__function-message ${isMessageShow ? 'news-card__function-message_show' : ''}`}>
                            Sign in to save article
                        </div>
                    </div>
                }
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