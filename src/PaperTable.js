
import React from 'react';

const PaperTable = ({ papers }) => {
  if (!papers || papers.length === 0) {
    return <div className="text-gray-500 mt-4">No papers available.</div>;
  }

  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left border-b font-semibold">Title</th>
            <th className="p-3 text-left border-b font-semibold w-32">Authors</th>
            <th className="p-3 text-left border-b font-semibold w-32">Publication</th>
          </tr>
        </thead>
        <tbody>
          {papers.map((paper, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="p-3 border-b">
                {paper.doi ? (
                  <a 
                    href={`https://doi.org/${paper.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {paper.title}
                  </a>
                ) : (
                  paper.title
                )}
              </td>
              <td className="p-3 border-b whitespace-nowrap">{paper.authors}</td>
              <td className="p-3 border-b whitespace-nowrap">{paper.publication}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaperTable;