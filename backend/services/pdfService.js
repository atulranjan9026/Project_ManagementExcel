const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

exports.generatePdf = async (tasks) => {
  const generatedDir = path.join(__dirname, '../generated');
  if (!fs.existsSync(generatedDir)) {
    fs.mkdirSync(generatedDir, { recursive: true });
  }

  const doc = new PDFDocument({ margin: 50 });
  const filePath = path.join(generatedDir, 'tasks.pdf');
  doc.pipe(fs.createWriteStream(filePath));

  // Add a title
  doc.fontSize(24).font('Helvetica-Bold').text('Vulnerability Report', { align: 'center' });
  doc.moveDown(1);

  // Add task details vertically
  tasks.forEach((task, index) => {
    // const fillColor = index % 2 === 0 ? '#f0f0f0' : '#ffffff';
    // const startY = doc.y;
    // doc.rect(50, startY, doc.page.width - 100, 140).fill(fillColor).stroke();

    doc.fontSize(12).font('Helvetica-Bold').fillColor('black');
    doc.text('Affected URL:', 55, doc.y + 2);
    doc.fontSize(12).font('Helvetica').fillColor('black');
    doc.text(task.affectedHosts, 150, doc.y -15);

    doc.fontSize(12).font('Helvetica-Bold').fillColor('black');
    doc.text('CVE:', 55, doc.y + 2);
    doc.fontSize(12).font('Helvetica').fillColor('black');
    doc.text(task.cve, 150, doc.y -15);

    doc.fontSize(12).font('Helvetica-Bold').fillColor('black');
    doc.text('Description:', 55, doc.y + 2);
    doc.fontSize(12).font('Helvetica').fillColor('black');
    doc.text(task.description, 150, doc.y -15);

    doc.fontSize(12).font('Helvetica-Bold').fillColor('black');
    doc.text('Input:', 55, doc.y + 2);
    doc.fontSize(12).font('Helvetica').fillColor('black');
    doc.text(task.input, 150, doc.y -15);

    doc.fontSize(12).font('Helvetica-Bold').fillColor('black');
    doc.text('Reference:', 55, doc.y + 2);
    doc.fontSize(12).font('Helvetica').fillColor('black');
    doc.text(task.reference, 150, doc.y -15);

    doc.fontSize(12).font('Helvetica-Bold').fillColor('black');
    doc.text('Mitigation:', 55, doc.y + 2);
    doc.fontSize(12).font('Helvetica').fillColor('black');
    doc.text(task.mitigation, 150, doc.y -15);

    doc.fontSize(12).font('Helvetica-Bold').fillColor('black');
    doc.text('Status:', 55, doc.y + 2);
    doc.fontSize(12).font('Helvetica').fillColor('black');
    doc.text(task.status, 150, doc.y -15);

    doc.moveDown(7);
  });

  // Add a footer
  doc.fontSize(10).font('Helvetica').fillColor('gray').text(`Generated on: ${new Date().toLocaleString()}`, 50, doc.page.height - 50, { align: 'left' });

  doc.end();
  return filePath;
};