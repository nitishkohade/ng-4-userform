export 
class User {
    fname:string;
    age:number;
    salary:number;
    dob:string;
    role:string;
    constructor(id:number, body:any,salary?:number) {
        if(!body.fname ){
            throw "fname is mandatory";
        }
        this.role=body.role;
           this.fname=body.fname;
            this.age=body.age;
            this.salary=body.salary;
            this.dob=body.dob;
    }
}