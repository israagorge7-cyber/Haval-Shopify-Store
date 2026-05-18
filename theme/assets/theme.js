/* ===== STIQO Theme JS ===== */
(function () {
  'use strict';

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  const formatMoney = (cents) => {
    const value = (cents / 100).toLocaleString('de-DE', {
      style: 'currency', currency: 'EUR', minimumFractionDigits: 2,
    });
    return value;
  };

  /* ----- Mobile nav toggle ----- */
  const burger = $('[data-mobile-toggle]');
  const mobileNav = $('[data-mobile-nav]');
  if (burger && mobileNav) {
    burger.addEventListener('click', () => mobileNav.classList.toggle('is-open'));
  }

  /* ----- Cart drawer ----- */
  const drawer = $('[data-cart-drawer]');
  const drawerBody = $('[data-cart-body]');
  const drawerEmpty = $('[data-cart-empty]');
  const drawerFoot = $('[data-cart-foot]');
  const drawerTotal = $('[data-cart-total]');
  const cartCountEl = $('[data-cart-count]');
  const shipbarText = $('[data-shipbar-text]');
  const shipbarFill = $('[data-shipbar-fill]');

  const openDrawer = () => drawer && drawer.classList.add('is-open');
  const closeDrawer = () => drawer && drawer.classList.remove('is-open');

  $$('[data-cart-open]').forEach(b => b.addEventListener('click', (e) => { e.preventDefault(); fetchCart(); openDrawer(); }));
  $$('[data-cart-close]').forEach(b => b.addEventListener('click', closeDrawer));

  function renderCart(cart) {
    if (!drawerBody) return;
    if (cartCountEl) cartCountEl.textContent = cart.item_count;

    if (cart.item_count === 0) {
      drawerBody.innerHTML = '';
      drawerBody.appendChild(drawerEmpty || document.createElement('p'));
      if (drawerEmpty) drawerEmpty.hidden = false;
      if (drawerFoot) drawerFoot.hidden = true;
      updateShipbar(0);
      return;
    }

    if (drawerEmpty) drawerEmpty.hidden = true;
    if (drawerFoot) drawerFoot.hidden = false;

    drawerBody.innerHTML = cart.items.map(item => `
      <div class="cart-drawer__line" data-line="${item.key}">
        <img src="${item.image ? item.image.replace(/_(\d+)x\.?/, '_120x.') : ''}" alt="${item.product_title}">
        <div>
          <strong>${item.product_title}</strong>
          ${item.variant_title && item.variant_title !== 'Default Title' ? `<div style="color:var(--color-muted);font-size:.85rem">${item.variant_title}</div>` : ''}
          <div style="display:flex;gap:.5rem;align-items:center;margin-top:.4rem">
            <button data-cart-decr="${item.key}">−</button>
            <span>${item.quantity}</span>
            <button data-cart-incr="${item.key}">+</button>
            <button class="cart-drawer__lineremove" data-cart-remove="${item.key}">Entfernen</button>
          </div>
        </div>
        <span><strong>${formatMoney(item.final_line_price)}</strong></span>
      </div>
    `).join('');

    if (drawerTotal) drawerTotal.textContent = formatMoney(cart.total_price);
    updateShipbar(cart.total_price);
    bindLineButtons();
  }

  function updateShipbar(total) {
    if (!window.STIQO || !window.STIQO.freeShipping || !window.STIQO.freeShipping.enabled) return;
    const threshold = window.STIQO.freeShipping.threshold;
    if (!threshold) return;
    const remaining = Math.max(0, threshold - total);
    if (shipbarText) {
      shipbarText.textContent = remaining > 0
        ? `Nur noch ${formatMoney(remaining)} bis zum kostenlosen Versand!`
        : 'Glückwunsch – du erhältst Gratisversand!';
    }
    if (shipbarFill) {
      const pct = Math.min(100, (total / threshold) * 100);
      shipbarFill.style.width = pct + '%';
    }
  }

  function bindLineButtons() {
    $$('[data-cart-incr]').forEach(b => b.addEventListener('click', () => changeLine(b.dataset.cartIncr, +1)));
    $$('[data-cart-decr]').forEach(b => b.addEventListener('click', () => changeLine(b.dataset.cartDecr, -1)));
    $$('[data-cart-remove]').forEach(b => b.addEventListener('click', () => setLine(b.dataset.cartRemove, 0)));
  }

  async function changeLine(key, delta) {
    const cart = await fetchCart();
    const line = cart.items.find(i => i.key === key);
    if (!line) return;
    setLine(key, line.quantity + delta);
  }

  async function setLine(key, qty) {
    const res = await fetch(window.STIQO.routes.cart_change_url + '.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ id: key, quantity: qty }),
    });
    const cart = await res.json();
    renderCart(cart);
  }

  async function fetchCart() {
    const res = await fetch(window.STIQO.routes.cart_get_url, { headers: { Accept: 'application/json' } });
    const cart = await res.json();
    renderCart(cart);
    return cart;
  }

  /* ----- Add to cart (AJAX) ----- */
  $$('[data-product-form]').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submit = form.querySelector('[data-add-to-cart]');
      const original = submit ? submit.textContent : '';
      if (submit) { submit.disabled = true; submit.textContent = 'Wird hinzugefügt …'; }

      const fd = new FormData(form);
      try {
        const r = await fetch(window.STIQO.routes.cart_add_url + '.js', {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: fd,
        });
        if (!r.ok) throw new Error('Fehler');
        await fetchCart();
        openDrawer();
      } catch (err) {
        alert('Bitte versuche es erneut.');
      } finally {
        if (submit) { submit.disabled = false; submit.textContent = original; }
      }
    });
  });

  /* ----- Variant selector ----- */
  $$('[data-product-form]').forEach(form => {
    const optionInputs = form.querySelectorAll('[data-option-input]');
    const select = form.querySelector('[data-variant-select]');
    if (!select) return;
    optionInputs.forEach(input => {
      input.addEventListener('change', () => {
        // mark active pill
        const fieldset = input.closest('.product-form__option');
        if (fieldset) fieldset.querySelectorAll('.variant-pill').forEach(p => p.classList.remove('is-active'));
        const lbl = input.closest('.variant-pill');
        if (lbl) lbl.classList.add('is-active');

        const selectedOptions = Array.from(form.querySelectorAll('[data-option-input]:checked')).map(i => i.value);
        // pick variant whose title matches selectedOptions joined by " / "
        const target = selectedOptions.join(' / ');
        for (const opt of select.options) {
          if (opt.text.startsWith(target)) {
            select.value = opt.value;
            break;
          }
        }
      });
    });
  });

  /* ----- Quantity buttons ----- */
  $$('[data-qty-up]').forEach(b => b.addEventListener('click', () => {
    const input = b.parentElement.querySelector('input');
    if (input) input.value = parseInt(input.value || '1', 10) + 1;
  }));
  $$('[data-qty-down]').forEach(b => b.addEventListener('click', () => {
    const input = b.parentElement.querySelector('input');
    if (input) input.value = Math.max(1, parseInt(input.value || '1', 10) - 1);
  }));

  /* ----- Product gallery thumbs ----- */
  $$('[data-thumb]').forEach(t => t.addEventListener('click', () => {
    const main = $('#ProductMainImage');
    if (main) main.src = t.dataset.image;
    $$('[data-thumb]').forEach(x => x.classList.remove('is-active'));
    t.classList.add('is-active');
  }));

  /* ----- Initial cart load ----- */
  if (drawer) fetchCart();
})();
