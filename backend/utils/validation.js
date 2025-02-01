exports.validateTaskData = (data) => {
    const requiredFields = [
      "projectName", "projectPlanning", "marketResearch", "contentCreation", 
      "codingDevelopment", "testingDebugging", "uiDesign", "startDeliveryDate", "finalDeliveryDate"
    ];
  
    for (const field of requiredFields) {
      if (!data[field]) return { message: `${field} is required!` };
    }
    return null;
  };
  
  exports.validateDates = (startDate, finalDate) => {
    if (new Date(startDate) >= new Date(finalDate)) {
      return { message: "Start delivery date must be before final delivery date!" };
    }
    return null;
  };
  