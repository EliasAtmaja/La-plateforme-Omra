/**
 * Relie deux champs date « arrivée » / « départ » :
 * le départ ne peut jamais être antérieur à l'arrivée, et aucune des deux
 * dates ne peut être dans le passé.
 *
 * Les contraintes sont posées via les attributs min/max (le sélecteur de date
 * du navigateur grise alors les jours interdits) ET revérifiées à la volée,
 * pour les saisies au clavier.
 */
export function linkDateRange(arrivalId: string, departureId: string): void {
  const arrival = document.getElementById(arrivalId) as HTMLInputElement | null;
  const departure = document.getElementById(departureId) as HTMLInputElement | null;
  if (!arrival || !departure) return;

  const today = new Date().toISOString().slice(0, 10);
  arrival.min = today;

  const sync = (changed?: 'arrival' | 'departure') => {
    // Le départ ne descend jamais sous l'arrivée (ni sous aujourd'hui).
    departure.min = arrival.value || today;

    if (arrival.value && departure.value && departure.value < arrival.value) {
      if (changed === 'arrival') {
        // L'utilisateur vient de reculer l'arrivée : on aligne le départ.
        departure.value = arrival.value;
      } else {
        departure.value = '';
      }
    }
    // Symétrique : l'arrivée ne peut pas dépasser le départ déjà choisi.
    arrival.max = departure.value || '';
  };

  arrival.addEventListener('change', () => sync('arrival'));
  departure.addEventListener('change', () => sync('departure'));
  sync();
}

/** Contrôle final avant envoi. Renvoie un message d'erreur, ou '' si tout va bien. */
export function checkDateRange(arrival: string, departure: string): string {
  if (!arrival || !departure) return '';
  if (departure < arrival) {
    return 'La date de départ ne peut pas être antérieure à la date d\'arrivée.';
  }
  return '';
}
