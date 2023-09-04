let objJson = [];
let arrData = [];

document.getElementById("myForm").addEventListener("submit", function(event) {
  event.preventDefault();

  let frm = new FormHandle(objJson,arrData);
  frm.validation();

});


class FormHandle{
  constructor(jsonArray,arrData){
      this.arrData = arrData;
      this.name = document.getElementById("name").value.trim();
      this.email = document.getElementById("email").value.trim();
      this.password = document.getElementById("password").value;
      this.phone = document.getElementById("phone").value.trim();
      this.file = document.getElementById("file").files[0];
      this.errorMessages = "";
      this.regexPattern = /^(?=.*\d)(?=.*[A-Z])(.{8,50})$/;
      this.nameError = document.getElementById('error-name');
      this.emailError = document.getElementById('error-email') ;
      this.passwordError = document.getElementById('error-password' );
      this.phonenumberError = document.getElementById('error-phone');
      this.fileError = document.getElementById('error-file');
      this.allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      this.showData = document.getElementById('show-data');
      this.jsonData = document.getElementById('json-data');
      this.arrStore = [];
      this.objJson = jsonArray
      this.dataObj = {};
      }

  validation(){
    // Validation for Name
      if (this.name === "") {
          this.nameError.innerText="Name is required.";
          setTimeout(() => {
            this.nameError.innerText="";
          }, 2000);
          
          this.errorMessages += "Name is required.<br>";
        }
    // Validation for email
        if (this.email === "") {
          this.emailError.innerText="Email is required.";
          setTimeout(() => {
            this.emailError.innerText="";
          }, 2000);
          this.errorMessages += "Email is required.<br>";
        } else if (!/\S+@\S+\.\S+/.test(this.email)) {
          this.emailError.innerText="Invalid email format.<br>";
          setTimeout(() => {
            this.emailError.innerText="";
          }, 2000);
          this.errorMessages += "Invalid email format.<br>";
        }
        
        //Validation for password
        if (this.password === "") {
          this.passwordError.innerText="Password is required.";
          setTimeout(() => {
            this.passwordError.innerText="";
          }, 2000);
          this.errorMessages += "Password is required.<br>";
        } else if (this.password.length < 8) {
          this.passwordError.innerText="Password must be at least 8 characters long.<br>";
          setTimeout(() => {
            this.passwordError.innerText="";
          }, 2000);
          this.errorMessages += "Password must be at least 8 characters long.<br>";
        } else if (!this.regexPattern.test(this.password)){
          this.passwordError.innerText="Password must contain 1 uppercase & 1 lowercase character <br> & 1 number & 1 special Character.<br>";
          setTimeout(() => {
            this.passwordError.innerText="";
          }, 2000);
          this.errorMessages += "Password must contain 1 uppercase & 1 lowercase character <br> & 1 number & 1 special Character. <br>"
        }

        // Validation for Phone
        if (!/^[6-9]\d{9}$/.test(this.phone)) {
          this.phonenumberError.innerText="Phone number field cannot be empty OR Should be of length 10";
          setTimeout(() => {
            this.phonenumberError.innerText="";
          }, 2000);
          this.errorMessages+= 'Phone number field cannot be empty';
        } 
    
        // Validation for File
        if (document.getElementById('file').value == '') {
          this.fileError.innerText="Invalid file type. Please upload a JPEG, PNG, or PDF file.";
          setTimeout(() => {
            this.fileError.innerText="";
          }, 2000);
          document.getElementById('file').value = '';
       }else if (this.file.size> 40000000) {
        this.fileError.innerText="File Size Exceed 5MB!!! ";
        setTimeout(() => {
          this.fileError.innerText="";
        }, 2000);
        document.getElementById('file').value = '';
       }
       else if(!this.allowedTypes.includes(this.file.type)) { 

        this.fileError.innerText="Invalid file type. Please upload a JPEG, PNG, or PDF file.";
       }
    
    
      //  Checking for error message if it is empty or not

        if (this.errorMessages !== "") {
          // document.getElementById("errorMessages").innerHTML = errorMessages;
          document.getElementById("errorMessages").style.color='red';
          document.getElementById("errorMessages").style.textAlign='center';
          setTimeout(()=>{
          document.body.childNodes[1].innerHTML="";
        },2000);
        }else{
          this.display();
        }
  }
      
  display(){
      
      this.arrStore.push(`[ ${this.name},${this.email},${this.password},${this.phone} ]`);
      this.arrData.push(this.arrStore);
      console.log(arrData);

      this.arrStore.forEach((el)=>{
          // el += "<br>";
          let pera = document.createElement('p');
          pera.appendChild(document.createTextNode(el));
          this.showData.appendChild(pera);
      })

      // this.dataObj['Name']=this.name;
      // this.dataObj['Email']=this.email;
      // this.dataObj['Password']=this.password;
      // this.dataObj['Phone']=this.phone;
      // this.dataObj['File']=this.file?.name;
      

      this.objJson.push(this.dataObj);
      console.log(this.objJson);
      var objString=JSON.stringify({
        Name: this.name,
        Email : this.email ,
        password : this.password ,
        Phone : this.phone ,
        File : this.file?.name 
                    });
      console.log(objString);

                    // Experiment
      // localStorage.setItem(`myObject${this.name}`, JSON.stringify([this.objJson]));
      // localStorage.getItem(`myObject${this.name}`);
      // console.log(JSON.parse(localStorage[`myObject${this.name}`]));
                    // Experiment End
      let pera = document.createElement('p');
      pera.appendChild(document.createTextNode(`${objString} ,`));
      this.jsonData.appendChild(pera);

      document.getElementById('file').value = "";
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
      document.getElementById("phone").value = "";

  }
  
}
