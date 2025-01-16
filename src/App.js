import { useState, useEffect } from 'react';


function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  const handleNotificationClick = () => {
    if ('serviceWorker' in navigator && 'Notification' in window) {
            navigator.serviceWorker.ready.then((registration) => {
              if (Notification.permission === 'granted') {
                registration.showNotification('Hello! This is a SPWA', {
                  body: 'This is a notification triggered by the service worker.',
                  icon: '/icon-192x192.png', // Ensure this icon exists in your public folder
                  tag: 'notification-tag', // Optional: group notifications with the same tag
                });
              } else if (Notification.permission === 'default') {
                Notification.requestPermission().then((permission) => {
                  if (permission === 'granted') {
                    registration.showNotification('Hello! This is a SPWA', {
                      body: 'This is a notification triggered by the service worker.',
                      icon: '/icon-192x192.png',
                    });
                  } else {
                    alert('Notification permission denied.');
                  }
                });
              } else {
                alert('Notifications are blocked. Please enable them in browser settings.');
              }
            })
        }
    else {
      alert('Service Worker or Notification not supported in this browser.');
    }
  };


  // Handle PWA installation
  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Show the install prompt
      deferredPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === "accepted") {
          alert("PWA installed successfully!");
        } else {
          alert("PWA installation dismissed.");
        }
        setDeferredPrompt(null); // Reset the deferred prompt
      });
    } else {
      alert("PWA installation is not supported or already installed.");
    }
  };

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      console.log(event);
      event.preventDefault();
      setDeferredPrompt(event);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  return (
    //Add two buttons
    <div style={{
      textAlign: 'center', display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}>
      <h1>A Simple Progressive Web Application</h1>
      <div>
        <button onClick={handleInstallClick} style={{ marginRight: '10px', padding: '10px 20px' }}>
          Install App
        </button>
        <button onClick={handleNotificationClick} style={{ padding: '10px 20px' }}>
          Send notifications
        </button>
      </div>
    </div>
  );
}

export default App;
