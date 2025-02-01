const xlsx = require('xlsx');
const fs = require('fs');

exports.generateExcel = async (tasks) => {
  const formattedTasks = tasks.map(task => ({
    ProjectName: task.projectName,
    ProjectPlanning: task.projectPlanning.join(", "),
    MarketResearch: task.marketResearch,
    ContentCreation: task.contentCreation,
    CodingDevelopment: task.codingDevelopment,
    TestingDebugging: task.testingDebugging,
    UserInterfaceDesign: task.uiDesign,
    StartDeliveryDate: task.startDeliveryDate.toISOString().split('T')[0],
    FinalDeliveryDate: task.finalDeliveryDate.toISOString().split('T')[0],
  }));

  const worksheet = xlsx.utils.json_to_sheet(formattedTasks);
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Tasks');
  const filePath = "./tasks.xlsx";
  xlsx.writeFile(workbook, filePath);

  return filePath;
};
