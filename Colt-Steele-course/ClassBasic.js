class Traingle{
  constructor(a,b){
    this.a=a;
    this.b=b;
  }

  getArea(){
    return (this.a*this.b)/2;
  }

  getHypotenuse(){
    return Math.sqrt(this.a ** 2 + this.b ** 2);
  }

  describe(){
    return `I am a traingle with area of ${this.getArea()}`;
  }
}

const traingle = new Traingle(2,4);
console.log(traingle.describe());

class ColorTraingle extends Traingle {
  constructor(a,b,color){
    super(a,b);
    this.color=color;
  }
  describe(){
    return  `Area is ${this.getArea()} and Color is ${this.color}!`
  }
}

const colorTraingle = new ColorTraingle(5,5,"red");
console.log(colorTraingle.describe())