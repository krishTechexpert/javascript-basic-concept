// value passed by reference type
let x={value:10}
function increase(number){
    number.value++;
    console.log('inner',number)
}
increase(x);
console.log(x)

//Object literal
const circle1={
    radius:1,
    location:{
        x:1,
        y:1
    },
    draw:function(){
        console.log('draw')
    }
}


// Factory Function
function createCircle(radius){
    return {
        radius,
        draw:function(){
            console.log('draw')
        }
    }
}

const circle2=createCircle(1)

// Constructor Function

function CreateCircle(radius){
    this.radius=radius;
    this.draw=function(){
        console.log('draw')
    }
}

CreateCircle.call({},1000)

//const circle3=new CreateCircle(10) // new={}

// internally constructor function create below same

const Circle=new Function('radius',` this.radius=radius;
this.draw=function(){
    console.log('draw')
}`)

const another=new Circle(1)



// implement abstraction we need to make salary and appraciel should not be the part of emp object.

function Employee(first,last){
    this.firstName=first;
    this.lastName=last;
    let salary=10000;
    let appraciel=function(){
        console.log(salary +3000);
    }
    this.fullName=function(){
        console.log(this.firstName + " " + this.lastName)
        appraciel()
    }
}
const emp1=new Employee('krish','kumar');
emp1.fullName();

// if you want to show salary out of the function in other places and appraciel method you want to used
//for this we need getter and setter method

function Employee2(first,last){
    this.firstName=first;
    this.lastName=last;
    let salary=10000;
    
    let appraciel=function(){
        console.log(salary +3000);
    }
    this.fullName=function(){
        console.log(this.firstName + " " + this.lastName)
        appraciel()
    }

    // this.getSalary=function(){
    //     return salary; // bad approach
    // }
   //before emp2.salary give undefined because it is not part of our emp object.
    
    // Solution:make getSalary method as property then used getter and setter
    // salary as valiable used ker rehy ty above but now salary is the part of our emp object and we can now access salary in other place as well.
    // solution : emp2.salary=10000; we can now acces here
    // used defineProperty with getter and setter
    Object.defineProperty(this,'salary',{
        get:function(){
            return salary;
        },
        set:function(value){
            if(!value){
                throw new Error('invalid value')
            }
            salary=value;
        }
    })

}
const emp2=new Employee2('krish','kumar');
emp2.fullName();
emp2.salary=20000;
console.log(emp2.salary)
