const TRACKING_SCRIPT = `(function(){
  var s=document.currentScript;
  if(!s)return;
  var eid=s.getAttribute("data-explainer");
  var ename=s.getAttribute("data-name")||"";
  var eurl=s.getAttribute("data-url")||"";
  if(!eid)return;

  var base="https://scrolly.to";
  var sid=Math.random().toString(36).slice(2)+Date.now().toString(36);

  // Pageview pixel
  new Image().src=base+"/pixel?s=oss&e="+eid+"&v=1&sid="+sid
    +(ename?"&n="+encodeURIComponent(ename):"")
    +(eurl?"&u="+encodeURIComponent(eurl):"");

  // Track sections viewed
  var seen={};
  if(typeof IntersectionObserver!=="undefined"){
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting&&en.target.id)seen[en.target.id]=1;
      });
    },{threshold:0.3});
    document.querySelectorAll("section[id]").forEach(function(el){obs.observe(el);});
  }

  // Track max scroll depth
  var maxScroll=0;
  var start=Date.now();
  window.addEventListener("scroll",function(){
    var h=document.documentElement;
    var pct=Math.round((window.scrollY/(h.scrollHeight-h.clientHeight))*100);
    if(pct>maxScroll)maxScroll=pct;
  },{passive:true});

  // Send engagement on exit
  function send(){
    var d=Math.round((Date.now()-start)/1000);
    var sv=Object.keys(seen).join(",");
    var payload=JSON.stringify({sid:sid,e:eid,d:d,sd:maxScroll,sv:sv});
    if(navigator.sendBeacon){
      navigator.sendBeacon(base+"/api/beacon",payload);
    }else{
      var x=new XMLHttpRequest();
      x.open("POST",base+"/api/beacon",false);
      x.setRequestHeader("Content-Type","application/json");
      x.send(payload);
    }
  }
  document.addEventListener("visibilitychange",function(){
    if(document.visibilityState==="hidden")send();
  });
})();`;

export async function GET() {
  return new Response(TRACKING_SCRIPT, {
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
