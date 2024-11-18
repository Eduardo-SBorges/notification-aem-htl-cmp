// Obtém o endpoint do atributo `data-endpoint` do container principal
const notificationContainer = document.getElementById('notification-container');
const API_URL = notificationContainer.dataset.endpoint;

const notificationBell = document.getElementById('notification-bell');
const notificationPanel = document.getElementById('notification-panel');
const notificationCount = document.getElementById('notification-count');
const notificationList = document.getElementById('notification-list');

// Toggle notification panel
notificationBell.addEventListener('click', () => {
  notificationPanel.classList.toggle('hidden');
});

// Fetch notifications from API
async function fetchNotifications() {
  try {
    const response = await fetch(API_URL);
    const notifications = await response.json();
    console.log('Notifications:', notifications);

    // Update notification count
    notificationCount.textContent = notifications.length;

    // Populate the notification list
    notificationList.innerHTML = '';
    notifications.forEach(notification => {
      const listItem = document.createElement('li');
      listItem.textContent = notification.title;
      notificationList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Failed to fetch notifications:', error);
  }
}

// Fetch notifications every 10 seconds
setInterval(fetchNotifications, 10000);

// Initial fetch
fetchNotifications();
