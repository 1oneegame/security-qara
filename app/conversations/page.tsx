'use client'

import clsx from "clsx";
import EmptyState from "../components/EmptyState";
import useConservation from "../hooks/useConversation"

export default function Conversations() {
    const {isOpen} = useConservation();
    return (
        <div className="pt-20">
            <div className="container mx-auto px-4">
                <div className={clsx("lg:pl-80 h-full lg:block", isOpen ? 'block' : 'hidden')}>
                    <EmptyState/>
                </div>
            </div>
        </div>
    )
}