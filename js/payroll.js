// UC-8
const salary = document.querySelector('#salary');
const output = document.querySelector('.salary-output');
output.textContent = salary.value;
salary.addEventListener('input', function () {
    output.textContent = salary.value;
});   
// UC-10
window.addEventListener('DOMContentLoaded', (event) => {
   const name = document.querySelector('#name');
   const textError = document.querySelector('.text-error');
   name.addEventListener('input', function () {
       if (name.value.length == 0) {
           textError.textContent = "";
           return;
       }
       try {
           (new EmployeePayrollData()).name = name.value;;
           textError.textContent = "";
       } catch (e) {
           textError.textContent = e;
       }
   });  
   
   const salary = document.querySelector('#salary');
   const output = document.querySelector('.salary-output');
   output.textContent = salary.value;
   salary.addEventListener('input', function() {
       output.textContent = salary.value;
   });
});
// UC-11
//save function called on submit
const save = () => {
   try{
       let employeePayrollData = createEmployeePayroll();
       createAndUpdateStorage(employeePayrollData);
   }catch (e) {
       return;
   }
}

// UC-12
//Saving Employee Payroll to Local Storage
function createAndUpdateStorage(employeePayrollData){
   let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
   if(employeePayrollList != undefined){
       employeePayrollList.push(employeePayrollData);
   }
   else{
       employeePayrollList = [employeePayrollData];
   }
   alert(employeePayrollList.toString());
   localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

//function to populate employee object with html form data
const createEmployeePayroll = () => {
   let employeePayrollData = new EmployeePayrollData();
   try{
       employeePayrollData.name = getInputValuesById('#name');
   }catch(e){
       setTextValue('.test-error', e);
       throw e;
   }
   employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
   employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
   employeePayrollData.department = getSelectedValues('[name=department]');
   employeePayrollData.salary = getInputValuesById('#salary');
   employeePayrollData.note = getInputValuesById('#notes');
   let date = getInputValuesById('#day') + " "+getInputValuesById('#month')+ " " + getInputValuesById('#year');
   employeePayrollData.date=Date.parse(date);
   alert("employeePayrollData.toString()");
   return employeePayrollData;
}
//function to get html form values of radio buttons
const getSelectedValues = (propertyValue) => {
   let allItems = document.querySelectorAll(propertyValue);
   let selItems = [];
   allItems.forEach(item => {
       if(item.checked)
           selItems.push(item.value);
   });
   return selItems;
}
//function to get form values by Id
const getInputValuesById = (id) => {
   let value = document.querySelector(id).value;
   return value;
}
//function to get form values
const getInputElementValue = (id) => {
   let value = document.getElementById(id).value;
   return value;
}
// UC-13
//Reset the Employee Payroll Form
const resetForm = () => {
    setValue('#name','');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary','');
    setValue('#notes','');
    setValue('#day','');
    setValue('#month','January');
    setValue('#year','2020');
}

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}