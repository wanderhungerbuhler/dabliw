import { create } from 'zustand'

type Store = {
  birthday: string | null
  birthdayModal: boolean
  setBirthday: (birthday: string) => void
}

export const useStore = create<Store>((set) => ({
  birthday: null,
  birthdayModal: false,
  setBirthday: (birthday) => set({ birthday }),
}))
