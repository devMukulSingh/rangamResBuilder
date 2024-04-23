import Loader from '@/components/commons/Loader';
import { Button } from '@/components/ui/button';
import LinkComp from '@/components/ui/LinkComp';
import React, { FC } from 'react'

interface Buttons {
  isSubmitting?:boolean
}

const Buttons: FC<Buttons> = ({ isSubmitting }) => {
  return (
    <div className="mt-5 flex justify-between h-10 gap-5">
      <LinkComp
        disabled={isSubmitting}
        className="w-40 bg-gray-400 text-[#000] hover:bg-gray-300"
        href={`/builder/skills`}
      >
        Back
      </LinkComp>
      <Button disabled={isSubmitting} type="submit" className="w-40 flex gap-2">
        Next
        {isSubmitting && <Loader/>}
      </Button>
    </div>
  );
};

export default Buttons