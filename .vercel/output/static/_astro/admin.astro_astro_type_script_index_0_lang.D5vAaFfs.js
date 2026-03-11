const g="TEM-admin-2026!";let a=null;const v=document.getElementById("login-section"),y=document.getElementById("dashboard-section"),I=document.getElementById("login-form"),l=document.getElementById("login-error"),w=document.getElementById("admin-password"),L=document.getElementById("logout-btn"),b=document.getElementById("create-code-form"),B=document.getElementById("max-generations"),m=document.getElementById("code-note"),k=document.getElementById("new-code-result"),E=document.getElementById("new-code-value"),c=document.getElementById("copy-code-btn"),T=document.getElementById("refresh-btn"),i=document.getElementById("codes-loading"),u=document.getElementById("codes-table"),C=document.getElementById("codes-tbody"),p=document.getElementById("codes-empty"),h=sessionStorage.getItem("tem-admin-password");h===g&&(a=h,x());I.addEventListener("submit",async t=>{t.preventDefault();const s=w.value;s===g?(a=s,sessionStorage.setItem("tem-admin-password",s),x()):(l.textContent="Invalid password",l.classList.remove("hidden"))});L.addEventListener("click",()=>{a=null,sessionStorage.removeItem("tem-admin-password"),v.classList.remove("hidden"),y.classList.add("hidden"),w.value="",l.classList.add("hidden")});b.addEventListener("submit",async t=>{t.preventDefault();const s=parseInt(B.value)||10,e=m.value.trim();try{const n=await fetch("/api/admin/codes",{method:"POST",headers:{"Content-Type":"application/json","X-Admin-Password":a||""},body:JSON.stringify({maxGenerations:s,note:e})}),o=await n.json();if(!n.ok)throw new Error(o.error||"Failed to create code");E.textContent=o.code.code,k.classList.remove("hidden"),m.value="",r()}catch(n){alert(n instanceof Error?n.message:"Failed to create code")}});c.addEventListener("click",()=>{const t=E.textContent;t&&(navigator.clipboard.writeText(t),c.innerHTML=`
          <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        `,setTimeout(()=>{c.innerHTML=`
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
          `},2e3))});T.addEventListener("click",r);function x(){v.classList.add("hidden"),y.classList.remove("hidden"),r()}async function r(){i.classList.remove("hidden"),u.classList.add("hidden"),p.classList.add("hidden");try{const t=await fetch("/api/admin/codes",{headers:{"X-Admin-Password":a||""}}),s=await t.json();if(!t.ok)throw new Error(s.error||"Failed to load codes");if(i.classList.add("hidden"),s.codes.length===0){p.classList.remove("hidden");return}C.innerHTML=s.codes.map(e=>`
          <tr class="border-b border-neutral-800 ${e.active?"":"opacity-50"}">
            <td class="px-4 py-4">
              <code class="font-mono text-amber-400">${e.code}</code>
            </td>
            <td class="px-4 py-4">
              ${e.active?e.isRegistered?'<span class="text-green-400">Registered</span>':'<span class="text-blue-400">Available</span>':'<span class="text-red-400">Deactivated</span>'}
            </td>
            <td class="px-4 py-4 text-neutral-400">
              ${e.email||"—"}
            </td>
            <td class="px-4 py-4">
              <span class="${e.usedGenerations>=e.maxGenerations?"text-red-400":"text-white"}">
                ${e.usedGenerations} / ${e.maxGenerations}
              </span>
            </td>
            <td class="px-4 py-4 text-neutral-500">
              ${e.createdAt}
            </td>
            <td class="px-4 py-4 text-neutral-500 max-w-[200px] truncate">
              ${e.note||"—"}
            </td>
            <td class="px-4 py-4">
              ${e.active?`<button 
                    class="deactivate-btn text-red-400 hover:text-red-300 text-sm transition-colors"
                    data-code="${e.code}"
                  >
                    Deactivate
                  </button>`:""}
            </td>
          </tr>
        `).join(""),u.classList.remove("hidden"),document.querySelectorAll(".deactivate-btn").forEach(e=>{e.addEventListener("click",async n=>{const o=n.currentTarget.dataset.code;if(o&&confirm(`Deactivate code ${o}? Users with this code will lose access.`))try{const d=await fetch("/api/admin/codes",{method:"DELETE",headers:{"Content-Type":"application/json","X-Admin-Password":a||""},body:JSON.stringify({code:o})}),f=await d.json();if(!d.ok)throw new Error(f.error||"Failed to deactivate code");r()}catch(d){alert(d instanceof Error?d.message:"Failed to deactivate code")}})})}catch(t){i.classList.add("hidden"),alert(t instanceof Error?t.message:"Failed to load codes")}}
