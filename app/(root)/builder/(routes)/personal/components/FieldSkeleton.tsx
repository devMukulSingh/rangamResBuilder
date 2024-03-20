import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const FieldSkeleton = () => {
    return (
        <div className='flex flex-col gap-3'>
            <h1 className='text-sm'>Country Code</h1>
            <Skeleton className="h-10 w-[9.5rem] bg-neutral-100" />
        </div>
    )
}

export default FieldSkeleton