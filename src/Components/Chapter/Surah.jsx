import React, { useEffect, useState } from 'react';
import { useGlobalState } from '../../Context';
import axios from '../../axios';
import { chapterAudio } from '../../constants';
import instance2 from '../../axiosSurah';

import './Surah.css';

function Surah() {
  const { chapter } = useGlobalState();

  const [chapter_audio, setAudios] = useState([]);
  const [Surah, setSurah] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Current page index
  const itemsPerPage = 10; // Number of verses per page

  useEffect(() => {
    axios
      .get(`${chapterAudio}/4`)
      .then((response) => {
        const data = response.data.audio_files;

        // Extract audio URLs from the array of objects
        const filteredData = data.filter((item) => item.chapter_id === chapter);

        // Extract audio URLs from the filtered data
        const audioUrls = filteredData.map((item) => item.audio_url);

        // Set the audio URLs in the state
        setAudios(audioUrls);
      })
      .catch((error) => {
        console.error('Error fetching audio data:', error);
      });
    instance2
      .get(`/${chapter}`)
      .then((response) => {
        const verses = response.data.verses;

        // Extract the content of all verses and store in an array
        const verseContentArray = Object.values(verses).map((verse) => verse.content);

        setSurah(verseContentArray);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [chapter]);

  // Handle "Previous" button click
  const handlePreviousClick = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - itemsPerPage);
    }
  };

  // Handle "Next" button click
  const handleNextClick = () => {
    if (currentPage < Surah.length - itemsPerPage) {
      setCurrentPage(currentPage + itemsPerPage);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Add smooth scrolling effect
    });
  };


  return (
    <div className="container">
      <div id="verse-content-container">
        {Surah.slice(currentPage, currentPage + itemsPerPage).map((verse, index) => (
          <div key={index} className="verse">
            {verse}
          </div>
        ))}

        <div className="pagination">
          <button
            className="pagination-button"
            onClick={handlePreviousClick}
            disabled={currentPage === 0}
          >
            Previous
          </button>
          <button
            className="pagination-button"
            onClick={handleNextClick}
            disabled={currentPage >= Surah.length - itemsPerPage}
          >
            Next
          </button>
          <button className="scroll-to-top-button" onClick={scrollToTop}>
              top
          </button>
        </div>
      </div>

      {chapter_audio.map((audioUrl, index) => (
        <audio key={index} controls id="audio-player">
          <source src={audioUrl} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      ))}
    </div>
  );
}

export default Surah;
