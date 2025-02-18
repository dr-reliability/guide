export const articleContent = {
    title: "Learning High-Dimensional Backstage: A Guide for Exploring Dimensionality Reduction Literature",
    
    sections: [
      {
        content: "<i>Dimensionality Reduction</i> (DR) is an essential building block for visual analytics. It is now easy to find visual analytics systems that leverage DR techniques such as t-SNE, UMAP , or Isomap. The effectiveness of dimensionality reduction (DR) lies in its ability to create abstractions; it transforms any high-dimensional data into 2D scatterplots, offering an intuitive overview of data distribution."
       
      },
      { content: "However, visual analytics using DR can often be unreliable: the insights derived from DR projections may not accurately represent the underlying data, leading to flawed decisions. For example, distortions inherently occur in DR as low-dimensional spaces have fewer degrees of freedom than high-dimensional ones. These distortions can misrepresent the original data and mislead analysts about its structure."},
      {
       content: "In our survey paper <b><span class='font-quicksand'>Unveiling high-dimensional Backstage</span></b>, we contribute a literature review of 133 papers that improve the reliability of visual analytics using DR. The survey serves as a reference point for analysts to address reliability problems in their daily work. However, since analysts have varying expertise in DR, providing the same references to everyone is ineffective. Moreover, analysts may only sometimes recognize their expertise level, leading to difficulty in identifying their next steps."
      },
			{ content: "We thus introduce our guide, <b><span class='font-quicksand'>Learning high-dimensional Backstage</span></b>, which aims to help analysts read papers in our literature review. The guide includes a checklist with six items that help analysts assess their expertise level, with each item corresponding to a recommendation of a cluster of papers to read to enhance their expertise. Our guide and checklists can thus be interpreted as our suggested order for reading papers to understand the relevant field comprehensively."},
      {content: "In the following contents, we will first explain how the cluster of papers is established. We then explain each checklist item in detail."},
      {
        title: "Establishing Clusters of Papers",
        content: "In our survey paper, we review and taxonomize 133 papers improving the reliability of visual analytics using DR, where we again cluster them into six groups. This is done by applying clustering while we assume that two papers are close if they are classified similarly based on our taxonomy (Please refer to the paper for the detailed procedure). As a result, we identify the following six clusters: Pioneer, Judge, Instructor, Explorer, Explainer, and Architect. The following are detailed explanations of these clusters."
      },
      {content: "\nPioneer  - Papers in this cluster “pioneer” reliable visual analytics by contributing methodologies to produce better DR projections. One typical type of these papers proposes new DR techniques or improves the existing ones to address the <b>inaccuracy</b> or <b>suboptimality</b> of DR techniques <b>(<b>type 1</b>)</b>. For instance, Jeon et al. [1] address the limitations of UMAP in supporting global structure investigation tasks. These papers contribute static DR techniques, meaning they are not updated or affected by \Interaction. In contrast, the remaining papers propose DR techniques that interactively update the inner logic based on user input (<b>type 2</b>). For example, Joia et al. [2] propose to dynamically update the projection algorithm by reflecting the user interaction that updates the 2D positions of points."
          },
          {
            content: "\nJudge&nbsp;&nbsp;- These papers address problems in DR evaluation by proposing new evaluation metrics or strategies, supporting analysts to reliably judge the quality of DR projections. For example, Aupetit [3] reveals <b>inaccuracy</b> in evaluating the cluster structure of projections by using class labels as ground truth clusters. The paper aims to make aware of the issue and also remedies it by proposing to revise the class labels to better reflect cluster structure."
          },
          {

            content: "\nInstructor&nbsp;&nbsp;- The papers in this cluster teach analysts how to establish effective configurations for DR-based visual analytics. They mostly contribute <b>literature reviews</b> and <b>experiments</b> that evaluate DR techniques. A few papers in this cluster also guide setting effective configurations to visualize dR projections. For example, Sedlmair et al. [4] conduct an experiment comparing different visualization types (2D scatterplot, 3D scatterplot, and SPLOM) in supporting the class separability tasks using DR projections."
          },
          {
            
            content: "\nExplorer&nbsp;&nbsp;- These papers aim to enhance the exploration of subspaces. These papers typically address the <b>scalability</b> problem, which arises from the increasing number of subspaces that need to be investigated as dimensionality increases. For example, Nam and Mueller [5] propose to animate scatterplots to allow analysts to 'tour' the possible set of subspaces."
          },
          {
            
            content: "\nExplainer&nbsp;&nbsp;- The papers here mostly address <b>inaccuracy</b> or <b>uninterpretability</b> of DR-based visual analytics by augmenting scatterplots. In terms of accuracy, this is typically done by overlaying how and where projections are distorted [6] or resolving distortions by moving them (<b>type 1</b>). Similarly, interpretability is addressed by overlying high-dimensional attribute values to the scatterplots [7] (<b>type 2</b>)."
          },
          {
          
            content: "\nArchitect&nbsp;&nbsp;- These papers architect <b>visual analytics systems</b> that help people better understand DR techniques or underlying data."
          },
        
      
      {
        title: "Our Guide to Reading Papers",
        content: "As aforementioned, our guide consists of six items. In the beginning, increasing levels of expertise structure the guide (<b>I1</b>, <b>I2</b>, and <b>I3</b>): if an analyst can affirmatively answer a preceding checklist item, they should proceed to the next. If not, we suggest the analyst reference the relevant papers from our list. After gaining sufficient expertise in DR, we recommend analysts assess their satisfaction with the checklist items that align with their interests and tasks (<b>I4</b>, <b>I5</b>, and <b>I6</b>)."
      },
      {content: "Below is a detailed explanation of each checklist item (<b>I1</b>--<b>I6</b>). The <b>interactive guide</b> summarizes the recommended flow for using our guide."},
      {
        content: "\n<b>(I1)</b> <b>I have an experience in using DR techniques.</b>&nbsp; Analysts who do not meet this checklist item should first refer to basic articles explaining widely used DR techniques and their functionalities before accessing the papers in our list. We recommend reading highly cited articles explaining famous DR techniques (e.g., t-SNE [9] [10], Autoencoder [11]), especially due to their intuitiveness. An analyst can proceed to <b>I2</b> if the one satisfies this checklist item."
      },
      {
        content: "\n<b>(I2)</b> <b>I am familiar with diverse DR techniques beyond t-SNE, UMAP , and PCA.</b>&nbsp; Without meeting this checklist item, analysts will likely lack the knowledge required to choose a DR technique that suits their tasks. The analysts should first be aware that various DR techniques exist, each with different purposes and focus. We thus recommend referring to the <b>type 1</b> papers in the Pioneer group that propose DR techniques producing static projections. Reviewing these papers will inform the analysts that famous techniques are not always optimal and that alternative techniques exist to complement them. As with <b>I1</b>, analysts can proceed to <b>I3</b> if they meet this checklist item."
      },
      {content: "\n<b>(I3)</b> <b>I understand the optimality of different DR techniques for diverse tasks.</b>&nbsp; Although analysts may be aware that different tasks have optimal techniques, mapping tasks to the appropriate techniques cannot be easily accomplished by reading individual papers. This is because each paper often asserts that its techniques are the best in various aspects, which is sometimes misleading. We thus strongly suggest analysts refer to papers in the Instructor group, where they offer objective evaluations or comparisons of different techniques. After saying 'yes' to this checklist item, analysts can examine their expertise level for advanced topics (<b>I4</b>, <b>I5</b>, and <b>I6</b>)."},
      {content: "\n<b>(I4)</b> <b>I know DR Projections can be inaccurate and know how to evaluate them.</b>&nbsp; Even with the proper selection of DR techniques, resulting projections can be less optimal or inaccurate without proper evaluations. Therefore, if analysts want to improve the accuracy of their projections, we recommend they focus more closely on evaluation metrics, aiming to identify and optimize reliable projections. This can be done by referencing the papers in Judge group as they propose various evaluation metrics. We also suggest reading <b>type 1</b> Explainer papers that address inaccuracy to be more aware of inherent projection distortions."},
      {content: "\n<b>(I5)</b> <b>I am aware of subspace analysis and the ways to explore different subspaces.</b>&nbsp; If analysts do not meet the checklist item, referring to Explorer type papers is recommended. These papers contribute various visualization methodologies that scalably support subspace analysis, enabling analysts to meet the checklist item."},
      {content: "\n<b>(I6)</b> <b>I know how to gain further insights by interacting with DR projections.</b>&nbsp; This checklist item asks analysts whether they have enough operational knowledge to make their analysis interpretable and to reflect their domain knowledge. In terms of interpretability, we suggest analysts reference Architect type papers and Explainer type papers that deal with interpretability (<b>type 2</b>). To leverage domain knowledge, we recommend consulting <b>type 2</b> Pioneer papers. These papers offer interactive DR techniques that dynamically modify its algorithm in response to user input, thus integrating domain expertise."},
      
      {
        title: "Conclusion",
        content: "In summary, our guide provides actionable directions for reading the paper, which will potentially help the readers in improving the reliability of visual analytics using DR. Still, our guide is established based on our experience and review of papers. It has not yet been validated through user studies or interviews. Validating the effectiveness of our guide and complementing it through interactions with real analysts will be an essential research direction to pursue. <i>We encourage the research community to invest more collaborative effort in improving this guide.</i>"
      },
      {content:""},
      {
        title: "References",
        content: `[1] Jeon et al., "Uniform manifold approximation with two-phase optimization." 2022 IEEE Visualization and Visual Analytics (VIS). IEEE, 2022.
          [2] Joia et al., "Local affine multidimensional projection." IEEE transactions on visualization and computer graphics 17.12 (2011): 2563-2571.
[3] Aupetit, "Sanity check for class-coloring-based evaluation of dimension reduction techniques." Proceedings of the Fifth Workshop on Beyond Time and Errors: Novel Evaluation Methods for Visualization. 2014.
[4] Sedlmair et al., "Empirical guidance on scatterplot and dimension reduction technique choices." IEEE transactions on visualization and computer graphics 19.12 (2013): 2634-2643.
[5] Nam et al., "TripadvisorND: A tourism-inspired high-dimensional space exploration framework with overview and detail." IEEE transactions on visualization and computer graphics 19.2 (2012): 291-305.
[6] Lespinats et al., "CheckViz: Sanity Check and Topological Clues for Linear and Non‐Linear Mappings." Computer Graphics Forum. Vol. 30. No. 1. Oxford, UK: Blackwell Publishing Ltd, 2011.
[7] Faust et al., "DimReader: Axis lines that explain non-linear projections." IEEE transactions on visualization and computer graphics 25.1 (2018): 481-490.
[8] Chatzimparmpas et al., "t-visne: Interactive assessment and interpretation of t-sne projections." IEEE transactions on visualization and computer graphics 26.8 (2020): 2696-2714.
[9] Van der Maaten, and Hinton. "Visualizing data using t-SNE." Journal of machine learning research 9.11 (2008).
[10] Van Der Maaten. "Accelerating t-SNE using tree-based algorithms." The journal of machine learning research 15.1 (2014): 3221-3245.
[11] Hinton and Ruslan Salakhutdinov. "Reducing the dimensionality of data with neural networks." science 313.5786 (2006): 504-507.
        `
      }
    ]
  };
  
  
  