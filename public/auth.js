// Handle Register
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const full_name = document.getElementById('full_name').value.trim();
    const email = document.getElementById('email').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name, email, username, password })
      });

      const data = await res.json();
      alert(data.message);

      if (res.ok) {
        window.location.href = '/login.html';
      }
    } catch (error) {
      alert('Server error during registration.');
      console.error(error);
    }
  });
}

// Handle Login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const identifier = document.getElementById('identifier').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password })
      });

      const data = await res.json();
      alert(data.message);

      if (res.ok) {
        localStorage.setItem('token', data.token);
        window.location.href = '/index.html';
      }
    } catch (error) {
      alert('Server error during login.');
      console.error(error);
    }
  });
}

