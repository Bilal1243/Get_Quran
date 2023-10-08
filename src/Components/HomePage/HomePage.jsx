import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import {useNavigate} from 'react-router-dom'

import './sampleButton.css'; // Import your CSS file
import { useGlobalState } from '../../Context';

function HomePage() {
  const [chapters, setChapters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page

  useEffect(() => {
    axios.get('/chapters').then((response) => {
      setChapters(response.data.chapters);
    });
  }, []);

  const {updateGlobalState} = useGlobalState()
  const navigate = useNavigate()

  const handleChapter = (id)=>{
      updateGlobalState(id)
      navigate('/audio')
  }

  // Calculate the total number of pages based on the number of chapters and items per page
  const totalPages = Math.ceil(chapters.length / itemsPerPage);

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the chapters array to display only the chapters for the current page
  const displayedChapters = chapters.slice(startIndex, endIndex);

  return (
    <div className="sample-button-container">
      <h1> ٱلسَّلَامُ عَلَيْكُمْ</h1>
      <h1>Surah Information</h1>
      <div className="pagination">
  {Array.from({ length: totalPages }, (_, index) => (
    <button
      key={index}
      onClick={() => setCurrentPage(index + 1)}
      className={currentPage === index + 1 ? 'active' : ''}
    >
      {index + 1}
    </button>
  ))}
</div>
      <ul className="chapter-list">
        {displayedChapters.map((chapter) => (
          <li key={chapter.id} className="chapter-item" onClick={()=>handleChapter(chapter.id)}>
            <p className="chapter-name">{chapter.name_simple}</p>
            <p className="chapter-pages">Verses: {chapter.verses_count}</p>
            <p className="chapter-place">Revelation Place: {chapter.revelation_place}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
