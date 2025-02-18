import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { articleContent } from './articleContent';
import InteractiveGuide from './InteractiveGuide';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PaperTable from './PaperTable';

const App = () => {
  const [view, setView] = useState('article');
  const [activeSection, setActiveSection] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", body: "" });
  const [paperData, setPaperData] = useState({});

  const getDataPath = (fileName) => `${process.env.PUBLIC_URL}/group_data/${fileName}`;

  const fetchPaperData = async (groupName) => {
    try {
      const response = await fetch(getDataPath(`${groupName.toLowerCase()}.json`));
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.papers;
    } catch (error) {
      console.error('Error fetching paper data:', error);
      return [];
    }
  };

  const openModal = async (title, body) => {
    let papers = [];
    if (paperData[title]) {
      papers = paperData[title];
    } else {
      papers = await fetchPaperData(title);
      setPaperData(prev => ({ ...prev, [title]: papers }));
    }
    
    setModalContent({ 
      title, 
      body: (
        <>
          <div className="mb-4">{body}</div>
          <div className="mt-4">
            <h4 className="mb-3">Related Papers:</h4>
            <PaperTable papers={papers} />
          </div>
        </>
      )
    });
    setModalShow(true);
  };

  const closeModal = () => setModalShow(false);

  const parseHTML = (text) => {
    // Convert HTML entities first
    text = text.replace(/&nbsp;/g, ' ')
              .replace(/&lt;/g, '<')
              .replace(/&gt;/g, '>')
              .replace(/&amp;/g, '&');
    
    // Process all HTML tags and convert to markdown-style markers
    text = text
      // Handle spans first
      .replace(/<span[^>]*class=['"]([^'"]+)['"][^>]*>/g, (match, className) => `[[span:${className}]]`)
      .replace(/<\/span>/g, '[[/span]]')
      // Handle other formatting
      .replace(/<b>/g, '**').replace(/<\/b>/g, '**')
      .replace(/<strong>/g, '**').replace(/<\/strong>/g, '**')
      .replace(/<i>/g, '_').replace(/<\/i>/g, '_')
      .replace(/<em>/g, '_').replace(/<\/em>/g, '_')
      // Handle line breaks last
      .replace(/<br\s*\/?>/g, '\n\n');
      
    return text;
  };
    

  const renderFormattedText = (text) => {
    const parts = text.split(/(\*\*|_|(\[\[span:.*?\]\])|(\[\[\/span\]\])|\n)/);
    let isTextBold = false;
    let isTextItalic = false;
    let activeSpanClass = null;
  
    return parts.map((part, index) => {
      if (part === '**') {
        isTextBold = !isTextBold;
        return null;
      }
      if (part === '_') {
        isTextItalic = !isTextItalic;
        return null;
      }
      if (part?.startsWith('[[span:')) {
        activeSpanClass = part.match(/\[\[span:(.*?)\]\]/)?.[1] || null;
        return null;
      }
      if (part === '[[/span]]') {
        activeSpanClass = null;
        return null;
      }
      if (part === '\n') {
        return <br key={index} />;
      }
      if (!part) return null;
  
      return (
        <span
          key={index}
          className={activeSpanClass || ''}
          style={{
            fontWeight: isTextBold ? 'bold' : 'normal',
            fontStyle: isTextItalic ? 'italic' : 'normal'
          }}
        >
          {part}
        </span>
      );
    });
  };
  
  

  const highlightClusters = (text) => {
    // First parse HTML tags
    text = parseHTML(text);
    
    const clusters = {
      Pioneer: {
        className: "pioneer",
        description: "Papers in this cluster \"pioneer\" reliable visual analytics by contributing methodologies to produce better DR projections. One typical type of these papers proposes new DR techniques or improves the existing ones to address the inaccuracy or suboptimality of DR techniques (type 1). For instance, Jeon et al. address the limitations of UMAP in supporting global structure investigation tasks. These papers contribute static DR techniques, meaning they are not updated or affected by Interaction. In contrast, the remaining papers propose DR techniques that interactively update the inner logic based on user input (type 2). For example, Joia et al. propose to dynamically update the projection algorithm by reflecting the user interaction that updates the 2D positions of points."
      },
      Judge: {
        className: "judge",
        description: "These papers address problems in DR evaluation by proposing new evaluation metrics or strategies, supporting analysts to reliably judge the quality of DR projections. For example, Aupetit reveals inaccuracy in evaluating the cluster structure of projections by using class labels as ground truth clusters. The paper aims to make aware of the issue and also remedies it by proposing to revise the class labels to better reflect cluster structure."
      },
      Instructor: {
        className: "instructor",
        description: "The papers in this cluster teach analysts how to establish effective configurations for DR-based visual analytics. They mostly contribute literature reviews and experiments that evaluate DR techniques. A few papers in this cluster also guide setting effective configurations to visualize dR projections. For example, Sedlmair et al. conduct an experiment comparing different visualization types (2D scatterplot, 3D scatterplot, and SPLOM) in supporting the class separability tasks using DR projections."
      },
      Explorer: {
        className: "explorer",
        description: "These papers aim to enhance the exploration of subspaces. These papers typically address the scalability problem, which arises from the increasing number of subspaces that need to be investigated as dimensionality increases. For example, Nam and Mueller propose to animate scatterplots to allow analysts to 'tour' the possible set of subspaces."
      },
      Explainer: {
        className: "explainer",
        description: "The papers here mostly address inaccuracy or uninterpretability of DR-based visual analytics by augmenting scatterplots. In terms of accuracy, this is typically done by overlaying how and where projections are distorted or resolving distortions by moving them (type 1). Similarly, interpretability is addressed by overlying high-dimensional attribute values to the scatterplots (type 2)."
      },
      Architect: {
        className: "architect",
        description: "These papers architect visual analytics systems that help people better understand DR techniques or underlying data."
      }
    };

    return text.split(/(Pioneer|Judge|Instructor|Explorer|Explainer|Architect)/g)
      .map((part, index) => {
        if (clusters[part]) {
          return (
            <span
              key={index}
              className={clusters[part].className}
              onClick={() => openModal(part, clusters[part].description)}
              style={{ cursor: 'pointer' }}
            >
              {part}
            </span>
          );
        }
        return <span key={index}>{renderFormattedText(part)}</span>;
      });
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
            <h1 className="title">{articleContent.title}</h1>
            <h2 className="Subtitle">{articleContent.subtitle}</h2>
            
            <div className="Article-sections">
              {articleContent.sections.map((section, index) => (
                <div key={index} className="Section">
                  {section.title && <h2 className="Section-title">{section.title}</h2>}
                  {typeof section.content === 'string' ? (
                    <p className="Section-content">
                      {highlightClusters(section.content)}
                    </p>
                  ) : (
                    section.content.map((cluster, cIndex) => (
                      <div key={cIndex} className="Cluster-description">
                        <h3 className="Cluster-name">
                          {highlightClusters(cluster.name)}
                        </h3>
                        <p>{highlightClusters(cluster.content)}</p>
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

      <Modal show={modalShow} onHide={closeModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{modalContent.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalContent.body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default App;