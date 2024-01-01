/*
To introduce the problem, 
think to my neighbor who drives a tanker truck. 

The level indicator is down and he is worried 
because he does not know if he will be able to make deliveries. 
We put the truck on a horizontal ground and 
measured the height of the liquid in the tank.

Fortunately, the tank is a perfect cylinder 
and the vertical walls on each end are flat. 
The height of the remaining liquid is h, 
the diameter of the cylinder base is d, 
the total volume is vt (h, d, vt are positive or null integers). 
You can assume that h <= d.

Could you calculate the remaining volume of the liquid? 
Your function tankvol(h, d, vt) returns an integer which is the 
truncated result (e.g floor) of your float calculation.

Examples:
  tankvol(40,120,3500) should return 1021 (calculation gives about: 1021.26992027)
  tankvol(60,120,3500) should return 1750
  tankvol(80,120,3500) should return 2478 (calculation gives about: 2478.73007973)
*/


// Solution

function tankvol(h, d, vt) {
  let r = d / 2;
  let w = vt / (r * r * Math.PI);
  let a = (r * r) * Math.acos(1 - h / r) 
        - (r - h) * Math.sqrt(2 * r * h - h * h); 
  
  return w * a | 0;
}

// or

function tankvol(h, d, vt) {
  if (h === 0) return 0;
  // radius
  let r = d / 2.0;
  if (h === r) return Math.floor(vt / 2);
  if (h === d) return vt;
  // height > radius, calculate with d - h and at the end change the volume
  if (h > r) {
      h = d - h;
      let hilevel = true;
  }
  else
      hilevel = false;
  // total area of circle
  let st = Math.PI * r * r;
  // half angle from the center
  let theta = Math.acos((r - h) / r);
  // b = sqrt(r * r - (r - h) ** 2) one side of the right triangle
  let sr = (r - h) * Math.sqrt(r * r - (r - h) * (r - h));
  // area corresponding to angle 2 * theta
  let sa = st / Math.PI * theta;
  // surface corresponding to the height
  let sh = sa - sr;
  // volume to find corresponding to surface of liquid / total surface
  let v = vt * sh / st;
  // if height > radius
  if (hilevel)
      v = vt - v;   
  return Math.floor(v)
}