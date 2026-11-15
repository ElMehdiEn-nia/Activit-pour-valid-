// =============================================================
// cart.js — fonctions de DONNÉES du panier
// Le panier est un tableau de petits objets : [{ id: 3, quantite: 2 }, …]
// Les infos d'une carte (nom, prix, stock) se retrouvent dans `cards` avec find.
// Règles : aucune ligne avec `document` ; chaque fonction renvoie un NOUVEAU tableau.
// =============================================================

/**
 * Retrouve une carte par son id. Renvoie l'objet carte, ou undefined.
 * Exemple : findCard(cards, 4) → { id: 4, nom: "Tidalix", … }
 */
export function findCard(cards, id) {
  return cards.find(card => card.id === id)
}

/**
 * Ajoute une carte au panier.
 * - déjà dans le panier : sa quantité augmente de 1, SAUF si elle a atteint le stock (panier inchangé)
 * - pas encore dans le panier : on l'ajoute avec { id, quantite: 1 }, SAUF si son stock vaut 0
 * Exemple : addToCart([], 1, cards) → [{ id: 1, quantite: 1 }]
 *           addToCart([{ id: 1, quantite: 1 }], 1, cards) → [{ id: 1, quantite: 2 }]
 */
export function addToCart(cart, id, cards) {
  const carte = findCard(cards, id);
  const ligne = cart.find(item => item.id === id);

  if (ligne) {
    if (ligne.quantite < carte.stock) {
      return cart.map(item => item.id === id ? {
        ...item, quantite: item.quantite + 1
      } : item)
    }
  }
  if (carte.stock > 0 && !ligne) {
    return [...cart, { id, quantite: 1 }];
  }

  return cart;
}

/**
 * Change la quantité d'une ligne de `delta` (+1 ou -1).
 * - la nouvelle quantité ne dépasse jamais le stock (sinon, panier inchangé)
 * - si la nouvelle quantité vaut 0 ou moins, la ligne est retirée
 */
export function changeQuantity(cart, id, delta, cards) {
  const carte = findCard(cards, id);
  const ligne = cart.find(item => item.id === id);

  if (!ligne || !carte) {
    return cart;
  }

  const nouvelleQuantite = ligne.quantite + delta;

  if (nouvelleQuantite <= 0) {
    return cart.filter(item => item.id !== id);
  }

  if (nouvelleQuantite > carte.stock) {
    return cart;
  }

  return cart.map(item =>
    item.id === id
      ? { ...item, quantite: nouvelleQuantite }
      : item
  );
}
/**
 * Retire la ligne de cette carte.
 * Exemple : removeFromCart([{ id: 1, quantite: 2 }, { id: 4, quantite: 1 }], 1) → [{ id: 4, quantite: 1 }]
 */
export function removeFromCart(cart, id) {
  return cart.filter(item => item.id !== id);
}

/**
 * Nombre total de cartes dans le panier (somme des quantités).
 * Exemple : cartCount([{ id: 1, quantite: 2 }, { id: 4, quantite: 1 }]) → 3
 */
export function cartCount(cart) {
  return card.reduce((total, item) => {
    return total + item.quantite;
  }, 0);
}

/**
 * Total du panier en DH (somme de quantite × prix).
 * Exemple : cartTotal([{ id: 1, quantite: 2 }], cards) → 24   (Emberkit coûte 12 DH)
 */
export function cartTotal(cart, cards) {
  return cart.reduce((total, item) => {
    const carte = findCard(cards, item.id)
    return totat + (item.quantite * carte.prix)
  }, 0);
}
