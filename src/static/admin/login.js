document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const { token } = await response.json();
      localStorage.setItem('auth_token', token);
      window.location.href = '/admin/dashboard';
    } else {
      alert('登录失败：用户名或密码错误');
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('登录失败，请稍后重试');
  }
}); 