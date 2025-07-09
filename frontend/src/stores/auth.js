import { defineStore } from 'pinia'
import { ref } from 'vue'
import users from '@/mocks/users.json'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user')) || null)
  const isAuthenticated = ref(!!user.value)

  const fetchUser = async () => {
    const stored = localStorage.getItem('user')
    if (stored) {
      user.value = JSON.parse(stored)
      isAuthenticated.value = true
    } else {
      user.value = null
      isAuthenticated.value = false
    }
  }

  const login = async (credentials) => {
    let storedUsers = JSON.parse(localStorage.getItem('users')) || users
    const found = storedUsers.find(
      (u) => u.email === credentials.email && u.password === credentials.password,
    )
    if (found) {
      localStorage.setItem('user', JSON.stringify(found))
      user.value = found
      isAuthenticated.value = true
    } else {
      throw new Error('Invalid credentials')
    }
  }

  const register = async (payload) => {
    let storedUsers = JSON.parse(localStorage.getItem('users')) || users.slice()

    if (storedUsers.some((u) => u.email === payload.email)) {
      throw new Error('Email already registered')
    }

    const newUser = {
      id: storedUsers.length + 1,
      name: payload.name,
      email: payload.email,
      password: payload.password,
      role: 'user',
    }
    storedUsers.push(newUser)
    localStorage.setItem('users', JSON.stringify(storedUsers))
    localStorage.setItem('user', JSON.stringify(newUser))
    user.value = newUser
    isAuthenticated.value = true
  }

  const logout = async () => {
    localStorage.removeItem('user')
    user.value = null
    isAuthenticated.value = false
  }

  return { user, isAuthenticated, login, register, logout, fetchUser }
})
