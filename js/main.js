(() => {
 const $=(s,r=document)=>r.querySelector(s);
 const langSelect=$("#languageSelect");
 const available=["en","am"];
 const storage={get(key){try{return localStorage.getItem(key)}catch(_){return null}},set(key,value){try{localStorage.setItem(key,value)}catch(_){/* The page still works when storage is unavailable. */}}};
 const saved=storage.get("gal-alt-language")||"en";
 function applyLanguage(lang){
   const safeLang=available.includes(lang)?lang:"en";
   const dict=window.GAL_TRANSLATIONS?.[safeLang]||window.GAL_TRANSLATIONS?.en||{};
   document.documentElement.lang=safeLang;
   document.documentElement.dir="ltr";
   document.querySelectorAll("[data-i18n]").forEach(el=>{const key=el.dataset.i18n;if(dict[key])el.textContent=dict[key]});
   if(langSelect)langSelect.value=safeLang;
   storage.set("gal-alt-language",safeLang);
 }
 if(langSelect)langSelect.addEventListener("change",e=>applyLanguage(e.target.value));
 applyLanguage(saved);
 const menu=$(".menu-toggle"),nav=$(".main-nav");
 if(menu&&nav){menu.setAttribute("aria-expanded","false");menu.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",String(open));});nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menu.setAttribute("aria-expanded","false")}));}
 const banner=$("#cookieBanner");
 const cookieChoice=storage.get("gal-alt-cookie");
 if(banner&&cookieChoice){banner.hidden=true;banner.setAttribute("aria-hidden","true");banner.style.display="none";}
 function closeCookieBanner(choice){
   storage.set("gal-alt-cookie",choice);
   if(banner){banner.hidden=true;banner.setAttribute("hidden","");banner.setAttribute("aria-hidden","true");banner.style.display="none";}
 }
 // Explicit button handlers keep both choices functional on every page.
 const acceptButton=$("#cookieAccept"),declineButton=$("#cookieDecline");
 acceptButton?.addEventListener("click",event=>{event.preventDefault();closeCookieBanner("accepted")});
 declineButton?.addEventListener("click",event=>{event.preventDefault();closeCookieBanner("declined")});
 const year=$("#year");if(year)year.textContent=new Date().getFullYear();
 const form=$("#contactForm");
 form?.addEventListener("submit",e=>{
   e.preventDefault();
   const status=$("#formStatus");
   if(!form.reportValidity()) return;
   const data=new FormData(form);
   const name=(data.get("name")||"").toString().trim();
   const senderEmail=(data.get("email")||"").toString().trim();
   const phone=(data.get("phone")||"").toString().trim();
   const institution=(data.get("institution")||"").toString().trim();
   const subject=(data.get("subject")||"Website inquiry").toString().trim();
   const message=(data.get("message")||"").toString().trim();
   const body=[
     `Name: ${name}`,
     `Email: ${senderEmail}`,
     `Phone: ${phone || "Not provided"}`,
     `Institution / Organization: ${institution || "Not provided"}`,
     "",
     "Message:",
     message
   ].join("\n");
   const gmailUrl="https://mail.google.com/mail/?view=cm&fs=1&to="+encodeURIComponent("galtech2023@gmail.com")+"&su="+encodeURIComponent(subject)+"&body="+encodeURIComponent(body);
   const opened=window.open(gmailUrl,"_blank","noopener,noreferrer");
   if(!opened) window.location.href=gmailUrl;
   if(status) status.textContent="Gmail has been opened with your message prepared. Review the details and press Send in Gmail to deliver it to GAL Technology.";
 });
})();
