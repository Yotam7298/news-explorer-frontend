import image1 from '../images/example-image1.png';
import image2 from '../images/example-image2.png';
import image3 from '../images/example-image3.png';
import image4 from '../images/example-image4.png';
import image5 from '../images/example-image5.png';

const articles = [
  {
    _id: 1,
    keyword: 'Nature',
    image: image1,
    date: 'November 4, 2020',
    title: 'Everyone Needs a Special "Sit Spot" in Nature',
    text: `Ever since I read Richard Louv's influential book, "Last Child in the Woods," the idea of having a special "sit spot" has stuck with me. This advice, which Louv attributes to nature educator Jon Young, is for both adults and children to find...`,
    source: 'TREEHUGGER',
    marked: true,
  },
  {
    _id: 2,
    keyword: 'Nature',
    image: image2,
    date: 'February 19, 2019',
    title: 'Nature makes you better',
    text: `We all know how good nature can make us feel. We have known it for millennia: the sound of the ocean, the scents of a forest, the way dappled sunlight dances through leaves.`,
    source: 'NATIONAL GEOGRAPHIC',
    marked: false,
  },
  {
    _id: 3,
    keyword: 'Yellowstone',
    image: image3,
    date: 'October 19, 2020',
    title: 'Nostalgic Photos of Tourists in U.S. National Parks',
    text: `Uri Løvevild Golman and Helle Løvevild Golman are National Geographic Explorers and conservation photographers who just completed a project and book they call their love letter to...`,
    source: 'NATIONAL GEOGRAPHIC',
    marked: true,
  },
  {
    _id: 4,
    keyword: 'Parks',
    image: image4,
    date: 'November 4, 2020',
    title: 'Grand Teton Renews Historic Crest Trail',
    text: `“The linking together of the Cascade and Death Canyon trails, at their heads, took place on October 1, 1933, and marked the first step in the realization of a plan whereby the hiker will be...`,
    source: 'NATIONAL PARKS TRAVELER',
    marked: false,
  },
  {
    _id: 5,
    keyword: 'Photography',
    image: image5,
    date: 'March 16, 2020',
    title: `Scientists Don't Know Why Polaris Is So Weird `,
    text: `Humans have long relied on the starry sky to push into new frontiers, sail to the very edge of the world and find their way back home again. Even animals look to the stars to guide them.`,
    source: 'TREEHUGGER',
    marked: true,
  },
];

export default articles;
