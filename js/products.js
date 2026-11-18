(() => {
 const grid=document.querySelector("#productGrid"); if(!grid)return;
 const items=[
 ["Concrete Testing Equipment","Civil Engineering","Equipment category for concrete testing and material evaluation.","engineering-testing-lab.jpg"],
 ["Soil Testing Equipment","Civil Engineering","Tools used in educational soil mechanics laboratories.","engineering-testing-lab.jpg"],
 ["Surveying Instruments","Civil Engineering","Instruments for measurement and surveying demonstrations.","engineering-laboratory.webp"],
 ["Thermodynamics Laboratory Equipment","Mechanical Engineering","Equipment categories for heat and thermodynamics experiments.","mechanical-engineering-lab.webp"],
 ["Fluid Mechanics Equipment","Mechanical Engineering","Teaching equipment for fluid flow and mechanics.","mechanical-engineering-lab.webp"],
 ["Electrical Measurement Instruments","Electrical Engineering","Instruments for electrical measurement and learning.","technical-training-lab.jpg"],
 ["Electronics Training Kits","Electrical Engineering","Educational kits for electronics concepts.","technical-training-lab.jpg"],
 ["Mechanics Laboratory Equipment","Physics","Apparatus for mechanics experiments and demonstrations.","engineering-laboratory.webp"],
 ["Optics Equipment","Physics","Equipment categories for light and optics experiments.","laboratory-instruments.webp"],
 ["Microscopes","Biological Sciences","Microscopes for educational observation and laboratory learning.","science-laboratory.webp"],
 ["Laboratory Centrifuges","Biological Sciences","Centrifuges for biological science teaching laboratories.","science-laboratory.webp"],
 ["Analytical Balances","Chemistry","Precision weighing equipment for chemistry education.","laboratory-instruments.webp"],
 ["Laboratory Glassware","Chemistry","Glassware categories for educational chemistry laboratories.","chemical-engineering-lab.webp"],
 ["Laboratory Furniture","General Laboratory","Furniture and workspace categories for laboratory environments.","technical-training-lab.jpg"],
 ["Fume Hoods","General Laboratory","Laboratory ventilation and containment equipment category.","chemical-engineering-lab.webp"]
 ];
 const search=document.querySelector("#productSearch"),filter=document.querySelector("#categoryFilter"),sort=document.querySelector("#sortProducts");
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 function render(){
  const term=(search?.value||"").trim().toLowerCase();
  let list=items.filter(p=>(!filter||filter.value==="all"||p[1]===filter.value)&&p.slice(0,3).join(" ").toLowerCase().includes(term));
  list.sort((a,b)=>sort?.value==="za"?b[0].localeCompare(a[0]):a[0].localeCompare(b[0]));
  grid.innerHTML=list.length?list.map((p,i)=>`<article class="product-card"><img class="product-thumb" src="assets/images/${esc(p[3])}" alt="${esc(p[1])} laboratory environment" loading="lazy"><small>${esc(p[1])} / ${String(i+1).padStart(2,"0")}</small><div><h3>${esc(p[0])}</h3><p>${esc(p[2])}</p></div><span class="muted">Catalog category — availability to be confirmed</span></article>`).join(""):'<p class="catalog-note">No matching catalog categories found. Try another search or discipline.</p>';
 }
 [search,filter,sort].filter(Boolean).forEach(el=>el.addEventListener("input",render));render();
})();
