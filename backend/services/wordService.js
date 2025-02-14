const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType } = require('docx');

exports.generateWord = async (tasks) => {
  try {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Vulnerability Report',
                  bold: true,
                  size: 40,
                }),
              ],
              alignment: 'center',
            }),
            new Paragraph({ text: '' }), // Empty line
            ...tasks.flatMap(task => [
              new Table({
                rows: [
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [new Paragraph({ text: 'Affected URL', bold: true })],
                        width: { size: 20, type: WidthType.PERCENTAGE },
                      }),
                      new TableCell({
                        children: [new Paragraph({ text: task.affectedHosts })],
                        width: { size: 80, type: WidthType.PERCENTAGE },
                      }),
                    ],
                  }),
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [new Paragraph({ text: 'CVE', bold: true })],
                      }),
                      new TableCell({
                        children: [new Paragraph({ text: task.cve })],
                      }),
                    ],
                  }),
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [new Paragraph({ text: 'Description', bold: true })],
                      }),
                      new TableCell({
                        children: [new Paragraph({ text: task.description })],
                      }),
                    ],
                  }),
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [new Paragraph({ text: 'Input', bold: true })],
                      }),
                      new TableCell({
                        children: [new Paragraph({ text: task.input })],
                      }),
                    ],
                  }),
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [new Paragraph({ text: 'Reference', bold: true })],
                      }),
                      new TableCell({
                        children: [new Paragraph({ text: task.reference })],
                      }),
                    ],
                  }),
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [new Paragraph({ text: 'Mitigation', bold: true })],
                      }),
                      new TableCell({
                        children: [new Paragraph({ text: task.mitigation })],
                      }),
                    ],
                  }),
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [new Paragraph({ text: 'Status', bold: true })],
                      }),
                      new TableCell({
                        children: [new Paragraph({ text: task.status })],
                      }),
                    ],
                  }),
                ],
              }),
              new Paragraph({ text: '' }), // Empty line between tasks
            ]),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Generated on: ${new Date().toLocaleString()}`,
                  size: 20,
                  color: '808080', // Valid hex code for gray
                }),
              ],
              alignment: 'left',
            }),
          ],
        },
      ],
    });

    const generatedDir = path.join(__dirname, '../generated');
    if (!fs.existsSync(generatedDir)) {
      fs.mkdirSync(generatedDir, { recursive: true });
    }

    const filePath = path.join(generatedDir, 'tasks.docx');
    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync(filePath, buffer);

    return filePath;
  } catch (error) {
    console.error('Error generating Word document:', error);
    throw error;
  }
};