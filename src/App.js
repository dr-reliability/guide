import React, { useState } from 'react';
import { articleContent } from './articleContent';
import InteractiveGuide from './InteractiveGuide';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const [view, setView] = useState('article');
  const [activeSection, setActiveSection] = useState(0);
  
  const highlightClusters = (text) => {
    const replacements = {
      Pioneer: '<span class="pioneer">Pioneer</span>',
      Judge: '<span class="judge">Judge</span>',
      Instructor: '<span class="instructor">Instructor</span>',
      Explorer: '<span class="explorer">Explorer</span>',
      Explainer: '<span class="explainer">Explainer</span>',
      Architect: '<span class="architect">Architect</span>',
    };
  
    const regex = new RegExp(Object.keys(replacements).join('|'), 'g');
    return text.replace(regex, (matched) => replacements[matched]);
  };

  return (
    <div className="App">
      <div className="View-toggle">
        <button 
          className={`Toggle-button ${view === 'article' ? 'active' : ''}`}
          onClick={() => setView('article')}
        >
          Article View
        </button>
        <button 
          className={`Toggle-button ${view === 'interactive' ? 'active' : ''}`}
          onClick={() => setView('interactive')}
        >
          Interactive Guide
        </button>
      </div>

      <div className="Content-container">
        {view === 'article' ? (
          <div className="Article-view">
            <h1 className="Title">{articleContent.title}</h1>
            <h2 className="Subtitle">{articleContent.subtitle}</h2>
            
            <div className="Article-sections">
              {articleContent.sections.map((section, index) => (
                <div key={index} className="Section">
                  {section.title && <h2 className="Section-title">{section.title}</h2>}
                  {typeof section.content === 'string' ? (
                    <p
                      className="Section-content"
                      dangerouslySetInnerHTML={{ __html: highlightClusters(section.content) }}
                    ></p>
                  ) : (
                    section.content.map((cluster, cIndex) => (
                      <div key={cIndex} className="Cluster-description">
                        <h3
                          className="Cluster-name"
                          dangerouslySetInnerHTML={{ __html: highlightClusters(cluster.name) }}
                        ></h3>
                        <p
                          dangerouslySetInnerHTML={{ __html: highlightClusters(cluster.content) }}
                        ></p>
                      </div>
                    ))
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <InteractiveGuide />
        )}
      </div>
    </div>
  );
};

export default App;