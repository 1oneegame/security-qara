'use client'

import useConservation from "@/app/hooks/useConversation";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { Button } from "@/components/ui/button";
import { HiPaperAirplane } from "react-icons/hi";

const Form = () => {
    const { conversationId } = useConservation();

    const {
        register,
        handleSubmit,
        setValue,
        formState: {
            errors, 
        }
    } = useForm<FieldValues>({
        defaultValues: {
            message: ''
        }
    });

    const encryptMessage = (message: string): string => {
        return btoa(message); //Base64
    };

    const onSubmit : SubmitHandler<FieldValues> = (data) => {
        setValue('message', '', {shouldValidate: true});
  
        const encryptedMessage = encryptMessage(data.message);
        
        axios.post('/api/messages', {
            ...data,
            message: encryptedMessage,
            conversationId
        });
    }

    return(
        <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2 lg:gap-4 w-full">
                <MessageInput id="message" register={register} errors={errors} required placeholder="Write a message."/>
                <Button type="submit"><HiPaperAirplane size={20} className="text-white"/></Button>
            </form>
        </div>
    );
}
export default Form;