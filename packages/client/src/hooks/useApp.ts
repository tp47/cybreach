import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '@/store/configure'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
const useAppDispatch: () => AppDispatch = useDispatch
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export { useAppDispatch, useAppSelector }
