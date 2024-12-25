// 删除文章
async function deletePost(id) {
  if (!confirm('确定要删除这篇文章吗？')) {
    return;
  }

  try {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      window.location.href = '/admin/login';
      return;
    }

    const response = await fetch(`/api/admin/posts/${id}/delete`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      window.location.reload();
    } else {
      const error = await response.json();
      alert(`删除失败：${error.message}`);
    }
  } catch (error) {
    console.error('Delete error:', error);
    alert('删除失败，请稍后重试');
  }
}

// 检查登录状态
function checkAuth() {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    window.location.href = '/admin/login';
  }
}

// 页面加载时检查登录状态
checkAuth(); 