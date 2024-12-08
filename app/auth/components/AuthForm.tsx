'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from "react-hot-toast";
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
    const session = useSession();
    const router = useRouter();
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(session?.status === 'authenticated') {
            router.push('/users')
        }
    }, [session?.status, router])

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        
        if(variant === 'REGISTER'){
            axios.post('/api/register', data)
            .then(() => signIn('credentials', data))
            .catch(() => toast.error('Что-то пошло не так!'))
            .finally(() => setIsLoading(false))
        }

        if(variant === 'LOGIN'){
            signIn('credentials', {
                ...data,
                redirect: false,
            })
            .then((callback) => {
                if(callback?.error){
                    toast.error('Неверные данные')
                }
                if(callback?.ok && !callback?.error){
                    toast.success('Успешный вход!')
                    router.push('/users')
                }
            })
            .finally(() => setIsLoading(false))
        }
    }

    return (
        <div className="flex flex-col justify-center min-h-[80vh] px-8 sm:px-16 lg:px-24 w-full">
            <div className="w-full max-w-md mx-auto space-y-6">
                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        {variant === 'LOGIN' ? 'Войти в аккаунт' : 'Создать аккаунт'}
                    </h2>
                    <p className="text-gray-500">
                        {variant === 'LOGIN' 
                            ? 'Введите данные для входа в аккаунт'
                            : 'Введите данные для создания аккаунта'}
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {variant === 'REGISTER' && (
                        <Input
                            id="name"
                            type="text"
                            placeholder="Ваше имя"
                            className="h-11 px-3.5 border-gray-300"
                            {...register("name", { required: true })}
                            disabled={isLoading}
                        />
                    )}
                    <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        className="h-11 px-3.5 border-gray-300"
                        {...register("email", { required: true })}
                        disabled={isLoading}
                    />
                    <Input
                        id="password"
                        type="password"
                        placeholder="Пароль"
                        className="h-11 px-3.5 border-gray-300"
                        {...register("password", { required: true })}
                        disabled={isLoading}
                    />

                    <Button 
                        type="submit"
                        className="w-full h-11 bg-black hover:bg-black/90 text-white"
                        disabled={isLoading}
                    >
                        {variant === 'LOGIN' ? 'Войти' : 'Зарегистрироваться'}
                    </Button>
                </form>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"/>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-gray-500">
                            ИЛИ
                        </span>
                    </div>
                </div>

                <Button 
                    type="button"
                    className="w-full h-11 bg-zinc-900 text-white hover:bg-zinc-800 rounded-full"
                    onClick={() => setVariant(variant === 'LOGIN' ? 'REGISTER' : 'LOGIN')}
                >
                    Войти в существующий аккаунт
                </Button>

                <p className="text-xs text-center text-gray-500">
                    Нажимая «Продолжить», вы соглашаетесь с нашими{' '}
                    <a href="#" className="underline">
                        Условиями использования
                    </a>
                    {' '}и{' '}
                    <a href="#" className="underline">
                        Политикой конфиденциальности
                    </a>
                    .
                </p>
            </div>
        </div>
    );
}

export default AuthForm;