import React from 'react';

interface MarkdownViewerProps {
  content: string;
}

export const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ content }) => {
  const lines = content.split('\n');

  const elements: React.ReactNode[] = [];
  let currentTableRows: string[][] = [];
  let inTable = false;

  const flushTable = (keyPrefix: string) => {
    if (currentTableRows.length > 0) {
      const header = currentTableRows[0];
      const body = currentTableRows.slice(1);

      elements.push(
        <div key={`${keyPrefix}-table`} className="overflow-x-auto my-5 rounded-lg border border-slate-200 shadow-xs">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-100 font-semibold text-slate-800">
              <tr>
                {header.map((col, idx) => (
                  <th key={idx} className="px-4 py-2.5 text-left border-r border-slate-200 last:border-r-0">
                    {renderInline(col)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {body.map((row, rIdx) => (
                <tr key={rIdx} className={rIdx % 2 === 1 ? 'bg-slate-50/60' : ''}>
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-4 py-2.5 text-slate-700 border-r border-slate-200 last:border-r-0 align-top">
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      currentTableRows = [];
      inTable = false;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    // Check for table row
    if (line.startsWith('|') && line.endsWith('|')) {
      if (line.includes('---')) {
        continue; // delimiter row
      }
      inTable = true;
      const cells = line
        .split('|')
        .slice(1, -1)
        .map((c) => c.trim());
      currentTableRows.push(cells);
      continue;
    } else if (inTable) {
      flushTable(`table-${i}`);
    }

    if (!line) {
      elements.push(<div key={`spacer-${i}`} className="h-3" />);
      continue;
    }

    // Heading 1 (#)
    if (line.startsWith('# ')) {
      elements.push(
        <div key={i} className="mt-8 mb-4 border-b-2 border-indigo-600 pb-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-indigo-950 tracking-tight">
            {line.replace(/^#\s+/, '')}
          </h1>
        </div>
      );
      continue;
    }

    // Heading 2 (##)
    if (line.startsWith('## ')) {
      elements.push(
        <div key={i} className="mt-6 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-indigo-900 border-l-4 border-indigo-600 pl-3">
            {line.replace(/^##\s+/, '')}
          </h2>
        </div>
      );
      continue;
    }

    // Heading 3 (###)
    if (line.startsWith('### ')) {
      const headingText = line.replace(/^###\s+/, '');
      const isRomanSection = /^[IVXLCDM]+\./i.test(headingText);

      elements.push(
        <div key={i} className={`mt-5 mb-2 ${isRomanSection ? 'bg-indigo-50/80 px-3 py-1.5 rounded-md border-l-4 border-indigo-500' : ''}`}>
          <h3 className={`text-lg font-bold ${isRomanSection ? 'text-indigo-900' : 'text-slate-800'}`}>
            {headingText}
          </h3>
        </div>
      );
      continue;
    }

    // Heading 4 (####)
    if (line.startsWith('#### ')) {
      elements.push(
        <h4 key={i} className="text-base font-semibold text-slate-800 mt-4 mb-1.5">
          {line.replace(/^####\s+/, '')}
        </h4>
      );
      continue;
    }

    // Unordered list item (- or *)
    if (line.match(/^[\*\-]\s+/)) {
      const content = line.replace(/^[\*\-]\s+/, '');
      elements.push(
        <li key={i} className="ml-5 list-disc text-slate-700 leading-relaxed my-1">
          {renderInline(content)}
        </li>
      );
      continue;
    }

    // Ordered list item (1. or 2.)
    if (line.match(/^\d+\.\s+/)) {
      const number = line.match(/^(\d+)\.\s+/)?.[1] || '1';
      const content = line.replace(/^\d+\.\s+/, '');
      elements.push(
        <div key={i} className="flex items-start gap-2.5 my-1.5 ml-2">
          <span className="font-semibold text-indigo-700 min-w-5 shrink-0 text-sm mt-0.5">{number}.</span>
          <span className="text-slate-700 leading-relaxed">{renderInline(content)}</span>
        </div>
      );
      continue;
    }

    // Blockquote (> )
    if (line.startsWith('> ')) {
      elements.push(
        <blockquote key={i} className="my-3 border-l-4 border-amber-400 bg-amber-50/60 p-3 rounded-r text-amber-900 italic text-sm">
          {renderInline(line.replace(/^>\s+/, ''))}
        </blockquote>
      );
      continue;
    }

    // Callout box detection for Pertanyaan Pemantik or Pemahaman Bermakna
    if (line.toLowerCase().includes('pertanyaan pemantik') || line.toLowerCase().includes('pemahaman bermakna')) {
      elements.push(
        <p key={i} className="text-slate-700 leading-relaxed my-2 font-medium bg-blue-50/50 p-2.5 rounded border border-blue-100">
          {renderInline(line)}
        </p>
      );
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={i} className="text-slate-700 leading-relaxed my-1.5">
        {renderInline(line)}
      </p>
    );
  }

  if (inTable) {
    flushTable('trailing');
  }

  return <div className="modul-preview-container prose prose-indigo max-w-none font-sans text-slate-800">{elements}</div>;
};

// Inline parser for bold, italics, code, badge tags
function renderInline(text: string): React.ReactNode {
  // Regex to split **bold**, *italic*, and `code`
  const regex = /(\*\*.*?\*\*|\*.*?\*|`.*?`)/g;
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (!part) return null;

    if (part.startsWith('**') && part.endsWith('**')) {
      const boldText = part.slice(2, -2);
      return (
        <strong key={index} className="font-semibold text-slate-900">
          {boldText}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      const italicText = part.slice(1, -1);
      return (
        <em key={index} className="italic text-slate-800">
          {italicText}
        </em>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      const codeText = part.slice(1, -1);
      return (
        <code key={index} className="bg-slate-100 text-indigo-700 px-1.5 py-0.5 rounded text-xs font-mono">
          {codeText}
        </code>
      );
    }
    return <span key={index}>{part}</span>;
  });
}
