// frontend/lib/api/user.ts
export async function createOrUpdateUser(profile: any, token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001'}/api/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profile),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to create/update user: ${res.status} ${text}`);
  }

  return await res.json();
}
