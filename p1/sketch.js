var boids = [];
var maxBoids = 50;

function setup() {
	createCanvas(1120, 760);
	background(21, 3, 77);
	loadBoids(maxBoids);
}

function draw() {
  runBoids();
}

function loadBoids(mb){
	//  Load my array with boids
	for(var i = 0; i < mb; i++){
	  boids[i] = new Boid(random(width), random(height), random(15, 20));
	}
}

function runBoids(){
	//  Load my array with boids
	for(var i = 0; i < maxBoids; i++){
	  boids[i].run();
	}
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++  Boid code
function  Boid(x, y, r)  {
	this.acc = createVector(random(-0.5,0.5), random(-0.5,0.5));
	this.vel = p5.Vector.random2D();
	this.pos = createVector(x, y);
	this.rad = r;
	this.rcr = random(120,255);
	this.rcg = random(50,60);
	this.rcb = random(200,50);
	this.maxspeed = 3; // Maximum speed
	this.maxforce = 0.5; // Maximum steering force
}

Boid.prototype.applyForce = function(force) {
	this.acc.add(force);
}


Boid.prototype.run = function() {
	this.update();
	this.checkEdges();
	this.render();
}


// Method to update location
Boid.prototype.update = function() {
	// Update velocity
	this.vel.add(this.acc);
	// Limit speed
	this.vel.limit(this.maxspeed);
	this.pos.add(this.vel);
	// Reset accelertion to 0 each cycle
	this.acc.mult(0);
}


// Wraparound
Boid.prototype.checkEdges = function() {
  if (this.pos.x < -this.rad) this.pos.x = width + this.rad;
  if (this.pos.y < -this.rad) this.pos.y = height + this.rad;
  if (this.pos.x > width + this.rad) this.pos.x = -this.rad;
  if (this.pos.y > height + this.rad) this.pos.y = -this.rad;
}

// Draw boid as a circle
Boid.prototype.render = function() {
  fill(this.rcr, this.rcg, this.rcb, 60);
  stroke(22);
  stroke(0,0,255,90);
  ellipse(this.pos.x, this.pos.y, this.rad, this.rad);


}
