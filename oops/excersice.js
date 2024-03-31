
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
        if(duration == 0 || !running) {
            throw new Error('stop watch has not started')
        }
        running=false;
        endTime = new Date();
        
    }

    this.reset=function(){
        duration = 0;
        running=false;
    }

    Object.defineProperty(this,'duration',{
        get:function(){
            return duration
        }
        
    })
}


function StopWatch(){
    this.duration=0;
    let running=false;
    this.start=function(){
        if(running){
            throw new Error('stop watch already started')
        }
        this.duration = new Date().getSeconds();
        running=true;

    }
    this.stop=function(){
        if(this.duration == 0 || !running) {
            throw new Error('stop watch has not started')
        }
        if(running){
            this.duration = new Date().getSeconds();
            running=false;
        }
        

    }
    this.reset=function(){
        this.duration = 0;
        running=false;
    }
}

const sw=new StopWatch();
sw.start();