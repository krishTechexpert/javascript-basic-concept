
function StopWatch(){
    // declare private variale
    let startTime,endTime,running,duration=0;

    this.start=function(){
        if(running){
            throw new Error('stop watch already started')
        }
        running=true;
        startTime = new Date();

    }

    this.stop=function(){
        if(!running) {
            throw new Error('stop watch has not started')
        }
        running=false;
        endTime = new Date();
        const seconds= (endTime.getTime()-startTime.getTime())/1000;
        duration+=seconds;

    }

    this.reset=function(){
        duration = 0;
        running=false;
    }
    
    Object.defineProperty(this,'duration',{
        get:function(){
            console.log(this);
            return duration
        }
        
    })
}

const sw=new StopWatch();
sw.start();