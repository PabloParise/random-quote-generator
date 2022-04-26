import { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import './App.css';
import { faDigitalTachograph } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [quotes, setQuotes] = useState('');     //Hook for setting the state and updating it

  const colorRef = useRef();
  let colors = [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857'
  ];

  const APIURL = 'https://type.fit/api/quotes'; //The API url

  const getQuote = () => { 
    fetch(APIURL)
      .then(response => response.json()) 
      .then(data => {
        let randomNum = Math.floor(Math.random() * data.length);
        setQuotes(data[randomNum]);
      })
      .catch(err => console.error(err));
  };                                            //Function for  

  useEffect(() => {
    getQuote();
  }, []); //This is for getting a random quote when refreshing the page

  useEffect(() => {
    colorRef.current.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  }, [quotes]);

  return (
    <div className="App">
      <section className="App-content" ref={colorRef}>
        <Card id='quote-box'>
          <Card.Body>
            <blockquote id='text'>
              <p>
                {quotes.text}
              </p>
              <footer className="blockquote-footer" id='author'>
                <cite>{quotes.author}</cite>
              </footer>
            </blockquote>
          <Card.Footer id="card-footer">
            <Button id='new-quote' variant='outline-dark' onClick={getQuote}>
              New Quote
            </Button>
            <a id='tweet-quote' href={'https://twitter.com/intent/tweet'} target="_blank" title='Tweet Quote'>
            <FontAwesomeIcon icon={faTwitter} border id='twitter-icon'/>
            </a>
          </Card.Footer>
          </Card.Body>
        </Card>
      </section>
    </div>
  );
}

export default App;
