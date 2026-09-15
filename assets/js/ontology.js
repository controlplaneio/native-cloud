// Unobtrusive JavaScript for ontology key interactions
// Uses History API to update fragment, and highlights the current key

console.log('ontology.js loaded');

function highlightCurrentFragment() {
  const fragment = window.location.hash.substring(1);

  // Remove highlight from all dt elements
  document.querySelectorAll('.ontology-keys dt').forEach(function(dt) {
    dt.classList.remove('highlighted');
  });

  // Add highlight to the dt matching the current fragment
  if (fragment) {
    const targetDt = document.getElementById(fragment);
    if (targetDt && targetDt.tagName === 'DT') {
      targetDt.classList.add('highlighted');
      // Open the details for the highlighted key
      const nextDd = targetDt.nextElementSibling;
      if (nextDd && nextDd.tagName === 'DD') {
        const details = nextDd.querySelector('details');
        if (details) {
          details.setAttribute('open', '');
        }
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const ontologyKeysSection = document.querySelector('.ontology-keys');

  if (ontologyKeysSection) {
    // If page loaded with a fragment, insert a clean history entry first
    // so that Back works after pressing Escape
    const initialFragment = window.location.hash.substring(1);
    if (initialFragment) {
      history.replaceState(null, null, window.location.pathname);
      history.pushState(null, null, '#' + initialFragment);
    }

    const dtElements = ontologyKeysSection.querySelectorAll('dt');

    dtElements.forEach(function(dt) {
      dt.style.cursor = 'pointer';

      dt.addEventListener('click', function(e) {
        e.preventDefault();
        const keyId = dt.id;
        if (keyId) {
          const currentFragment = window.location.hash.substring(1);
          if (currentFragment && currentFragment !== keyId) {
            // Push new history entry when navigating between keys
            history.pushState(null, null, '#' + keyId);
          } else {
            // Replace when setting initial fragment or clicking same key
            history.replaceState(null, null, '#' + keyId);
          }
          highlightCurrentFragment();
        }
      });
    });

    // Highlight the current fragment on load
    highlightCurrentFragment();
  } else {
    console.log('ontology.js: No .ontology-keys section found');
  }
});

// Listen for hash changes (e.g., browser back/forward)
window.addEventListener('hashchange', function() {
  highlightCurrentFragment();
});

// Listen for popstate (back/forward navigation with pushState)
window.addEventListener('popstate', function() {
  highlightCurrentFragment();
});

// Handle Escape key to collapse details or clear fragment
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    const fragment = window.location.hash.substring(1);
    if (!fragment) return;

    const ontologyKeysSection = document.querySelector('.ontology-keys');
    if (!ontologyKeysSection) return;

    const allDetails = ontologyKeysSection.querySelectorAll('details');
    const openDetails = Array.from(allDetails).filter(d => d.open);
    const targetDt = document.getElementById(fragment);

    if (openDetails.length > 1) {
      // Collapse all details except the one matching the current fragment
      openDetails.forEach(function(details) {
        const dd = details.parentElement;
        const dt = dd ? dd.previousElementSibling : null;
        if (dt && dt.id !== fragment) {
          details.removeAttribute('open');
        }
      });
    } else if (openDetails.length === 1 && targetDt) {
      // Only the selected key's details are open: clear fragment and close it
      history.pushState(null, null, window.location.pathname);
      highlightCurrentFragment();
      openDetails[0].removeAttribute('open');
    } else if (openDetails.length === 0 && fragment) {
      // Details manually collapsed but fragment still exists: clear fragment
      history.pushState(null, null, window.location.pathname);
      highlightCurrentFragment();
    }
  }
});

// Uncheck "more" checkboxes when details are closed
// (you can reveal them again by opening the <details> again and then
// clicking the label for the "more" toggle)
document.addEventListener('DOMContentLoaded', function() {
  const ontologyKeysSection = document.querySelector('.ontology-keys');

  if (ontologyKeysSection) {
    const detailsElements = ontologyKeysSection.querySelectorAll('details');

    detailsElements.forEach(function(details) {
      details.addEventListener('toggle', function() {
        // If details is being closed (not open)
        if (!details.open) {
          // Find, and uncheck, any more-toggle checkboxes inside
          const moreToggles = details.querySelectorAll('.more-toggle');
          moreToggles.forEach(function(checkbox) {
            checkbox.checked = false;
          });
        }
      });
    });
  }
});
