import Linkify from 'react-linkify';

// const LineBreak = () => <br />;

const CustomLinkify = ({ children }) => (
  <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
    <a href={decoratedHref} 
       key={key} 
       target="_blank" 
       rel="noopener noreferrer"
       style={{ textDecoration: 'none' }} >
      {decoratedText}
    </a>
  )}>
    {children}
  </Linkify>
);

export default function ItemCard(props) {
    const { _id, image, ingredients, instructions, title } = props;
    const imagePath =`http://localhost:5001/uploads/${image}`;

    return (
      <div key={_id} className="item-card">
        <h1>{title}</h1>
        <div className="group-1">
          <p>
            <img src={imagePath} alt={title} style={{ width: '400px', height: '300px' }} />
          </p>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index} className="dot-list">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'sans-serif', fontSize: '1rem', padding: '1rem 2rem',   }}>
            <CustomLinkify >{instructions}</CustomLinkify>
          </pre>
        </div>
      </div>
    );
  }