// Bouncer2 by 3koo2

var bouncers = [];
var lastDelta = 0;

class Bouncer{
    constructor(id, speed){
        console.log(id);
        this.element = document.getElementById(id);

        console.log(this.element);
        console.log(innerWidth);
        console.log(this.element.width);

        this.x=(innerWidth-this.element.width)/2;
        this.y=(innerHeight-this.element.height)/2;
        console.log(this.x);

        var dir = Math.random()*Math.PI*2;
        this.xv=speed*Math.cos(dir); // pixels per second
        this.yv=speed*Math.sin(dir);

        this.element.style.setProperty("position", "fixed");
        this.element.style.setProperty("left", 0);
        this.element.style.setProperty("top", 0);
    }

    init(){
        bouncers.push(this);
    }

    move(delta){
        if (this.x < 0 || this.x > innerWidth-this.element.width){
            if (this.x < 0){
                this.x = 0;
                this.xv=Math.abs(this.xv);
            }
            else{
                this.x = innerWidth-this.element.width;
                this.xv=-Math.abs(this.xv);
            }
        }
        if (this.y < 0 || this.y > innerHeight-this.element.height){
            if (this.y < 0){
                this.y = 0;
                this.yv=Math.abs(this.yv);
            }
            else{
                this.y = innerHeight-this.element.height;
                this.yv=-Math.abs(this.yv);
            }
        }

        this.x+=this.xv*delta/1000;
        this.y+=this.yv*delta/1000;

        this.goTo();
    }

    goTo(){
        this.element.style.setProperty("left",this.x+"px");
        this.element.style.setProperty("top",this.y+"px");
    }
}

function loop(d){
    for (var i = 0; i < bouncers.length; i++){
        bouncers[i].move(d-lastDelta)
    }
    lastDelta=d;
    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

// sample useage: 

var feely = new Bouncer("feely", 400);
feely.init();

function addBouncer(el){
    el.setAttribute("id", "summon");
    var b = new Bouncer("summon", Math.random()*140+260);
    b.init();
    el.removeAttribute("id");
}