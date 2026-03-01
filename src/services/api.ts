const API_URL = "/api";

export const api = {
  // Public
  getNews: () => fetch(`${API_URL}/news`).then(res => res.json()),
  getNewsById: (id: string) => fetch(`${API_URL}/news/${id}`).then(res => res.json()),
  getGallery: () => fetch(`${API_URL}/gallery`).then(res => res.json()),
  submitLetter: (data: any) => fetch(`${API_URL}/letters`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(res => res.json()),

  // Auth
  login: (credentials: any) => fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials)
  }).then(res => res.json()),

  // Admin
  getAdminLetters: (token: string) => fetch(`${API_URL}/admin/letters`, {
    headers: { "Authorization": `Bearer ${token}` }
  }).then(res => res.json()),
  updateLetterStatus: (id: number, status: string, token: string) => fetch(`${API_URL}/admin/letters/${id}`, {
    method: "PATCH",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` 
    },
    body: JSON.stringify({ status })
  }).then(res => res.json()),
  addNews: (data: any, token: string) => fetch(`${API_URL}/admin/news`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` 
    },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  deleteNews: (id: number, token: string) => fetch(`${API_URL}/admin/news/${id}`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}` }
  }).then(res => res.json()),
  addGallery: (data: any, token: string) => fetch(`${API_URL}/admin/gallery`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` 
    },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  deleteGallery: (id: number, token: string) => fetch(`${API_URL}/admin/gallery/${id}`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}` }
  }).then(res => res.json()),
};
