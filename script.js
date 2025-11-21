// Coffee City — script.js (simulação sem servidor)
// Dados iniciais (mock)

const MENU = [
  // -------------------------
  // CLÁSSICOS
  // -------------------------
  {id:1, name:'Espresso', price:6.5, eco:false, img:'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=60'},
  {id:2, name:'Café Coado', price:5.0, eco:false, img:'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=800&q=60'},
  {id:3, name:'Pingado', price:6.0, eco:false, img:'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=800&q=60'},
  {id:4, name:'Café Americano', price:7.0, eco:false, img:'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=800&q=60'},

  // -------------------------
  // COM LEITE
  // -------------------------
  {id:5, name:'Cappuccino', price:10.0, eco:false, img:'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=60'},
  {id:6, name:'Latte', price:9.5, eco:false, img:'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&q=60'},
  {id:7, name:'Mocha', price:12.0, eco:false, img:'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=60'},
  {id:8, name:'Macchiato', price:8.5, eco:false, img:'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&q=60'},

  // -------------------------
  // GELADOS
  // -------------------------
  {id:9, name:'Iced Coffee', price:9.0, eco:false, img:'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=60'},
  {id:10, name:'Frappuccino Caseiro', price:13.0, eco:false, img:'https://images.unsplash.com/photo-1521302080391-cb1f1c6a4c7b?w=800&q=60'},
  {id:11, name:'Cold Brew', price:12.0, eco:false, img:'https://images.unsplash.com/photo-1525909002-0c6f7b6d3b63?w=800&q=60'},

  // -------------------------
  // ESPECIAIS
  // -------------------------
  {id:12, name:'Caramelo Latte', price:12.5, eco:false, img:'https://images.unsplash.com/photo-1521302080391-cb1f1c6a4c7b?w=800&q=60'},
  {id:13, name:'Baunilha Latte', price:12.5, eco:false, img:'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&q=60'},
  {id:14, name:'Café com Canela', price:7.5, eco:false, img:'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=60'},
  {id:15, name:'Café com Leite Vegetal', price:10.0, eco:true, img:'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=60'},

  // -------------------------
  // SUSTENTÁVEIS
  // -------------------------
  {id:16, name:'Café Orgânico', price:8.5, eco:true, img:'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=60'},
  {id:17, name:'Café Agroflorestal', price:9.5, eco:true, img:'https://images.unsplash.com/photo-1525909002-0c6f7b6d3b63?w=800&q=60'},
  {id:18, name:'Café de Reflorestamento', price:10.5, eco:true, img:'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=60'}
];

// ---------------------------
// FUNÇÕES GERAIS
// ---------------------------

function $qs(sel){ return document.querySelector(sel) }
function $qa(sel){ return Array.from(document.querySelectorAll(sel)) }

function getCart(){ return JSON.parse(localStorage.getItem('cc_cart')||'[]') }
function setCart(c){ localStorage.setItem('cc_cart', JSON.stringify(c)) }
function getPoints(){ return Number(localStorage.getItem('cc_points')||0) }
function setPoints(n){ localStorage.setItem('cc_points', String(n)) }

function updateCartCount(){
  const count = getCart().reduce((s,i)=>s+i.qty,0);
  const el = document.getElementById('cart-count');
  if(el) el.textContent = `Ver carrinho (${count})`;
}

// ---------------------------
// RENDERIZAR MENU
// ---------------------------

function renderMenu(){
  const grid = document.getElementById('menu-grid');
  if(!grid) return;
  grid.innerHTML = '';
  MENU.forEach(item=>{
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="p">
        <div style="display:flex; justify-content:space-between; align-items:center">
          <div>
            <div class="font-medium">${item.name}</div>
            <div class="muted small">${item.eco? '♻️ Embalagem reciclável':'Embalagem padrão'}</div>
          </div>
          <div class="font-medium">R$ ${item.price.toFixed(2)}</div>
        </div>
        <div style="margin-top:10px; display:flex; gap:8px">
          <button class="btn" onclick='addToCart(${item.id})'>Adicionar</button>
          <button class="btn outline" onclick='alert("Visualização rápida (mock) do ${item.name}")'>Ver</button>
        </div>
      </div>
    `;
    grid.appendChild(div);
  });
  updateCartCount();
}

// ---------------------------
// SUGESTÕES
// ---------------------------

function renderSuggestions(){
  const container = document.getElementById('suggestions');
  if(!container) return;
  container.innerHTML = '';
  MENU.forEach(it=>{
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<div style="display:flex; gap:10px; align-items:center">
      <img src="${it.img}" style="width:80px;height:60px;object-fit:cover;border-radius:8px">
      <div>
        <div class="font-medium">${it.name}</div>
        <div class="muted small">R$ ${it.price.toFixed(2)} • ${it.eco? 'eco':'standard'}</div>
      </div>
      <div style="margin-left:auto"><button class="btn small" onclick='addToCart(${it.id})'>Pedir</button></div>
    </div>`;
    container.appendChild(card);
  });
}

// ---------------------------
// CARRINHO
// ---------------------------

function addToCart(id){
  const item = MENU.find(m=>m.id===id);
  if(!item) return;
  const cart = getCart();
  const exists = cart.find(c=>c.id===id);
  if(exists) exists.qty++;
  else cart.push({...item, qty:1});
  setCart(cart);
  updateCartCount();
  alert(item.name + ' adicionado ao carrinho');
}

function renderCart(){
  const area = document.getElementById('cart-area');
  if(!area) return;
  const cart = getCart();
  area.innerHTML = '';
  if(cart.length===0){
    area.innerHTML = '<div class="card">Carrinho vazio — bora pedir um café?</div>';
    updateCartCount();
    return;
  }
  cart.forEach(it=>{
    const el = document.createElement('div');
    el.className = 'card';
    el.style.display = 'flex';
    el.style.alignItems = 'center';
    el.style.justifyContent = 'space-between';
    el.innerHTML = `<div style="display:flex;gap:12px;align-items:center">
      <img src="${it.img}" style="width:72px;height:64px;object-fit:cover;border-radius:8px">
      <div>
        <div class="font-medium">${it.name}</div>
        <div class="muted small">R$ ${it.price.toFixed(2)} x ${it.qty}</div>
      </div>
    </div>
    <div style="text-align:right">
      <div class="font-medium">R$ ${(it.price*it.qty).toFixed(2)}</div>
      <div style="margin-top:8px;display:flex;gap:6px;justify-content:flex-end">
        <button class="btn small" onclick="changeQty(${it.id}, -1)">-</button>
        <button class="btn small" onclick="changeQty(${it.id}, 1)">+</button>
        <button class="btn outline small" onclick="removeFromCart(${it.id})">Excluir</button>
      </div>
    </div>`;
    area.appendChild(el);
  });
  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const summary = document.createElement('div');
  summary.className = 'card';
  summary.style.marginTop='12px';
  summary.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center">
    <div>
      <div class="muted">Método</div>
      <div class="font-medium">Retirar no local</div>
    </div>
    <div class="font-bold">Total R$ ${total.toFixed(2)}</div>
  </div>
  <div style="margin-top:10px;display:flex;gap:8px">
    <button class="btn" onclick="confirmOrder()">Confirmar pedido</button>
    <button class="btn outline" onclick="clearCart()">Limpar</button>
  </div>`;
  area.appendChild(summary);
  updateCartCount();
}

function changeQty(id, delta){
  const cart = getCart();
  const item = cart.find(c=>c.id===id);
  if(!item) return;
  item.qty = Math.max(1, item.qty + delta);
  setCart(cart);
  renderCart();
}

function removeFromCart(id){
  let cart = getCart();
  cart = cart.filter(c=>c.id!==id);
  setCart(cart);
  renderCart();
  updateCartCount();
}

function clearCart(){
  if(!confirm('Deseja limpar o carrinho?')) return;
  setCart([]);
  renderCart();
  updateCartCount();
}

function confirmOrder(){
  const cart = getCart();
  if(cart.length===0) return alert('Carrinho vazio');
  const earned = 5 + cart.length*2;
  const points = getPoints() + earned;
  setPoints(points);
  setCart([]);
  renderCart();
  updateCartCount();
  alert('Pedido concluído! Você ganhou '+earned+' pts 🌱');
  window.location.href = 'points.html';
}

// ---------------------------
// PONTOS
// ---------------------------

function renderPoints(){
  const el = document.getElementById('points-total');
  if(el) el.textContent = getPoints();
  const hist = document.getElementById('points-history');
  if(hist){
    const raw = JSON.parse(localStorage.getItem('cc_redemptions')||'[]');
    hist.innerHTML = '<h3 class="font-medium">Histórico de resgates</h3>';
    if(raw.length===0) hist.innerHTML += '<div class="muted small">Nenhum resgate ainda.</div>';
    else raw.forEach(r=> hist.innerHTML += `<div>${r.date} — ${r.name}</div>`);
  }
}

function redeem(cost, name){
  const pts = getPoints();
  if(pts < cost) return alert('Pontos insuficientes');
  const raw = JSON.parse(localStorage.getItem('cc_redemptions')||'[]');
  raw.push({name, date:new Date().toLocaleDateString()});
  localStorage.setItem('cc_redemptions', JSON.stringify(raw));
  setPoints(pts - cost);
  renderPoints();
  alert('Resgatado: '+name);
}

// ---------------------------
// COMUNIDADE
// ---------------------------

function getPosts(){ 
  return JSON.parse(localStorage.getItem('cc_posts')||JSON.stringify([
    {id:1,user:'María',text:'Oficina de compostagem sábado 10h!',likes:4},
    {id:2,user:'Lucas',text:'Troca de copos reutilizáveis amanhã :)',likes:2}
  ])) 
}

function setPosts(p){ localStorage.setItem('cc_posts', JSON.stringify(p)) }

function renderCommunity(){
  const area = document.getElementById('posts-area');
  if(!area) return;
  area.innerHTML = '';
  const posts = getPosts();
  posts.forEach(p=>{
    const el = document.createElement('div');
    el.className = 'card';
    el.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:flex-start">
      <div>
        <div class="font-medium">${p.user}</div>
        <div class="muted small">${p.text}</div>
      </div>
      <div>${p.likes} ❤️</div>
    </div>
    <div style="text-align:right;margin-top:8px"><button class="btn small" onclick="likePost(${p.id})">Curtir</button></div>`;
    area.appendChild(el);
  });
  const form = document.getElementById('post-form');
  if(form) form.style.marginTop='12px';
}

function createPost(e){
  e.preventDefault();
  const txt = document.getElementById('post-text').value.trim();
  if(!txt) return;
  const posts = getPosts();
  const id = posts.length ? Math.max(...posts.map(p=>p.id))+1 : 1;
  posts.unshift({id, user:'Você', text:txt, likes:0});
  setPosts(posts);
  document.getElementById('post-text').value = '';
  renderCommunity();
}

function likePost(id){
  const posts = getPosts();
  const p = posts.find(x=>x.id===id);
  if(!p) return;
  p.likes++;
  setPosts(posts);
  renderCommunity();
}

// ---------------------------
// PERFIL
// ---------------------------

function renderProfile(){
  const nameEl = document.getElementById('user-name');
  const levelEl = document.getElementById('user-level');
  if(nameEl) nameEl.textContent = localStorage.getItem('cc_user_name') || 'Juju Coffee';
  if(levelEl) levelEl.textContent = (localStorage.getItem('cc_user_level')||'Ouro Verde') + ' • ' + getPoints() + ' pts';
}

// ---------------------------
// INIT
// ---------------------------

updateCartCount();
renderPoints();
