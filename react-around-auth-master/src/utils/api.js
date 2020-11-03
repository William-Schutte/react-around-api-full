// ###########################  API Class  ########################################################

class Api {
    constructor(options) {
      this.options = options;
    }
  
    // Function replaced by getUser in auth
    getUserInfo(token) {
        return fetch(`${this.options.baseUrl}/user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
          .then(res => {
            if (res.status === 200) {
                return res.json().data;
            } else {
                return Promise.reject(`Error: ${res.status}`);
            }
          });
    }

    patchUserInfo({ name: newName, about: newAbout, token }) {
        return fetch(`${this.options.baseUrl}/user/me`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ "name": newName, "about": newAbout })
        })
            .then(res => {
                return res.json();
            });
    }

    patchUserPic({ avatar: newUrl, token }) {
        return fetch(`${this.options.baseUrl}/user/me/avatar`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ "avatar": newUrl })
        })
            .then(res => {
                return res.json();
            });
    }

    getInitialCards(token) {
        return fetch(`${this.options.baseUrl}/cards`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
          .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Error: ${res.status}`);
            }
          });
    }

    addNewCard({ name: newName, link: newLink, token }) {
        return fetch(`${this.options.baseUrl}/cards`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ name: newName, link: newLink })
          })
            .then(res => {
              return res.json();
            });
    }

    deleteCard({ cardId, token }) {
        return fetch(`${this.options.baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Error: ${res.status}`);
                }
            });
    }

    likeCard({ card, isLiked, token }) {
        // If the card is already liked by the user, the like is removed, else a like is added
        if (isLiked) {
            return fetch(`${this.options.baseUrl}/cards/${card._id}/likes`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            })
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        return Promise.reject(`Error: ${res.status}`);
                    }
                });
        } else {
            return fetch(`${this.options.baseUrl}/cards/${card._id}/likes`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            })
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        return Promise.reject(`Error: ${res.status}`);
                    }
                });
        }
    }
}

const api = new Api({
    baseUrl: "https://api.ws.p15.students.nomoreparties.site",
});

export default api;