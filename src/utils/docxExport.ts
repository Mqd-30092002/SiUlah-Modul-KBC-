import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  Header,
  Footer,
  PageNumber,
} from 'docx';

interface ExportDocxOptions {
  title: string;
  subject: string;
  grade: string;
  teacherName?: string;
  schoolName?: string;
  markdown: string;
}

export async function exportModulToDocx(options: ExportDocxOptions): Promise<Blob> {
  const { title, subject, grade, teacherName, schoolName, markdown } = options;

  const lines = markdown.split('\n');
  const docElements: (Paragraph | Table)[] = [];

  // Title Header Banner in Document
  docElements.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 120, before: 60 },
      children: [
        new TextRun({
          text: 'MODUL AJAR KURIKULUM MERDEKA',
          bold: true,
          size: 32, // 16pt
          color: '1E3A8A', // Deep Indigo/Navy
          font: 'Arial',
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 240 },
      children: [
        new TextRun({
          text: `${subject.toUpperCase()} - ${grade.toUpperCase()}`,
          bold: true,
          size: 24, // 12pt
          color: '3B82F6',
          font: 'Arial',
        }),
      ],
    })
  );

  let inTable = false;
  let tableRows: TableRow[] = [];

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    // Check if line is a table row: | col 1 | col 2 |
    if (line.startsWith('|') && line.endsWith('|')) {
      // Check if it's separator row like |---|---|
      if (line.includes('---')) {
        continue;
      }
      inTable = true;
      const cells = line
        .split('|')
        .slice(1, -1)
        .map((c) => c.trim());

      const isHeader = tableRows.length === 0;

      const row = new TableRow({
        tableHeader: isHeader,
        children: cells.map(
          (cellText) =>
            new TableCell({
              width: { size: 100 / Math.max(cells.length, 1), type: WidthType.PERCENTAGE },
              shading: isHeader ? { fill: 'EFF6FF' } : undefined,
              margins: { top: 120, bottom: 120, left: 140, right: 140 },
              children: [
                new Paragraph({
                  children: parseFormattedRuns(cellText, isHeader),
                }),
              ],
            })
        ),
      });

      tableRows.push(row);
      continue;
    } else if (inTable) {
      // Table ended
      if (tableRows.length > 0) {
        docElements.push(
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: tableRows,
          })
        );
        docElements.push(new Paragraph({ spacing: { after: 120 } }));
      }
      inTable = false;
      tableRows = [];
    }

    if (!line) {
      docElements.push(new Paragraph({ spacing: { after: 100 } }));
      continue;
    }

    // Heading 1: #
    if (line.startsWith('# ')) {
      docElements.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 240, after: 120 },
          children: [
            new TextRun({
              text: line.replace(/^#\s+/, ''),
              bold: true,
              size: 28,
              color: '1E3A8A',
              font: 'Arial',
            }),
          ],
        })
      );
      continue;
    }

    // Heading 2: ##
    if (line.startsWith('## ')) {
      docElements.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
          children: [
            new TextRun({
              text: line.replace(/^##\s+/, ''),
              bold: true,
              size: 24,
              color: '1E40AF',
              font: 'Arial',
            }),
          ],
        })
      );
      continue;
    }

    // Heading 3: ###
    if (line.startsWith('### ')) {
      docElements.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 160, after: 80 },
          children: [
            new TextRun({
              text: line.replace(/^###\s+/, ''),
              bold: true,
              size: 22,
              color: '2563EB',
              font: 'Arial',
            }),
          ],
        })
      );
      continue;
    }

    // Bullet points: * or -
    if (line.match(/^[\*\-]\s+/)) {
      const cleanContent = line.replace(/^[\*\-]\s+/, '');
      docElements.push(
        new Paragraph({
          bullet: { level: 0 },
          spacing: { after: 60 },
          children: parseFormattedRuns(cleanContent),
        })
      );
      continue;
    }

    // Numbered lists: 1. or 2.
    if (line.match(/^\d+\.\s+/)) {
      const cleanContent = line.replace(/^\d+\.\s+/, '');
      const numberMatch = line.match(/^(\d+)\.\s+/)?.[1] || '1';
      docElements.push(
        new Paragraph({
          spacing: { after: 60 },
          children: [
            new TextRun({ text: `${numberMatch}. `, bold: true }),
            ...parseFormattedRuns(cleanContent),
          ],
        })
      );
      continue;
    }

    // Normal paragraph
    docElements.push(
      new Paragraph({
        spacing: { after: 80, line: 276 }, // 1.15 line spacing
        children: parseFormattedRuns(line),
      })
    );
  }

  // If table was trailing
  if (inTable && tableRows.length > 0) {
    docElements.push(
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: tableRows,
      })
    );
  }

  const doc = new Document({
    creator: teacherName || 'Guru Penggerak Indonesia',
    title: `${title} - ${subject}`,
    description: `Modul Ajar Kurikulum Merdeka ${subject} untuk ${grade}`,
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440, // 1 inch (2.54 cm standard)
              right: 1440,
              bottom: 1440,
              left: 1440,
            },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: `Modul Ajar Kurikulum Merdeka | ${schoolName || 'Satuan Pendidikan'}`,
                    size: 16,
                    color: '94A3B8',
                    font: 'Arial',
                    italics: true,
                  }),
                ],
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: 'Halaman ',
                    size: 18,
                    color: '64748B',
                  }),
                  new TextRun({
                    children: [PageNumber.CURRENT],
                    size: 18,
                    color: '64748B',
                  }),
                  new TextRun({
                    text: ' dari ',
                    size: 18,
                    color: '64748B',
                  }),
                  new TextRun({
                    children: [PageNumber.TOTAL_PAGES],
                    size: 18,
                    color: '64748B',
                  }),
                ],
              }),
            ],
          }),
        },
        children: docElements,
      },
    ],
  });

  return await Packer.toBlob(doc);
}

// Parses markdown bold (**text**) and italic (*text*) into TextRun
function parseFormattedRuns(text: string, forceBold = false): TextRun[] {
  const runs: TextRun[] = [];
  // Tokenize **bold** or *italic*
  const regex = /(\*\*.*?\*\*|\*.*?\*)/g;
  const parts = text.split(regex);

  for (const part of parts) {
    if (!part) continue;

    if (part.startsWith('**') && part.endsWith('**')) {
      runs.push(
        new TextRun({
          text: part.slice(2, -2),
          bold: true,
          font: 'Arial',
          size: 22, // 11pt
        })
      );
    } else if (part.startsWith('*') && part.endsWith('*')) {
      runs.push(
        new TextRun({
          text: part.slice(1, -1),
          italics: true,
          font: 'Arial',
          size: 22,
        })
      );
    } else {
      runs.push(
        new TextRun({
          text: part,
          bold: forceBold,
          font: 'Arial',
          size: 22,
        })
      );
    }
  }

  return runs.length > 0
    ? runs
    : [
        new TextRun({
          text,
          bold: forceBold,
          font: 'Arial',
          size: 22,
        }),
      ];
}
