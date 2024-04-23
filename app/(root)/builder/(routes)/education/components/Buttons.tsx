import Loader from '@/components/commons/Loader';
import { Button } from '@/components/ui/button';
import LinkComp from '@/components/ui/LinkComp';
import React, { FC } from 'react'

interface ButtonProps {
  isSubmitting: boolean;
  isMutating:boolean
}

const Buttons:FC<ButtonProps> = ({ isSubmitting,isMutating }) => {
  return (
    <div className="mt-auto flex justify-between">
      <LinkComp
        disabled={isSubmitting}
        className="w-40 bg-gray-400 text-[#000] hover:bg-gray-300"
        href={"/builder/prosummary"}
      >
        Back
      </LinkComp>
      <Button
        type="submit"
        className="flex gap-2 w-40"
        disabled={isSubmitting || isMutating}
      >
        Submit
        {(isSubmitting || isMutating) && <Loader/>}
      </Button>
    </div>
  );
};

export default Buttons