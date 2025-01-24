import React from 'react';
import styles from './Admin.module.css';
import Track1 from '../../img/Track 1.jpg';
import Track2 from '../../img/Track 2.jpg';
import Track3 from '../../img/Track 3.jpg';
import Track4 from '../../img/Track 4.jpg';
import Track5 from '../../img/Track 5.jpg';
import Track6 from '../../img/Track 6.png';
import Track7 from '../../img/Track 7.jpg';
import Track8 from '../../img/Track 8.jpg';
import Track9 from '../../img/Track 9.jpg';
import Track10 from '../../img/Track 10.jpg';
import Track11 from '../../img/Track 11.jpg';
import Track12 from '../../img/Track 12.jpg';
import Track13 from '../../img/Track 13.jpg';
import { useNavigate } from 'react-router-dom';

const Admin = () => {

  const navigate = useNavigate();
  const handleMenuClick = () => {
    alert('Menu clicked!');
  };

  const tracks = [
    { id: 1, title: 'Session-1', description: 'Artificial Intelligence, Intelligent system & Automation', image: Track1 },
    { id: 2, title: 'Session-2', description: 'Distributed and Cloud Computing', image: Track2 },
    { id: 3, title: 'Session-3', description: 'Technology and Innovation - software', image: Track3 },
    { id: 4, title: 'Session-4', description: 'Big Data, Data Science and Engneering', image: Track4 },
    { id: 5, title: 'Session-5', description: 'Natural Language processing', image: Track5 },
    { id: 6, title: 'Session-6', description: 'Augmented reality, Virtual reality and Robotic', image: Track6 },
    { id: 7, title: 'Session-7', description: 'Multimedia Services and Technologies', image: Track7 },
    { id: 8, title: 'Session-8', description: '5G, IoT and Futuristics Technologies', image: Track8 },
    { id: 9, title: 'Session-9', description: 'Ubiquitous Computing, Networking and Cyber Security', image: Track9 },
    { id: 10, title:'Session-10', description: 'Green Computing and Sustainability', image: Track10 },
    { id: 11, title:'Session-11', description: 'Renewable Energy and Global Sustainability', image: Track11 },
    { id: 12, title:'Session-12', description: 'Smart city, Smart systems and VLSI based Technologies', image: Track12 },
    { id: 13, title:'Session-13', description: 'Information Technology and Cyber Law', image: Track13 },
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
              <h3 onClick={() => navigate('/admin/TrackDetail', { state: track })}>{track.title}</h3>
              <p>{track.description}</p>
            </div>
            <img src={track.image} alt={track.title} className={styles.image} />
          </div>
        ))}
      </div>
      <button  onClick={() => navigate('/admin/addFaculty')}>
          <span>+ Add Faculty</span>
        </button>
      <footer className={styles.footer}>
        copyright@CSIT Acropolis
      </footer>
    </div>
  );
};

export default Admin;