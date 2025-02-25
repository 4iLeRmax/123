"use client";

import React from "react";
import { useFormStatus } from "react-dom";

export default function SubmitButton({
  variants,
}: {
  variants: {
    primary: string;
    pending: string;
  };
}) {
  const { pending } = useFormStatus();

  return (
    <>
      <button disabled={pending}>
        {pending ? variants.pending : variants.primary}
      </button>
    </>
  );
}
