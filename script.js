let user=null;
function login(){
 let u=document.getElementById("user").value;
 if(!u)return;
 user=u;
 if(!localStorage[u]) localStorage[u]=1000;
 document.getElementById("auth").style.display="none";
 document.getElementById("menu").style.display="block";
 document.getElementById("balanceBox").style.display="block";
 update();
}
function update(){ document.getElementById("bal").textContent=localStorage[user]; }
function openGame(g){ location.href=g+'?u='+user; }
