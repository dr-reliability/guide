import React, { useState } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { Modal, Button } from "react-bootstrap"; // Import Bootstrap modal and button components
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./InteractiveGuide.css";

const InteractiveGuide = () => {
  const [visibleLevels, setVisibleLevels] = useState(["l1"]);
  const [completedLevels, setCompletedLevels] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", body: "" });

  // Open modal with dynamic content
  const openModal = (title, body) => {
    setModalContent({ title, body });
    setModalShow(true);
  };

  // Close modal
  const closeModal = () => setModalShow(false);

  const highlightClusters = (text, type = "") => {
    const replacements = {
      Pioneer: (
        <span
          key={`pioneer-${type}`}
          className="pioneer"
          onClick={() =>
            openModal("Pioneer", `Papers in this cluster “pioneer” reliable visual analytics by contributing methodologies to produce better DR projections. One typical type of these papers proposes new DR techniques or improves the existing ones to address the inaccuracy or suboptimality of DR techniques (type 1). For instance, Jeon et al. [1] address the limitations of UMAP in supporting global structure investigation tasks. These papers contribute static DR techniques, meaning they are not updated or affected by Interaction. In contrast, the remaining papers propose DR techniques that interactively update the inner logic based on user input (type 2). For example, Joia et al. [2] propose to dynamically update the projection algorithm by reflecting the user interaction that updates the 2D positions of points.

`)
          }
        >
          {`Pioneer ${type}`}
        </span>
      ),
      Judge: (
        <span
          key="judge"
          className="judge"
          onClick={() => openModal("Judge", "These papers address problems in DR evaluation by proposing new evaluation metrics or strategies, supporting analysts to reliably judge the quality of DR projections. For example, Aupetit [3] reveals inaccuracy in evaluating the cluster structure of projections by using class labels as ground truth clusters. The paper aims to make aware of the issue and also remedies it by proposing to revise the class labels to better reflect cluster structure.")}
        >
          Judge
        </span>
      ),
      Instructor: (
        <span
          key="instructor"
          className="instructor"
          onClick={() =>
            openModal("Instructor", "The papers in this cluster teach analysts how to establish effective configurations for DR-based visual analytics. They mostly contribute literature reviews and experiments that evaluate DR techniques. A few papers in this cluster also guide setting effective configurations to visualize dR projections. For example, Sedlmair et al. [4] conduct an experiment comparing different visualization types (2D scatterplot, 3D scatterplot, and SPLOM) in supporting the class separability tasks using DR projections.")
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
            openModal("Explorer", "These papers aim to enhance the exploration of subspaces. These papers typically address the scalability problem, which arises from the increasing number of subspaces that need to be investigated as dimensionality increases. For example, Nam and Mueller [5] propose to animate scatterplots to allow analysts to ``tour'' the possible set of subspaces.")
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
            openModal(`Explainer", "The papers here mostly address inaccuracy or uninterpretability of DR-based visual analytics by augmenting scatterplots. In terms of accuracy, this is typically done by overlaying how and where projections are distorted [6] or resolving distortions by moving them (type 1). Similarly, interpretability is addressed by overlying high-dimensional attribute values to the scatterplots [7] (type 2).`)
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
    };
  
    return text
      .split(/(Pioneer|Judge|Instructor|Explorer|Explainer|Architect)/g)
      .map((part, index) => replacements[part] || <span key={index}>{part}</span>);
  };
  
  

  const handleResponse = (level, response) => {
    if (
      completedLevels.includes(`${level}-no`) ||
      completedLevels.includes(`${level}-yes`)
    ) {
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

  const getLevelContent = (level) => {
  const contents = {
    l1: {
      level: "I1",
      text: "I have experience in using dimensionality reduction (DR) techniques",
      noAction: (
        <span className="specific-font">
          Read highly cited articles<br />explaining DR techniques
        </span>
      ),
      image: null,
    },
    l2: {
      level: "I2",
      text: "I am familiar with diverse DR techniques beyond t-SNE, UMAP, and PCA",
      noAction: (
        <>
          <span className="read-label">Read:</span> {highlightClusters("Pioneer", "(Type 1)")}
        </>
      ),
      image: "/images/2.png",
    },
    l3: {
      level: "I3",
      text: "I understand the optimality of different DR techniques in diverse tasks",
      noAction: (
        <>
          <span className="read-label">Read:</span> {highlightClusters("Instructor")}
        </>
      ),
      image: "/images/3.png",
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
      image: "/images/4.png",
    },
    l5: {
      level: "I5",
      text: "I am aware of subspace analysis and ways to explore different subspaces",
      noAction: (
        <>
          <span className="read-label">Read:</span> {highlightClusters("Explorer")}
        </>
      ),
      image: "/images/5.png",
    },
    l6: {
      level: "I6",
      text: "I know how to gain further insights by interacting with DR projections",
      noAction: (
        <>
          <span className="read-label">Read:</span> {highlightClusters("Architect")}
          {highlightClusters("Explainer","(Type 2)")}
          {highlightClusters("Pioneer","(Type 2)")}
        </>
      ),
      image: "/images/6.png",
    },
  };
  return contents[level];
};

  

  const resetGuide = () => {
    setVisibleLevels(["l1"]);
    setCompletedLevels([]);
  };

  return (
    <div className="interactive-guide">
      {/* Reset Button */}
      <button className="reset-button" onClick={resetGuide}>
        <FiRefreshCw className="refresh-icon" />
      </button>

      {visibleLevels.map((level) => {
        const content = getLevelContent(level);
        const isCompletedYes = completedLevels.includes(`${level}-yes`);
        const isCompletedNo = completedLevels.includes(`${level}-no`);

        return (
          <div
            key={level}
            className={`level-container ${
              level === "l4" ? "group-top" : level === "l6" ? "group-bottom" : ""
            }`}
          >
            <div className="flex-container">
              <div className="left-section">
                <div className="ls-box">
                  <div className="level-label">{content.level}</div>
                  <div className="level-content">{content.text}</div>
                </div>
                <div className="blue-arrow-container">
                  {["l4", "l5", "l6"].includes(level) ? (
                    <div className="placeholder"></div>
                  ) : (
                    <img
                      src="/images/blue-arrow.png"
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
                    src="/images/red-arrow.png"
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
                      src="/images/diagonal-arrow.png"
                      alt="Diagonal Arrow"
                      className="diagonal-arrow-img"
                    />
                  )}
                </div>
                {isCompletedNo && (
                  <>
                    <div className="info-container">{content.noAction}</div>
                    {content.image && (
                      <div className="level-image">
                        <img src={content.image} alt={`Level ${level}`} />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Bootstrap Modal */}
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
