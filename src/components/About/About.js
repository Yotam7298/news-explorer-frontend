import React from 'react';
import aboutImage from '../../images/about-image.png';

export default function About() {
  return (
    <div className='about'>
      <img
        src={aboutImage}
        alt='About the author section'
        className='about__image'
      />
      <div className='about__text'>
        <h3 className='about__title'>About the author</h3>
        <p className='about__paragraph'>
          This project was made by Yotam Yakov. I am web developer working with
          React and node.js with express.js for the API of this project.
        </p>
        <p className='about__paragraph'>
          This project was made as a final project for Masterschool -
          Practicum's web developer program where I have aquired all those
          skills, that could help create a web app for any customer by their
          design and requested functionality.
        </p>
      </div>
    </div>
  );
}
