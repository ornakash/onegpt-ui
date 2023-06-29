import './Direction.css';


//arguments decide what the component will look like
export const createDirection = ({
  label = 'Or press Enter &#9166;',
  color
}) => {
  const directions = document.createElement('span');
  directions.className = 'direction-span';

  directions.innerHTML = label;
  directions.style.color = color;


  return directions;
};