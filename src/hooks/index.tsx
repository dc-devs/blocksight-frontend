import useAuth from './useAuth';
import type { RootState, AppDispatch } from '../redux/store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useAuth, useAppDispatch, useAppSelector };
