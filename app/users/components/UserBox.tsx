'use client'
import Avatar from "@/app/components/Avatar";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface UserBoxProps {
    data: User
};

const UserBox: React.FC<UserBoxProps> = ({data}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = useCallback(() => {
        if (isLoading) return;
        
        setIsLoading(true);
        
        axios.post('/api/conversations', {
            userId: data.id
        })
        .then((response) => {
            if (response.data && response.data.id) {
                router.push('/conversations/' + response.data.id);
                router.refresh();
            }
        })
        .catch((error) => {
            console.error('Error creating conversation:', error);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, [data.id, router, isLoading]);

    return(
        <div 
            onClick={handleClick} 
            className={`
                w-full 
                relative 
                flex 
                items-center 
                space-x-3 
                bg-white 
                p-3 
                hover:bg-neutral-100 
                rounded-lg 
                transition 
                cursor-pointer
                ${isLoading ? 'opacity-50 cursor-wait' : ''}
            `}
        >
            <Avatar user={data} />
            <div className="min-w-0 flex-1">
                <div className="focus:outline-none">
                    <div className="flex justify-between items-center mb-1">
                        <p className="text-sm font-medium text-gray-900">
                           {data.name}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserBox;