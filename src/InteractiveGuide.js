import React, { useState } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./InteractiveGuide.css";
import PaperTable from './PaperTable';

const getImagePath = (imageName) => `${process.env.PUBLIC_URL}/images/${imageName}`;
const getDataPath = (fileName) => `${process.env.PUBLIC_URL}/group_data/${fileName}`;

const InteractiveGuide = () => {
  const [visibleLevels, setVisibleLevels] = useState(["l1"]);
  const [completedLevels, setCompletedLevels] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", body: "" });
  const [paperData, setPaperData] = useState({});

    const fetchPaperData = async (groupName) => {
    try {
      const fileName = groupName.toLowerCase() === "highly" ? "highly_cited.json" : `${groupName.toLowerCase()}.json`;
      const response = await fetch(getDataPath(fileName));
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched data:', data); // Debug log
      return data.papers;
    } catch (error) {
      console.error('Error fetching paper data:', error);
      console.error('Group name attempted:', groupName); // Debug log
      console.error('Full path attempted:', getDataPath(`${groupName.toLowerCase()}.json`)); // Debug log
      return [];
    }
  };

  const openModal = async (title, body) => {
    let papers = [];
    const groupKey = title.toLowerCase() === "highly cited articles" ? "highly" : title;
  
    if (paperData[groupKey]) {
      papers = paperData[groupKey];
    } else {
      papers = await fetchPaperData(groupKey);
      setPaperData(prev => ({ ...prev, [groupKey]: papers }));
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
  
  const levelModalContent = {
    l1: {
      title: "(I1) I have an experience in using DR techniques.",
      body: "Analysts who do not meet this checklist item should first refer to basic articles explaining widely used DR techniques and their functionalities before accessing the papers in our list. We recommend reading highly cited articles explaining famous DR techniques (e.g., t-SNE, Autoencoder), especially due to their intuitiveness. An analyst can proceed to I2 if the one satisfies this checklist item."
    },
    l2: {
      title: "(I2) I am familiar with diverse DR techniques beyond t-SNE, UMAP , and PCA.",
      body: "Without meeting this checklist item, analysts will likely lack the knowledge required to choose a DR technique that suits their tasks. The analysts should first be aware that various DR techniques exist, each with different purposes and focus. We thus recommend referring to the type 1 papers in the Pioneer group that propose DR techniques producing static projections. Reviewing these papers will inform the analysts that famous techniques are not always optimal and that alternative techniques exist to complement them. As with I1, analysts can proceed to I3 if they meet this checklist item."
    },
    l3: {
      title: "(I3) I understand the optimality of different DR techniques for diverse tasks.",
      body: "Although analysts may be aware that different tasks have optimal techniques, mapping tasks to the appropriate techniques cannot be easily accomplished by reading individual papers. This is because each paper often asserts that its techniques are the best in various aspects, which is sometimes misleading. We thus strongly suggest analysts refer to papers in the Instructor group, where they offer objective evaluations or comparisons of different techniques. After saying  ''yes'' to this checklist item, analysts can examine their expertise level for advanced topics (I4, I5, and I6)."
    },
    l4: {
      title: "(I4) I know DR Projections can be inaccurate and know how to evaluate them.",
      body: "Even with the proper selection of DR techniques, resulting projections can be less optimal or inaccurate without proper evaluations. Therefore, if analysts want to improve the accuracy of their projections, we recommend they focus more closely on evaluation metrics, aiming to identify and optimize reliable projections. This can be done by referencing the papers in Judge group as they propose various evaluation metrics. We also suggest reading type 1 Explainer papers that address inaccuracy to be more aware of inherent projection distortions."
    },
    l5: {
      title: "(I5) I am aware of subspace analysis and the ways to explore different subspaces.",
      body: "If analysts do not meet the checklist item, referring to Explorer-type papers is recommended. These papers contribute various visualization methodologies that scalably support subspace analysis, enabling analysts to meet the checklist item."
    },
    l6: {
      title: "(I6) I know how to gain further insights by interacting with DR projections.",
      body: "This checklist item asks analysts whether they have enough operational knowledge to make their analysis interpretable and to reflect their domain knowledge. In terms of interpretability, we suggest analysts reference Architect-type papers and Explainer-type papers that deal with interpretability (type 2). To leverage domain knowledge, we recommend consulting type 2 Pioneer papers. These papers offer interactive DR techniques that dynamically modify its algorithm in response to user input, thus integrating domain expertise."
    }
  };

  const openLevelModal = (level) => {
    const content = levelModalContent[level];
    setModalContent(content);
    setModalShow(true);
  };

  const closeModal = () => setModalShow(false);

  const FormattedText = ({ children }) => (
    <div className="formatted-text">
      {children}
    </div>
  );

  const Bold = ({ children }) => (
    <span className="bold">{children}</span>
  );

  const Highlight = ({ children }) => (
    <span className="highlight">{children}</span>
  );


  const levelTextContent = {
    l1: {
     
    },
    l2: {
      content: (
        <FormattedText>
          <Bold>"</Bold> I am <Bold>informed</Bold> that there exists different{' '}
          <Highlight>DR</Highlight> techniques. <Bold>"</Bold>
        </FormattedText>
      )
    },
    l3: {
      content: (
        <FormattedText>
          <Bold>"</Bold> I am more <Bold>informed</Bold> of what different{' '}
          <Highlight>DR</Highlight> techniques can and cannot do, thus can select{' '}
          <Bold>optimal</Bold> techniques for my task. <Bold>"</Bold>
        </FormattedText>
      )
    },
    l4: {
      content: (
        <FormattedText>
          <Bold>"</Bold> I can select <Bold>optimal</Bold> <Highlight>Evaluation</Highlight> metrics, thus can create <Bold>optimal</Bold> <Bold>accurate</Bold>, and{' '}
          <Bold>stable</Bold> <Highlight>DR</Highlight> projections. <Bold>"</Bold>
        </FormattedText>
      )
    },
    l5: {
      content: (
        <FormattedText>
         <Bold>"</Bold> I can <Highlight>visually</Highlight> explore high-dimensional data in a more{' '}
          <Bold>scalable</Bold> manner. <Bold>"</Bold>
        </FormattedText>
      )
    },
    l6: {
      content: (
        <FormattedText>
          <Bold>"</Bold> I can make my <Highlight>visualizations</Highlight> and{' '}
          <Highlight>DR</Highlight> techniques more{' '}
          <Bold>interpretable</Bold> and better reflect my{' '}
          <Bold>domain knowledge</Bold>. <Bold>"</Bold>
        </FormattedText>
      )
    }
  };

  const highlightClusters = (text, type = "") => {
    const replacements = {
      Pioneer: (
        <span
          key={`pioneer-${type}`}
          className="pioneer"
          onClick={() =>
            openModal("Pioneer", `Papers in this cluster "pioneer" reliable visual analytics by contributing methodologies to produce better DR projections. One typical type of these papers proposes new DR techniques or improves the existing ones to address the inaccuracy or suboptimality of DR techniques (type 1). For instance, Jeon et al. address the limitations of UMAP in supporting global structure investigation tasks. These papers contribute static DR techniques, meaning they are not updated or affected by Interaction. In contrast, the remaining papers propose DR techniques that interactively update the inner logic based on user input (type 2). For example, Joia et al. propose to dynamically update the projection algorithm by reflecting the user interaction that updates the 2D positions of points.`)
          }
        >
          {`Pioneer ${type}`}
        </span>
      ),
      Judge: (
        <span
          key="judge"
          className="judge"
          onClick={() => openModal("Judge", "These papers address problems in DR evaluation by proposing new evaluation metrics or strategies, supporting analysts to reliably judge the quality of DR projections. For example, Aupetit reveals inaccuracy in evaluating the cluster structure of projections by using class labels as ground truth clusters. The paper aims to make aware of the issue and also remedies it by proposing to revise the class labels to better reflect cluster structure.")}
        >
          Judge
        </span>
      ),
      Instructor: (
        <span
          key="instructor"
          className="instructor"
          onClick={() =>
            openModal("Instructor", "The papers in this cluster teach analysts how to establish effective configurations for DR-based visual analytics. They mostly contribute literature reviews and experiments that evaluate DR techniques. A few papers in this cluster also guide setting effective configurations to visualize dR projections. For example, Sedlmair et al. conduct an experiment comparing different visualization types (2D scatterplot, 3D scatterplot, and SPLOM) in supporting the class separability tasks using DR projections.")
          }
        >
          Instructor
        </span>
      ),
      Explorer: (
        <span
          key="explorer"
          className="explorer"
          onClick={() =>
            openModal("Explorer", "These papers aim to enhance the exploration of subspaces. These papers typically address the scalability problem, which arises from the increasing number of subspaces that need to be investigated as dimensionality increases. For example, Nam and Mueller propose to animate scatterplots to allow analysts to 'tour' the possible set of subspaces.")
          }
        >
          Explorer
        </span>
      ),
      Explainer: (
        <span
          key={`explainer-${type}`}
          className="explainer"
          onClick={() =>
            openModal("Explainer", "The papers here mostly address inaccuracy or uninterpretability of DR-based visual analytics by augmenting scatterplots. In terms of accuracy, this is typically done by overlaying how and where projections are distorted or resolving distortions by moving them (type 1). Similarly, interpretability is addressed by overlying high-dimensional attribute values to the scatterplots (type 2).")
          }
        >
          {`Explainer ${type}`}
        </span>
      ),
      Architect: (
        <span
          key="architect"
          className="architect"
          onClick={() =>
            openModal("Architect", "These papers architect visual analytics systems that help people better understand DR techniques or underlying data.")
          }
        >
          Architect
        </span>
      ),
      highly: (
        <div
          key="highly"
          className="highly"
          onClick={() =>
            openModal("Highly Cited Articles", "Papers in this list are the highly cited articles explaining famous DR techniques like t-SNE, PCA, UMAP, and Autoencoder. Reading these papers will offer you to learn the basic concepts of dimensionality reduction and their usage.")
          }
        >
          Highly Cited Articles Explaining DR Techniques
        </div>
      ),
    };
  
    return text
      .split(/(Pioneer|Judge|Instructor|Explorer|Explainer|Architect|highly)/g)
      .map((part, index) => replacements[part] || <span key={index}>{part}</span>);
  };

  const getLevelContent = (level) => {
    const contents = {
      l1: {
        level: "I1",
        text: "I have experience in using dimensionality reduction (DR) techniques",
        noAction: (
            <>
              <span className="read-label">Read: </span>
              <span className="read-content">
                {highlightClusters("highly")}
              </span>
            </>
          ),
        content: levelTextContent[level]?.content || null,
      },
      l2: {
        level: "I2",
        text: "I am familiar with diverse DR techniques beyond t-SNE, UMAP, and PCA",
        noAction: (
          <>
            <span className="read-label">Read:</span> {highlightClusters("Pioneer", "(Type 1)")}
          </>
        ),
        content: levelTextContent[level]?.content || null,
      },
      l3: {
        level: "I3",
        text: "I understand the optimality of different DR techniques in diverse tasks",
        noAction: (
          <>
            <span className="read-label">Read:</span> {highlightClusters("Instructor")}
          </>
        ),
        content: levelTextContent[level]?.content || null,
      },
      l4: {
        level: "I4",
        text: "I am aware that DR projections can be inaccurate and know how to evaluate them",
        noAction: (
          <>
            <span className="read-label">Read:</span> {highlightClusters("Judge")}
            {highlightClusters("Explainer", "(Type 1)")}
          </>
        ),
        content: levelTextContent[level]?.content || null,
      },
      l5: {
        level: "I5",
        text: "I am aware of subspace analysis and ways to explore different subspaces",
        noAction: (
          <>
            <span className="read-label">Read:</span> {highlightClusters("Explorer")}
          </>
        ),
        content: levelTextContent[level]?.content || null,
      },
      l6: {
        level: "I6",
        text: "I know how to gain further insights by interacting with DR projections",
        noAction: (
          <>
            <span className="read-label">Read:</span> {highlightClusters("Architect")}
            {highlightClusters("Explainer", "(Type 2)")}
            {highlightClusters("Pioneer", "(Type 2)")}
          </>
        ),
        content: levelTextContent[level]?.content || null,
      },
    };
    return contents[level] || null;
  };

  const handleResponse = (level, response) => {
    if (completedLevels.includes(`${level}-no`) || completedLevels.includes(`${level}-yes`)) {
      return;
    }

    const nextLevelsMap = {
      l1: "l2",
      l2: "l3",
      l3: ["l4", "l5", "l6"],
    };

    const updatedCompleted = [...completedLevels, `${level}-${response}`];
    setCompletedLevels(updatedCompleted);

    if (nextLevelsMap[level]) {
      const nextLevel = nextLevelsMap[level];
      setVisibleLevels((prev) =>
        Array.isArray(nextLevel) ? [...prev, ...nextLevel] : [...prev, nextLevel]
      );
    }
  };

  const resetGuide = () => {
    setVisibleLevels(["l1"]);
    setCompletedLevels([]);
  };

  return (
    <div className="interactive-guide">
      <button className="reset-button" onClick={resetGuide}>
        <FiRefreshCw className="refresh-icon" />
      </button>

      {visibleLevels.map((level) => {
        const content = getLevelContent(level);
        if (!content) return null;

        const isCompletedYes = completedLevels.includes(`${level}-yes`);
        const isCompletedNo = completedLevels.includes(`${level}-no`);

        return (
          <div
            key={level}
            className={`level-container fade-in${
              level === "l4" ? "group-top" : level === "l6" ? "group-bottom" : ""
            }`}
          >
            <div className="flex-container">
              <div className="left-section">
              <div 
                  className="ls-box" 
                  onClick={() => openLevelModal(level)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="level-label">{content.level}</div>
                  <div className="level-content">{content.text}</div>
                </div>
                <div className="blue-arrow-container">
                  {["l4", "l5", "l6"].includes(level) ? (
                    <div className="placeholder"></div>
                  ) : (
                    <img
                      src={getImagePath("blue-arrow.png")}
                      alt="Blue Arrow"
                      className={`arrow-img ${
                        isCompletedNo ? "disabled" : isCompletedYes ? "" : ""
                      }`}
                      onClick={() =>
                        !isCompletedYes &&
                        !isCompletedNo &&
                        handleResponse(level, "yes")
                      }
                    />
                  )}
                </div>
              </div>

              <div className={`right-section ${isCompletedNo ? "show-info" : ""}`}>
                <div className="red-arrow-container">
                  <img
                    src={getImagePath("red-arrow.png")}
                    alt="Red Arrow"
                    className={`arrow-img ${
                      isCompletedYes ? "disabled" : isCompletedNo ? "" : ""
                    }`}
                    onClick={() =>
                      !isCompletedYes &&
                      !isCompletedNo &&
                      handleResponse(level, "no")
                    }
                  />
                  {["l1", "l2"].includes(level) && isCompletedNo && (
                    <img
                      src={getImagePath("diagonal-arrow.png")}
                      alt="Diagonal Arrow"
                      className="diagonal-arrow-img"
                    />
                  )}
                </div>
                {isCompletedNo && (
                  <>
                    <div className="info-container fade-in">{content.noAction}</div>
                    {content.content && (
                      <div className="level-content2 fade-in">
                        {content.content}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}

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

export default InteractiveGuide;