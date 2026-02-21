const TRACKING_SCRIPT = `(function(){
  var s=document.currentScript;
  if(!s)return;
  var hn=location.hostname;
  if(hn==="localhost"||hn==="127.0.0.1"||hn==="[::1]"||hn.endsWith(".local"))return;
  var eid=s.getAttribute("data-explainer");
  var ename=s.getAttribute("data-name")||"";
  var eurl=s.getAttribute("data-url")||"";
  if(!eid)return;

  var base="https://scrolly.to";
  var sid=Math.random().toString(36).slice(2)+Date.now().toString(36);

  // Hostname + page path
  var h=location.hostname;
  var p=location.pathname;

  // UTM params
  var sp=new URLSearchParams(location.search);
  var utms=["utm_source","utm_medium","utm_campaign","utm_content"];
  var uq="";
  utms.forEach(function(k){var v=sp.get(k);if(v)uq+="&"+k+"="+encodeURIComponent(v);});

  // Pageview pixel
  new Image().src=base+"/pixel?s=oss&e="+eid+"&v=1&sid="+sid
    +"&h="+encodeURIComponent(h)+"&p="+encodeURIComponent(p)
    +(ename?"&n="+encodeURIComponent(ename):"")
    +(eurl?"&u="+encodeURIComponent(eurl):"")
    +uq;

  // Track sections viewed + dwell time
  var seen={};
  var st={};
  var sEnter={};
  var lastSec="";
  if(typeof IntersectionObserver!=="undefined"){
    var obs=new IntersectionObserver(function(entries){
      var now=Date.now();
      entries.forEach(function(en){
        var id=en.target.id;
        if(!id)return;
        if(en.isIntersecting){
          seen[id]=1;
          sEnter[id]=now;
          lastSec=id;
        }else if(sEnter[id]){
          st[id]=(st[id]||0)+Math.round((now-sEnter[id])/1000);
          delete sEnter[id];
        }
      });
    },{threshold:0.3});
    document.querySelectorAll("section[id]").forEach(function(el){obs.observe(el);});
  }

  // Track max scroll depth + milestones
  var maxScroll=0;
  var start=Date.now();
  var mFired={};
  window.addEventListener("scroll",function(){
    var de=document.documentElement;
    var pct=Math.round((window.scrollY/(de.scrollHeight-de.clientHeight))*100);
    if(pct>maxScroll)maxScroll=pct;
    [25,50,75,100].forEach(function(m){
      if(pct>=m&&!mFired[m]){
        mFired[m]=1;
        if(navigator.sendBeacon){
          navigator.sendBeacon(base+"/api/beacon",JSON.stringify({sid:sid,e:eid,milestone:m}));
        }
      }
    });
  },{passive:true});

  // Send engagement on exit
  function send(){
    var now=Date.now();
    var d=Math.round((now-start)/1000);
    // Flush active section timers
    Object.keys(sEnter).forEach(function(id){
      st[id]=(st[id]||0)+Math.round((now-sEnter[id])/1000);
      delete sEnter[id];
    });
    var sv=Object.keys(seen).join(",");
    var payload=JSON.stringify({sid:sid,e:eid,d:d,sd:maxScroll,sv:sv,st:st,ls:lastSec});
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
