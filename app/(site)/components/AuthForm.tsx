'use client'
import { Button } from "@/components/ui/button";
import Input from "@/app/components/Input";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from "react-hot-toast";
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from "next/navigation";

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
    const session = useSession();
    const rounter = useRouter();
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(session?.status === 'authenticated') {
            rounter.push('/users')
        }
    }, [session?.status, rounter])

    const toggleVariant = useCallback(
        () => {
            if(variant === 'LOGIN'){
                setVariant("REGISTER");
            }else{
                setVariant("LOGIN");
            }
        }, [variant]
    );
    
    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    });

    const onSubmit : SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        if(variant === 'REGISTER'){
            axios.post('/api/register', data)
            .then(() => signIn('credentials', data))
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => setIsLoading(false))
        }
        if(variant === 'LOGIN'){
            signIn('credentials', {
                ...data,
                redirect: false,
            }
            )
            .then((callback) => {
                if(callback?.error){
                    toast.error('invalid credentials')
                }
                if(callback?.ok && !callback?.error){
                    toast.success('Logged in!')
                    rounter.push('/users')
                }
            })
            .finally(() => setIsLoading(false))
        }
    } 
    const socialAction = (action: string) => {
        setIsLoading(true);

    }

    return(
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {variant==='REGISTER' && <Input type='name' label="Name" id="name" disabled={isLoading} register={register} errors={errors}></Input>}
                    <Input type='email' label="Email"  id="email" disabled={isLoading} register={register} errors={errors}></Input>
                    <Input type="password" label="Password" id='password' disabled={isLoading} register={register} errors={errors}></Input>
                    <div>
                        <Button disabled={isLoading} className="w-full" type="submit">{variant === 'LOGIN' ? "Sign in" : "Register"}</Button>
                    </div>
                </form>
                <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
                    <div>
                        {variant === 'LOGIN' ? "New to messenger?" : "Already have an account?"}
                    </div>
                    <div onClick={toggleVariant} className="underline cursor-pointer">
                        {variant ==='LOGIN' ? 'Create an account' : 'Login'}
                    </div>
                </div>
            </div>
            
        </div>
    )
}
export default AuthForm;