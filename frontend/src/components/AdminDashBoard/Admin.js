import React from 'react';
import styles from './Admin.module.css';
import Track1 from '../../img/Track 1.png';
import Track2 from '../../img/track 2.png';
import Track3 from '../../img/track 3.png';
import { useNavigate } from 'react-router-dom';

const Admin = () => {

  const navigate = useNavigate();
  const handleMenuClick = () => {
    alert('Menu clicked!');
  };

  const tracks = [
    { id: 1, title: 'Track-1', description: 'Smart Manufacturing and Prototyping', image: Track1 },
    { id: 2, title: 'Track-2', description: 'Technology and Innovation - Hardware', image: Track2 },
    { id: 3, title: 'Track-3', description: 'Technology and Innovation - Software', image: Track3 },
    { id: 4, title: 'Track-4', description: 'Technology and Innovation - Software', image: Track3 },
    { id: 5, title: 'Track-5', description: 'Technology and Innovation - Software', image: Track3 },
    { id: 6, title: 'Track-6', description: 'Technology and Innovation - Software', image: Track3 },
    { id: 7, title: 'Track-7', description: 'Technology and Innovation - Software', image: Track3 },
    { id: 8, title: 'Track-8', description: 'Technology and Innovation - Software', image: Track3 },
    { id: 9, title: 'Track-9', description: 'Technology and Innovation - Software', image: Track3 },
    { id: 10, title: 'Track-10', description: 'Technology and Innovation - Software', image: Track3 },
    { id: 11, title: 'Track-11', description: 'Technology and Innovation - Software', image: Track3 },
    { id: 12, title: 'Track-12', description: 'Technology and Innovation - Software', image: Track3 },
  ];

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div className={styles.menuIcon} onClick={handleMenuClick}>
          ☰
        </div>
      </header>
      <div className={styles.tracks}>
        {tracks.map((track) => (
          <div
            key={track.id}
            className={`${styles.track} ${
              styles[`track${track.id % 3 === 1 ? '-1' : track.id % 3 === 2 ? '-2' : '-3'}`]
            }`}
          >
            <div className={styles.content}>
              <h3 onClick={() => navigate('/TrackDetail', { state: track })}>{track.title}</h3>
              <p>{track.description}</p>
            </div>
            <img src={track.image} alt={track.title} className={styles.image} />
          </div>
        ))}
      </div>
      <footer className={styles.footer}>
        <button>Slot</button>
        <button>Paper</button>
        <button>Results</button>
        <button>Authors</button>
      </footer>
    </div>
  );
};

export default Admin;